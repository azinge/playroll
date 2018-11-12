package utils

import (
	"errors"
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
)

type Model struct {
	ID        uint       `gql:"id: ID" gorm:"primary_key"`
	CreatedAt time.Time  `gql:"createdAt: String"`
	UpdatedAt time.Time  `gql:"updatedAt: String"`
	DeletedAt *time.Time `gql:"deletedAt: String"`

	// Internal Database Reference
	db *gorm.DB `gorm:"-"`
}

func (m *Model) DB() *gorm.DB {
	return m.db
}

func (m *Model) SetDB(db *gorm.DB) {
	m.db = db
}

/**
 * Handles type assertion errors
 * Param: field (string)
 * Returns: (error)
 *
 */
func HandleTypeAssertionError(field string) error {
	err := fmt.Sprintf("Type Assertion Error for field", field)
	fmt.Println(err)
	return errors.New(err)
}
