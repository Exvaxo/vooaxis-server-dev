const setupServer = require("../../setupENV");

const fastify = setupServer();

test("must create a post via createNote route POST", async () => {
  const requestPayload = {
    title: "my test load",
    body: "lorem ipsum dolor",
  };
  const { body: data } = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayload,
  });

  expect(JSON.parse(data).title).toEqual(requestPayload.title);
  expect(JSON.parse(data).body).toEqual(requestPayload.body);
});

test("must get all notes via getNote route GET", async () => {
  const requestPayload = {
    title: "my test load",
    body: "lorem ipsum dolor",
  };

  const { body: dataAdd } = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayload,
  });

  const { body: data } = await fastify.inject({
    url: "/notes",
    method: "GET",
  });

  expect(JSON.parse(data)[0].title).toEqual(JSON.parse(dataAdd).title);
  expect(JSON.parse(data)[0].body).toEqual(JSON.parse(dataAdd).body);
});

test("must update note via updateNote route PUT", async () => {
  const requestPayloadAdd = {
    title: "my test load",
    body: "lorem ipsum dolor",
  };

  const { body: dataAdd } = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayloadAdd,
  });

  const id = JSON.parse(dataAdd)._id;
  const requestPayload = {
    title: "my updated test load",
    body: "lorem ipsum dolor updated",
  };

  const { body: data } = await fastify.inject({
    url: `/notes/${id}`,
    method: "PUT",
    payload: requestPayload,
  });

  expect(JSON.parse(data).title).toEqual(requestPayload.title);
  expect(JSON.parse(data).body).toEqual(requestPayload.body);
});

test("must delete a note via deleteNote route DELETE", async () => {
  const requestPayloadAdd = {
    title: "my test load",
    body: "lorem ipsum dolor",
  };

  const { body: dataAdd } = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayloadAdd,
  });

  const id = JSON.parse(dataAdd)._id;

  const { body: data } = await fastify.inject({
    url: `/notes/${id}`,
    method: "DELETE",
  });
  expect(data).toEqual("no content");
});

test("must get count via getCount route GET", async () => {
  const requestPayloadAdd = {
    title: "my test load",
    body: "lorem ipsum dolor",
  };

  const { body: dataAdd } = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayloadAdd,
  });

  const { body: data } = await fastify.inject({
    url: `/notes/count`,
    method: "GET",
  });

  expect(JSON.parse(data).count).toEqual(1);
});
