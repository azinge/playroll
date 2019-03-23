# This file provides useful templates for creating various backend files

# Run from top directory (/services)
create_entity() {
  entity_name=$1
  short_entity_name=$2
  lower_entity_name="$(tr '[:upper:]' '[:lower:]' <<< ${entity_name:0:1})${entity_name:1}"
  entity_file_name=$3

  cp "./templates/entity_model.go" "./models/$entity_file_name"
  sed -i "" -e "s/<ENTITY_NAME_HERE>/$entity_name/g" "./models/$entity_file_name"
  sed -i "" -e "s/<ENTITY_SHORT_NAME_HERE>/$short_entity_name/g" "./models/$entity_file_name"

  cp "./templates/schema_type.go" "./schema/types/$entity_file_name"
  sed -i "" -e "s/<ENTITY_NAME_HERE>/$entity_name/g" "./schema/types/$entity_file_name"

  cp "./templates/schema_admin_resolvers.go" "./schema/crud/$entity_file_name"
  sed -i "" -e "s/<ENTITY_NAME_HERE>/$entity_name/g" "./schema/crud/$entity_file_name"
  sed -i "" -e "s/<LOWER_ENTITY_NAME_HERE>/$lower_entity_name/g" "./schema/crud/$entity_file_name"

  echo "Remember to add the 3 schema files to their schema.go files, and the entity to automigrate!"
}