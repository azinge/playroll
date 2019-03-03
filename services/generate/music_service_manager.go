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
		dao := models.InitMusicServiceTrackDAO(db)
		_, err = dao.Create(track)
		return err
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
		albumDAO := models.InitMusicServiceAlbumDAO(tx)
		if _, err = albumDAO.Create(album); err != nil {
			tx.Rollback()
			return err
		}

		tracks, err := spotifyhelpers.GetSpotifyTracks(trackIDs, client)
		if err != nil {
			tx.Rollback()
			return err
		}
		trackDAO := models.InitMusicServiceTrackDAO(tx)
		for _, track := range *tracks {
			if _, err = trackDAO.Create(&track); err != nil {
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
		artistDAO := models.InitMusicServiceArtistDAO(tx)
		if _, err = artistDAO.Create(artist); err != nil {
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
			albumDAO := models.InitMusicServiceAlbumDAO(tx)
			if _, err = albumDAO.Create(album); err != nil {
				tx.Rollback()
				return err
			}

			tracks, err := spotifyhelpers.GetSpotifyTracks(trackIDs, client)
			if err != nil {
				tx.Rollback()
				return err
			}
			trackDAO := models.InitMusicServiceTrackDAO(tx)
			for _, track := range *tracks {
				if _, err = trackDAO.Create(&track); err != nil {
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
		playlistDAO := models.InitMusicServicePlaylistDAO(tx)
		if _, err = playlistDAO.Create(playlist); err != nil {
			tx.Rollback()
			return err
		}

		tracks, err := spotifyhelpers.GetSpotifyTracks(trackIDs, client)
		if err != nil {
			tx.Rollback()
			return err
		}
		trackDAO := models.InitMusicServiceTrackDAO(tx)
		for _, track := range *tracks {
			if _, err = trackDAO.Create(&track); err != nil {
				tx.Rollback()
				return err
			}
		}

		return tx.Commit().Error
	default:
		return fmt.Errorf("error, could not find music service provider")
	}
}
