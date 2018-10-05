build:
        dep ensure -v
        # env GOOS=linux go build -ldflags="-s -w" -o bin/graphql schema/*.go
        env GOOS=linux go build -ldflags="-s -w" -o bin/graphql handlers/main.go
        env GOOS=linux go build -ldflags="-s -w" -o bin/graphiql handlers/graphiql.go

.PHONY: clean
clean:
        rm -rf ./bin ./vendor Gopkg.lock

.PHONY: deploy
deploy: clean build
        sls deploy --verbose

.PHONY: deploy-local
deploy-local: clean build
        sam local start-api
