const fastify = require("fastify");
const fp = require("fastify-plugin");
const app = require("../app");

module.exports = function setupENV() {
  //setup environmentalVariable
  process.env.NODE_ENV = "development";
  process.env.MONGODB_CONNECTION_URI =
    "mongodb+srv://root:Vooaxis2021@server-developement.8ku9r.mongodb.net/vooaxis_dev_testing?retryWrites=true&w=majority";

  process.env.SESSION_SECRET = "4e3ef24d26c13de712679ef8b92964b0";
  process.env.RESET_PASSWORD_TOKEN_PREFIX = "vooaxis-reset-password-token";
  //setup server
  const server = fastify({
    logger: { level: process.env.LOG_LEVEL || "silent" },
    pluginTimeout: 40 * 60 * 1000,
  });

  //setup lifecycle hooks
  beforeAll(async () => {
    server.register(fp(app));
    jest.setTimeout(60000);
    await server.ready();
    await server.Note.deleteMany({});
  });

  beforeEach(async () => {
    jest.setTimeout(60000);
    await server.Note.deleteMany({});
  });

  afterEach(async () => {
    jest.setTimeout(60000);
    await server.Note.deleteMany({});
  });

  afterAll(async () => {
    jest.setTimeout(60000);
    await server.Note.deleteMany({});
    await server.close();
  });

  return server;
};
