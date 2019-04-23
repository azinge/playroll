package main

import (
	"fmt"
	"os"

	"github.com/cazinge/playroll/services/models"
	"github.com/jinzhu/gorm"
	"github.com/oliveroneill/exponent-server-sdk-golang/sdk"
)

func main() {
	host := fmt.Sprintf(
		"host=%v port=%v user=%v dbname=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open("postgres", host)
	if err != nil {
		fmt.Println("error opening db: " + err.Error())
	}
	fmt.Println("Connected to DB!")

	defer db.Close()

	if db.AutoMigrate(models.ModelList...).Error != nil {
		fmt.Println("error migrating db: " + err.Error())
	}

	pushToken, err := expo.NewExponentPushToken("ExponentPushToken[xpkIFyHiKF6zKBX8NO3ysQ]")
	if err != nil {
		panic(err)
	}

	// Create a new Expo SDK client
	client := expo.NewPushClient(nil)

	// Publish message
	response, err := client.Publish(
		&expo.PushMessage{
			To:       pushToken,
			Body:     "This is a test notification",
			Data:     map[string]string{"withSome": "data"},
			Sound:    "default",
			Title:    "Notification Title",
			Priority: expo.DefaultPriority,
		},
	)
	// Check errors
	if err != nil {
		panic(err)
		// return
	}
	// Validate responses
	if response.ValidateResponse() != nil {
		fmt.Println(response.PushMessage.To, "failed")
	}

}

// 	// msts := &[]models.MusicServiceTrack{}
// 	// if err := db.Or(models.MusicServiceTrack{AlbumID: "6WrsTb0LameTn7Q4bTzhiW"}).Or(models.MusicServiceTrack{ArtistID: "6U3ybJ9UHNKEdsH7ktGBZ7"}).Find(msts).Error; err != nil {
// 	// 	return
// 	// }

// 	// db2 := db.Table("music_service_tracks").
// 	// 	Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id")

// 	// intersectQuery := db2.
// 	// 	Select("music_service_tracks.id").
// 	// 	Where(models.PlaylistTrack{MusicServicePlaylistID: "1GWJRCCJ3yfewu1Nupp9Vq"}).
// 	// 	Where(models.MusicServiceTrack{ArtistID: "66CXWjxzNUsdJxJ2JdwvnR"}).
// 	// 	SubQuery()

// 	// unionQuery := db.
// 	// 	Select("music_service_tracks.id").
// 	// 	Or(models.PlaylistTrack{MusicServicePlaylistID: "1GWJRCCJ3yfewu1Nupp9Vq"}).
// 	// 	Or(models.MusicServiceTrack{ArtistID: "66CXWjxzNUsdJxJ2JdwvnR"}).
// 	// 	Or(models.MusicServiceTrack{AlbumID: "6WrsTb0LameTn7Q4bTzhiW"}).
// 	// 	Or(models.MusicServiceTrack{ProviderID: "7l0ZtXbl2aTvpHuynmiurl"}).
// 	// 	SubQuery()

// 	// excludeQuery := db.
// 	// 	Select("music_service_tracks.id").
// 	// 	Or(models.MusicServiceTrack{ProviderID: "7l0ZtXbl2aTvpHuynmiurl"}).
// 	// 	SubQuery()

// 	// if err := db.
// 	// 	Table("music_service_tracks").
// 	// 	Where("music_service_tracks.id IN ?", intersectQuery). // Source Policy
// 	// 	// Not("music_service_tracks.id IN ?", excludeQuery).     // Filter Policy
// 	// 	// Order("popularity desc"). // Sort Policy
// 	// 	Order("random()").  // Sort Policy
// 	// 	Offset(1).Limit(3). // Length Policy
// 	// 	Scan(&msts).Error; err != nil {
// 	// 	fmt.Println("err: " + err.Error())
// 	// 	return
// 	// }
// 	// for _, mst := range *msts {
// 	// 	fmt.Println(mst.Name, "-", mst.ArtistName)
// 	// }
// 	query := "t"
// 	userModels := &[]models.User{}
// 	if err := db.Preload("Relationships", "other_user_id = ?", 2).Where("name LIKE ?", "%"+query+"%").Find(userModels).Error; err != nil {
// 		fmt.Printf("error searching users: %s", err.Error())
// 	}
// 	fmt.Printf("%#v\n", userModels)
// }
