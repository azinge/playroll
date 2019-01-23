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
	sls deploy --verbose
	sls invoke --function automigrate

.PHONY: deploy-local
deploy-local: clean build
	sam local start-api
