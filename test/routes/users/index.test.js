const setupServer = require("../../setupENV");

const fastify = setupServer();

const signUpUser = async () => {
  const user = { username: "test", password: "test123" };

  const response = await fastify.inject({
    url: "/users/signup",
    method: "POST",
    payload: user,
  });

  return { user, response };
};

const signInUser = async (user) => {
  const response = await fastify.inject({
    url: "/users/signin",
    method: "POST",
    payload: user,
  });

  return { user, response };
};

const profile = async (cookie) => {
  const response = await fastify.inject({
    url: "/users/profile",
    method: "GET",
    headers: { cookie },
  });

  return response;
};

test("must create a user via signup route POST", async () => {
  const { user, response } = await signUpUser();

  expect(response.statusCode).toBe(201);
  expect(JSON.parse(response.body).username).toBe(user.username);
});

test("must login a user via signin route POST", async () => {
  const { user } = await signUpUser();
  const { response } = await signInUser(user);

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body).username).toBe(user.username);

  const cookie = response.headers["set-cookie"];

  const responseProfile = await profile(cookie);

  expect(responseProfile.statusCode).toBe(200);
  expect(JSON.parse(responseProfile.body).username).toBe(user.username);
});
