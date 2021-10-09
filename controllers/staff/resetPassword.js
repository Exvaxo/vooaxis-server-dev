const appConfig = require("../../config/appConfig");
const argon2 = require("argon2");

const resetPassword = async (request, reply, fastify) => {
  const { token } = request.params;
  const { password } = request.body;
  try {
    const staff = await fastify.ResetPasswordSession.findOne({
      token: appConfig.resetTokenPrefix + token,
    });

    if (!staff) {
      reply.code(400).send({ msg: "Invalid token" });
      return;
    }

    const hash = await argon2.hash(password);

    await fastify.Staff.updateOne({ password: hash });

    request.session.staff = {
      staffId: staff.uid,
      isLoggedIn: true,
      isStaff: true,
    };

    await fastify.ResetPasswordSession.deleteOne({ _id: staff._id });

    reply.code(204).send("password reset done");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = resetPassword;
