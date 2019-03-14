import * as config from '../config/aws';
import Amplify, { Auth } from 'aws-amplify';
import Signer from 'aws-appsync/lib/link/signer/signer';
import Url from 'url';

Amplify.configure(config.amplify.dev);

const signedFetch = async (uri, { method, body }) => {
  const {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  } = await Auth.currentCredentials();

  // console.warn("CREDENTIALS:", { accessKeyId, secretAccessKey, sessionToken });

  const { host, path } = Url.parse(uri);
  const formatted = {
    method,
    body,
    service: 'execute-api',
    region: config.api.dev.region,
    url: uri,
    host,
    path,
  };

  // console.warn("REQUEST:", formatted);

  const signedRequest = Signer.sign(formatted, {
    access_key: accessKeyId,
    secret_key: secretAccessKey,
    session_token: sessionToken,
  });

  // console.warn({ ...signedRequest, headers: "", body: "" });

  return fetch(uri, signedRequest);
};

export default {
  fetch: signedFetch,
};
