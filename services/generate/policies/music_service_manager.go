package policies

import (
	"fmt"
	"time"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

func CollectSource(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client, timeoutChannel <-chan time.Time) (bool, error) {
	switch source.Type {
	case "Track":
		return collectTrack(source, db, client, timeoutChannel)
	case "Album":
		return collectAlbum(source, db, client, timeoutChannel)
	case "Artist":
		return collectArtist(source, db, client, timeoutChannel)
	case "Playlist":
		return collectPlaylist(source, db, client, timeoutChannel)
	default:
		return false, fmt.Errorf("error, could not find matching source type")
	}
}

func collectTrack(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client, timeoutChannel <-chan time.Time) (bool, error) {
	lastHour := time.Now().Add(-1 * time.Hour)
	if _, err := models.GetMusicServiceTrackByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return true, nil
	}

	switch source.Provider {
	case "Spotify":
		track, err := spotifyhelpers.GetSpotifyTrack(spotify.ID(source.ProviderID), client)
		if err != nil {
			return false, err
		}
		if err := db.Where("updated_at > ?", lastHour).Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error; err != nil {
			return false, err
		}
		return true, nil
	default:
		return false, fmt.Errorf("error, could not find music service provider")
	}
}

func collectAlbum(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client, timeoutChannel <-chan time.Time) (bool, error) {
	lastHour := time.Now().Add(-1 * time.Hour)
	if _, err := models.GetMusicServiceAlbumByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return true, nil
	}

	switch source.Provider {
	case "Spotify":
		album, trackIDs, err := spotifyhelpers.GetSpotifyAlbumWithTracks(spotify.ID(source.ProviderID), client)
		if err != nil {
			return false, err
		}
		tx := db.Begin()
		tracks := &[]models.MusicServiceTrack{}
		for i := 0; i < len(*trackIDs); i += 50 {
			var ids []spotify.ID
			if i+50 > len(*trackIDs) {
				ids = (*trackIDs)[i:]
			} else {
				ids = (*trackIDs)[i : i+50]
			}

			tracks, err = spotifyhelpers.GetSpotifyTracks(&ids, client)
			if err != nil {
				tx.Rollback()
				return false, err
			}
			for _, track := range *tracks {
				select {
				case <-timeoutChannel:
					if err = tx.Commit().Error; err != nil {
						return false, err
					}
					return false, nil
				default:
				}

				if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error; err != nil {
					tx.Rollback()
					return false, err
				}
			}
		}

		if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServiceAlbum{ProviderID: album.ProviderID}).Attrs(album).FirstOrCreate(&models.MusicServiceAlbum{}).Error; err != nil {
			tx.Rollback()
			return false, err
		}
		if err = tx.Commit().Error; err != nil {
			return false, err
		}
		return true, nil
	default:
		return false, fmt.Errorf("error, could not find music service provider")
	}
}

func collectArtist(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client, timeoutChannel <-chan time.Time) (bool, error) {
	lastHour := time.Now().Add(-1 * time.Hour)
	if _, err := models.GetMusicServiceArtistByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return true, nil
	}

	switch source.Provider {
	case "Spotify":
		artist, albumIDs, err := spotifyhelpers.GetSpotifyArtistWithAlbums(spotify.ID(source.ProviderID), client)
		if err != nil {
			return false, err
		}
		tx := db.Begin()

		fmt.Println(artist)
		for _, albumID := range *albumIDs {
			if _, err := models.GetMusicServiceAlbumByProviderInfo("Spotify", string(albumID), db); err == nil {
				continue
			}
			select {
			case <-timeoutChannel:
				if err = tx.Commit().Error; err != nil {
					return false, err
				}
				return false, nil
			default:
			}

			album, trackIDs, err := spotifyhelpers.GetSpotifyAlbumWithTracks(albumID, client)
			if err != nil {
				return false, err
			}

			if album.ArtistID != artist.ProviderID {
				continue
			}

			tracks := &[]models.MusicServiceTrack{}
			for i := 0; i < len(*trackIDs); i += 50 {
				var ids []spotify.ID
				if i+50 > len(*trackIDs) {
					ids = (*trackIDs)[i:]
				} else {
					ids = (*trackIDs)[i : i+50]
				}

				tracks, err = spotifyhelpers.GetSpotifyTracks(&ids, client)
				if err != nil {
					tx.Rollback()
					return false, err
				}
				for _, track := range *tracks {
					select {
					case <-timeoutChannel:
						if err = tx.Commit().Error; err != nil {
							return false, err
						}
						return false, nil
					default:
					}
					if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error; err != nil {
						tx.Rollback()
						return false, err
					}
				}
			}
			if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServiceAlbum{ProviderID: album.ProviderID}).Attrs(album).FirstOrCreate(&models.MusicServiceAlbum{}).Error; err != nil {
				tx.Rollback()
				return false, err
			}
		}
		if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServiceArtist{ProviderID: artist.ProviderID}).Attrs(artist).FirstOrCreate(&models.MusicServiceArtist{}).Error; err != nil {
			tx.Rollback()
			return false, err
		}
		if err = tx.Commit().Error; err != nil {
			return false, err
		}
		return true, nil
	default:
		return false, fmt.Errorf("error, could not find music service provider")
	}
}

func collectPlaylist(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client, timeoutChannel <-chan time.Time) (bool, error) {
	lastHour := time.Now().Add(-1 * time.Hour)
	if _, err := models.GetMusicServicePlaylistByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return true, nil
	}

	switch source.Provider {
	case "Spotify":
		playlist, trackIDs, err := spotifyhelpers.GetSpotifyPlaylistWithTracks(spotify.ID(source.ProviderID), client)
		if err != nil {
			return false, err
		}
		tx := db.Begin()

		tracks := &[]models.MusicServiceTrack{}
		for i := 0; i < len(*trackIDs); i += 50 {
			var ids []spotify.ID
			if i+50 > len(*trackIDs) {
				ids = (*trackIDs)[i:]
			} else {
				ids = (*trackIDs)[i : i+50]
			}
			fmt.Println(i, len(*trackIDs))
			tracks, err = spotifyhelpers.GetSpotifyTracks(&ids, client)
			if err != nil {
				tx.Rollback()
				return false, err
			}
			for i, track := range *tracks {
				select {
				case <-timeoutChannel:
					if err = tx.Commit().Error; err != nil {
						return false, err
					}
					return false, nil
				default:
				}
				trackModel := &models.MusicServiceTrack{}
				if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&trackModel).Error; err != nil {
					tx.Rollback()
					return false, err
				}
				playlistTrackModel := &models.PlaylistTrack{
					MusicServiceTrackID:    trackModel.ProviderID,
					MusicServicePlaylistID: playlist.ProviderID,
					TrackNumber:            i,
				}
				if err = tx.Create(playlistTrackModel).Error; err != nil {
					tx.Rollback()
					return false, err
				}
				if err = tx.Where("updated_at > ?", lastHour).Where(models.MusicServicePlaylist{ProviderID: playlist.ProviderID}).Attrs(playlist).FirstOrCreate(&models.MusicServicePlaylist{}).Error; err != nil {
					tx.Rollback()
					return false, err
				}
			}
		}

		if err = tx.Commit().Error; err != nil {
			return false, err
		}
		return true, nil
	default:
		return false, fmt.Errorf("error, could not find music service provider")
	}
}
