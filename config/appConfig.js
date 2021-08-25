const loadEnvirinmentVariables = (key) => {
  const envVar = process.env[key];

  if (!envVar) {
    throw new Error(`Must include ${key} as an envirinmental variable.`);
  }

  return envVar;
};

const loadArrayEnvironmentVariables = (key) => {
  return loadEnvirinmentVariables(key).split(",");
};

module.exports = {
  mongoUri: loadEnvirinmentVariables("MONGODB_CONNECTION_URI"),
  sessionSecret: loadArrayEnvironmentVariables("SESSION_SECRET"),
  resetTokenPrefix: loadEnvirinmentVariables("RESET_PASSWORD_TOKEN_PREFIX"),
  oauthClientId: loadEnvirinmentVariables("OAUTH_CLIENT_ID"),
  oauthClientSecret: loadEnvirinmentVariables("OAUTH_CLIENT_SECRET"),
  oauthRefreshToken: loadEnvirinmentVariables("OAUTH_REFRESH_TOKEN"),
  oauthRedirectUri: loadEnvirinmentVariables("OAUTH_REDIRECT_URI"),
};
