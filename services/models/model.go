package models

import (
	"fmt"
	"reflect"
	"time"

	"github.com/jinzhu/gorm"
)

var ModelList = []interface{}{
	Playroll{},
	Roll{},
	User{},
	Tracklist{},
	CompiledRoll{},
	IdentityCredential{},
	MusicServiceCredential{},
	DiscoveryQueue{},
	DiscoveryQueueEntry{},
	Recommendation{},
	MusicServiceAlbum{},
	MusicServiceArtist{},
	MusicServicePlaylist{},
	MusicServiceTrack{},
	MusicServiceUser{},
	Relationship{},
}

type Entity interface {
	// Implemented by Model.
	DB() *gorm.DB
	SetDB(*gorm.DB)
	SetEntity(Entity)
	GetID() uint
	SetID(uint)

	// Implement these methods on new Entities.
	InitDAO(*gorm.DB) Entity
	Format(interface{}) (EntityOutput, error)
	FormatSlice(interface{}) (interface{}, error)
	ToOutput() (EntityOutput, error)

	// Call InitDAO first before calling these methods.
	Get(uint) (interface{}, error)
	List() (interface{}, error)
	Create(Entity) (interface{}, error)
	Update(Entity) (interface{}, error)
	Delete(uint) (interface{}, error)
}

type EntityInput interface {
	ToModel() (Entity, error)
}

type EntityOutput interface {
	ToModel() (Entity, error)
}

type Model struct {
	ID        uint       `gql:"id: ID" gorm:"primary_key"`
	CreatedAt time.Time  `gql:"createdAt: String"`
	UpdatedAt time.Time  `gql:"updatedAt: String"`
	DeletedAt *time.Time `gql:"deletedAt: String"`

	// For Internal Reference and Method Functions.
	// In order to get Model's functions to work, these values must be populated
	db     *gorm.DB `gorm:"-"`
	entity Entity   `gorm:"-"`
}

func (m *Model) DB() *gorm.DB {
	return m.db
}

func (m *Model) SetDB(db *gorm.DB) {
	m.db = db
}

func (m *Model) SetEntity(entity Entity) {
	m.entity = entity
}

func (m *Model) GetID() (id uint) {
	return m.ID
}

func (m *Model) SetID(id uint) {
	m.ID = id
}

func (m *Model) getEntityType() reflect.Type {
	return reflect.ValueOf(m.entity).Elem().Type()
}

func (m *Model) getEntitySliceType() reflect.Type {
	return reflect.SliceOf(m.getEntityType())
}

func (m *Model) getNewEntity() interface{} {
	return reflect.New(m.getEntityType()).Interface()
}

func (m *Model) getNewEntitySlice() interface{} {
	return reflect.New(m.getEntitySliceType()).Interface()
}

func (m *Model) Get(id uint) (interface{}, error) {
	entity := m.getNewEntity()
	db := m.DB()
	if err := db.First(entity, id).Error; err != nil {
		fmt.Printf("error getting %s: %s", m.getEntityType().Name(), err.Error())
		return nil, err
	}
	return entity, nil
}

func (m *Model) List() (interface{}, error) {
	entities := m.getNewEntitySlice()
	db := m.DB()
	if err := db.Find(entities).Error; err != nil {
		fmt.Printf("error getting %s: %s", m.getEntityType().Name(), err.Error())
		return nil, err
	}
	return entities, nil
}

func (m *Model) Create(entity Entity) (interface{}, error) {
	db := m.DB()
	if err := db.Create(entity).Error; err != nil {
		fmt.Printf("error creating %s: %s", m.getEntityType().Name(), err.Error())
		return nil, err
	}
	return entity, nil
}

func (m *Model) Update(entity Entity) (interface{}, error) {
	db := m.DB()
	first := m.getNewEntity()
	if err := db.Where("id = ?", entity.GetID()).First(first).Error; err != nil {
		fmt.Printf("error retrieving %s from DB: %s", m.getEntityType().Name(), err.Error())
		return nil, err
	}
	// TODO: Change to possibly only overwrite non-nil attributes?
	if err := db.Save(entity).Error; err != nil {
		fmt.Println("error updating %s: %s", m.getEntityType().Name(), err.Error())
		return nil, err
	}
	return entity, nil
}

func (m *Model) Delete(id uint) (interface{}, error) {
	entity := m.getNewEntity()
	db := m.DB()
	if err := db.Where("id = ?", id).First(entity).Error; err != nil {
		fmt.Println("error deleting %s: %s", m.getEntityType().Name(), err.Error())
		return nil, err
	}
	db.Delete(entity)
	return entity, nil
}
