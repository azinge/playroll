## graphql-lambda.go
- Deploy to AWS Lambda using Severless(or your personal flavor)
    - Ask @obrienthomas13 for help here
- Run the following cURL

`curl -X POST <aws-endpoint> -d '<query>'`

- Example

`curl -X POST https://wxvm74psg3.execute-api.us-west-2.amazonaws.com/dev/graphql-example -d '{songs(album:"ts-fearless"){title}}'`

## graphql-local.go
- In one terminal session, run the following command

`go run graphql-local.go`

- In another session, run the following cURL

`curl -g 'http://localhost:8080/graphql?query=<query>'`

- Example

`curl -g 'http://localhost:8080/graphql?query={songs(album:"ts-fearless"){title}}'`
