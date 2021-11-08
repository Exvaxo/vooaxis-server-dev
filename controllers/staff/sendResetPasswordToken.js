const { nanoid } = require("nanoid");
const appconfig = require("../../config/appConfig");
const sendEmail = require("../../middlewares/sendEmail");

const sendResetPasswordToken = async (request, reply, fastify) => {
  try {
    const { email } = request.body;

    const staff = await fastify.Staff.findOne({ email });

    if (!staff) {
      reply.code(400).send({ msg: "staff not found!" });
      return;
    }

    const currentDate = new Date();
    const TTL_IN_MINS = 20; //expires in 20 mins //todo change to 20 in production
    const twentyMinutesLater = new Date(
      currentDate.getTime() + TTL_IN_MINS * 60 * 1000
    );

    const token = await nanoid(50);
    await fastify.ResetPasswordSession.create({
      token: appconfig.resetTokenPrefix + token,
      uid: staff._id,
      expireAt: twentyMinutesLater,
    });

    //TODO send the token via email
    await sendEmail({
      from: "thuvaragan <thuvaraganuidesigns@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Reset password", // Subject line
      html: `<h1>Your token <b>${token}</b></h1>`, // html body
    });

    console.log(token); // todo remove this console log in production

    reply.code(204).send("email sent");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = sendResetPasswordToken;
