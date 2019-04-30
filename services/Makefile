build:
	dep ensure -v
	env GOOS=linux go build -ldflags="-s -w" -o bin/graphql handlers/graphql.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/admin_graphql handlers/admin_graphql.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/post_confirm handlers/post_confirm.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/auto_migrate handlers/auto_migrate.go

.PHONY: clean
clean:
	rm -rf ./bin ./vendor Gopkg.lock

.PHONY: deploy
deploy: build
	sls deploy function --function graphql
	sls deploy function --function admingraphql
	sls deploy function --function postconfirm
	sls deploy function --function automigrate
	sls invoke --function automigrate

.PHONY: deploy-development
deploy-staging: clean build
	sls deploy --verbose
	sls invoke --function automigrate

.PHONY: deploy-staging
deploy-staging: clean build
	sls deploy --verbose --stage stag
	sls invoke --function automigrate --stage stag

.PHONY: deploy-production
deploy-production: clean build
	sls deploy --verbose --stage prod
	sls invoke --function automigrate --stage prod

.PHONY: deploy-local
deploy-local: clean build
	sam local start-api
