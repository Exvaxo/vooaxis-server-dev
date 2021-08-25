const argon2 = require("argon2");

const signin = async (request, reply, fastify) => {
  const { usernameOrEmail, password } = request.body;
  try {
    const user = await fastify.User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      reply.code(400).send({ msg: "invalid credentials" });
      return;
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      reply.code(400).send({ msg: "invalid credentials" });
      return;
    }

    request.session.user = { userId: user._id, isLoggedIn: true };
    reply.code(200).send({ username: user.username, email: user.email });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = signin;
