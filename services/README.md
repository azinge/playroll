# Playroll Services

Playroll has a Graphql endpoint living on AWS Lambda. The Lambda function utilizes AWS RDS and API Gateway to access our internal database and endpoint respectively.

## List of requirements
* [Serverless](https://serverless.com/framework/docs/providers/aws/guide/installation/)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html)
   * `brew install awscli` also works
* [AWS SAM CLI](https://docs.aws.amazon.com/lambda/latest/dg/sam-cli-requirements.html)
* [Docker](https://docs.docker.com/install/)

Make sure that your AWS configurations are set up. [Guide here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

## Environmental variables
The following environmental variables are need for deployment. The values will vary between deploying to a local machine or AWS Lambda.
```
export DB_HOST='<db-host>'
export DB_PORT='<db-port>'
export DB_NAME='<db-name>'
export DB_USER='<db-user>'
export DB_PASS='<db-pass>'
```

To perform the follow tasks, run their respective commands in a local terminal session.

## Deploy Locally
```bash
source <env-var-local>
make build
sam local start-api
```
AWS SAM will now deploy an endpoint in the current terminal session. In another session, run this command to hit the local endpoint
```bash
curl -X POST <graphql-endpoint> -d '<graphql-query/mutation-request>'
```

## Deploy to AWS Lambda
```bash
source <env-var-lambda>
make build
sls deploy
```
Serverless will now deploy to AWS Lambda and return if it's succesful or not. If success, it will return an endpoint. The follow command can utlize the this endpoint.
```bash
curl -X POST <graphql-endpoint> -d '<graphql-query/mutation-request>'
```