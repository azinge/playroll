package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type <ENTITY_NAME_HERE> struct {
	Model
}

type <ENTITY_NAME_HERE>Input struct {
	Placeholder string `gql:"placeholder: String"`
}

type <ENTITY_NAME_HERE>Output struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func <ENTITY_NAME_HERE>InputToModel(<ENTITY_SHORT_NAME_HERE>i *<ENTITY_NAME_HERE>Input) (*<ENTITY_NAME_HERE>, error) {
	<ENTITY_SHORT_NAME_HERE> := &<ENTITY_NAME_HERE>{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return <ENTITY_SHORT_NAME_HERE>, nil
}

func <ENTITY_NAME_HERE>OutputToModel(<ENTITY_SHORT_NAME_HERE> *<ENTITY_NAME_HERE>Output) (*<ENTITY_NAME_HERE>, error) {
	return nil, fmt.Errorf("<ENTITY_NAME_HERE>OutputToModel Not Implemented")
}

func <ENTITY_NAME_HERE>ModelToOutput(<ENTITY_SHORT_NAME_HERE> *<ENTITY_NAME_HERE>) (*<ENTITY_NAME_HERE>Output, error) {
	<ENTITY_SHORT_NAME_HERE>o := &<ENTITY_NAME_HERE>Output{}
	<ENTITY_SHORT_NAME_HERE>o.Model = <ENTITY_SHORT_NAME_HERE>.Model
	// ADD METHODS TO DECODE PROPERTIES HERE
	return <ENTITY_SHORT_NAME_HERE>o, nil
}

func Init<ENTITY_NAME_HERE>DAO(db *gorm.DB) Entity {
	dao := &<ENTITY_NAME_HERE>{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func Format<ENTITY_NAME_HERE>(val interface{}) (*<ENTITY_NAME_HERE>Output, error) {
	<ENTITY_SHORT_NAME_HERE>, ok := val.(*<ENTITY_NAME_HERE>)
	if !ok {
		return nil, fmt.Errorf("error converting to <ENTITY_NAME_HERE>")
	}
	return <ENTITY_NAME_HERE>ModelToOutput(<ENTITY_SHORT_NAME_HERE>)
}

func Format<ENTITY_NAME_HERE>Slice(val interface{}) ([]<ENTITY_NAME_HERE>Output, error) {
	<ENTITY_SHORT_NAME_HERE>s, ok := val.(*[]<ENTITY_NAME_HERE>)
	if !ok {
		return nil, fmt.Errorf("error converting to <ENTITY_NAME_HERE> Slice")
	}
	output := []<ENTITY_NAME_HERE>Output{}
	for _, <ENTITY_SHORT_NAME_HERE> := range *<ENTITY_SHORT_NAME_HERE>s {
		<ENTITY_SHORT_NAME_HERE>o, err := <ENTITY_NAME_HERE>ModelToOutput(&<ENTITY_SHORT_NAME_HERE>)
		if err != nil {
			return nil, err
		}
		output = append(output, *<ENTITY_SHORT_NAME_HERE>o)
	}
	return output, nil
}

// Interface Generalization Methods

func (<ENTITY_SHORT_NAME_HERE>i *<ENTITY_NAME_HERE>Input) ToModel() (Entity, error) {
	return <ENTITY_NAME_HERE>InputToModel(<ENTITY_SHORT_NAME_HERE>i)
}

func (<ENTITY_SHORT_NAME_HERE>o *<ENTITY_NAME_HERE>Output) ToModel() (Entity, error) {
	return <ENTITY_NAME_HERE>OutputToModel(<ENTITY_SHORT_NAME_HERE>o)
}

func (<ENTITY_SHORT_NAME_HERE> *<ENTITY_NAME_HERE>) ToOutput() (EntityOutput, error) {
	return <ENTITY_NAME_HERE>ModelToOutput(<ENTITY_SHORT_NAME_HERE>)
}

func (_ *<ENTITY_NAME_HERE>) InitDAO(db *gorm.DB) Entity {
	return Init<ENTITY_NAME_HERE>DAO(db)
}

func (_ *<ENTITY_NAME_HERE>) Format(val interface{}) (EntityOutput, error) {
	return Format<ENTITY_NAME_HERE>(val)
}

func (_ *<ENTITY_NAME_HERE>) FormatSlice(val interface{}) (interface{}, error) {
	return Format<ENTITY_NAME_HERE>Slice(val)
}
