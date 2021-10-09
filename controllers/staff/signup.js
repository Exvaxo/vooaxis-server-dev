const argon2 = require("argon2");

const signup = async (request, reply, fastify) => {
  const { username, email, password } = request.body;
  try {
    const hash = await argon2.hash(password);
    const staff = await fastify.Staff.create({
      username,
      email,
      password: hash,
    });
    request.session.staff = {
      staffId: staff._id,
      isLoggedIn: true,
      isStaff: true,
    };

    reply.code(201).send({ username, email });
  } catch (error) {
    if (error.code == 11000) {
      let msg;
      let field;
      if (error.keyPattern.email) {
        field = "email";
        msg = "Email already exists.";
      }
      if (error.keyPattern.username) {
        field = "username";
        msg = "Username already exists.";
      }
      reply.code(400).send({ field, msg });
      return;
    }

    reply.code(500).send({ msg: "Server error" });

    fastify.log.error(error);
  }
};

module.exports = signup;
