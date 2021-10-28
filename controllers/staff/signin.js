const argon2 = require("argon2");

const signin = async (request, reply, fastify) => {
  const { usernameOrEmail, password } = request.body;
  try {
    const staff = await fastify.Staff.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).populate({
      path: "permission",
    });

    if (!staff) {
      reply.code(400).send({ msg: "invalid credentials" });
      return;
    }

    const isValidPassword = await argon2.verify(staff.password, password);

    if (!isValidPassword) {
      reply.code(400).send({ msg: "invalid credentials" });
      return;
    }

    request.session.staff = {
      staffId: staff._id,
      isLoggedIn: true,
      isStaff: true,
    };
    reply.code(200).send(staff);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = signin;
