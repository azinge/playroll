import * as React from "react";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";

import Amplify, { API } from "aws-amplify";
import awsconfig from "../../config/aws.js";

Amplify.configure(awsconfig.dev.amplify);

function graphQLFetcher(graphQLParams) {
  return API.graphql(graphQLParams) as Promise<any>;
}

class Home extends React.Component {
  public render() {
    return (
      <div className="Home">
        <div style={{ height: window.innerHeight }}>
          <GraphiQL fetcher={graphQLFetcher} />
        </div>
      </div>
    );
  }
}

export default Home;
