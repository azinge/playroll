package generate

import (
	"fmt"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

func collectTrack(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) error {
	if _, err := models.GetMusicServiceTrackByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return nil
	}

	switch source.Provider {
	case "Spotify":
		track, err := spotifyhelpers.GetSpotifyTrack(spotify.ID(source.ProviderID), client)
		if err != nil {
			return err
		}
		return db.Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error
	default:
		return fmt.Errorf("error, could not find music service provider")
	}
}

func collectAlbum(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) error {
	if _, err := models.GetMusicServiceAlbumByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return nil
	}

	switch source.Provider {
	case "Spotify":
		album, trackIDs, err := spotifyhelpers.GetSpotifyAlbumWithTracks(spotify.ID(source.ProviderID), client)
		if err != nil {
			return err
		}
		tx := db.Begin()
		if err = tx.Where(models.MusicServiceAlbum{ProviderID: album.ProviderID}).Attrs(album).FirstOrCreate(&models.MusicServiceAlbum{}).Error; err != nil {
			tx.Rollback()
			return err
		}

		tracks, err := spotifyhelpers.GetSpotifyTracks(trackIDs, client)
		if err != nil {
			tx.Rollback()
			return err
		}
		for _, track := range *tracks {
			if err = tx.Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error; err != nil {
				tx.Rollback()
				return err
			}
		}

		return tx.Commit().Error
	default:
		return fmt.Errorf("error, could not find music service provider")
	}
}

func collectArtist(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) error {
	if _, err := models.GetMusicServiceArtistByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return nil
	}

	switch source.Provider {
	case "Spotify":
		artist, albumIDs, err := spotifyhelpers.GetSpotifyArtistWithAlbums(spotify.ID(source.ProviderID), client)
		if err != nil {
			return err
		}
		tx := db.Begin()
		if err = tx.Where(models.MusicServiceArtist{ProviderID: artist.ProviderID}).Attrs(artist).FirstOrCreate(&models.MusicServiceArtist{}).Error; err != nil {
			tx.Rollback()
			return err
		}
		fmt.Println(artist)
		for _, albumID := range *albumIDs {
			if _, err := models.GetMusicServiceAlbumByProviderInfo("Spotify", string(albumID), db); err == nil {
				continue
			}

			album, trackIDs, err := spotifyhelpers.GetSpotifyAlbumWithTracks(albumID, client)
			if err != nil {
				return err
			}

			if album.ArtistID != artist.ProviderID {
				continue
			}

			if err = tx.Where(models.MusicServiceAlbum{ProviderID: album.ProviderID}).Attrs(album).FirstOrCreate(&models.MusicServiceAlbum{}).Error; err != nil {
				tx.Rollback()
				return err
			}

			tracks, err := spotifyhelpers.GetSpotifyTracks(trackIDs, client)
			if err != nil {
				tx.Rollback()
				return err
			}
			for _, track := range *tracks {
				if err = tx.Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error; err != nil {
					tx.Rollback()
					return err
				}
			}
		}

		return tx.Commit().Error
	default:
		return fmt.Errorf("error, could not find music service provider")
	}
}

func collectPlaylist(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) error {
	if _, err := models.GetMusicServicePlaylistByProviderInfo(source.Provider, source.ProviderID, db); err == nil {
		return nil
	}

	switch source.Provider {
	case "Spotify":
		playlist, trackIDs, err := spotifyhelpers.GetSpotifyPlaylistWithTracks(spotify.ID(source.ProviderID), client)
		if err != nil {
			return err
		}
		tx := db.Begin()
		if err = tx.Where(models.MusicServicePlaylist{ProviderID: playlist.ProviderID}).Attrs(playlist).FirstOrCreate(&models.MusicServicePlaylist{}).Error; err != nil {
			tx.Rollback()
			return err
		}

		tracks, err := spotifyhelpers.GetSpotifyTracks(trackIDs, client)
		if err != nil {
			tx.Rollback()
			return err
		}
		for _, track := range *tracks {
			if err = tx.Where(models.MusicServiceTrack{ProviderID: track.ProviderID}).Attrs(track).FirstOrCreate(&models.MusicServiceTrack{}).Error; err != nil {
				tx.Rollback()
				return err
			}
		}

		return tx.Commit().Error
	default:
		return fmt.Errorf("error, could not find music service provider")
	}
}
