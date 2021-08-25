const appConfig = require("../../config/appConfig");
const argon2 = require("argon2");

const resetPassword = async (request, reply, fastify) => {
  const { token } = request.params;
  const { password } = request.body;
  try {
    const user = await fastify.ResetPasswordSession.findOne({
      token: appConfig.resetTokenPrefix + token,
    });

    if (!user) {
      reply.code(400).send({ msg: "Invalid token" });
      return;
    }

    const hash = await argon2.hash(password);

    await fastify.User.updateOne({ password: hash });

    request.session.user = { userId: user.uid, isLoggedIn: true };

    await fastify.ResetPasswordSession.deleteOne({ _id: user._id });

    reply.code(204).send("password reset done");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = resetPassword;
