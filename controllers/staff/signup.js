const argon2 = require("argon2");
const { nanoid } = require("nanoid");
const sendEmail = require("../../middlewares/sendEmail");
const appconfig = require("../../config/appConfig");

const signup = async (request, reply, fastify) => {
  const { firstName, lastName, username, email, permission } = request.body;
  const _uid = request.staff;
  try {
    const isEligible = await fastify.getPermissions(_uid, [
      { rule: "Staff", priviledges: ["create", "update"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    if (!request.body.id) {
      let pass = nanoid();
      const hash = await argon2.hash(pass);
      const staff = await fastify.Staff.create({
        firstName,
        lastName,
        username,
        email,
        password: hash,
        permission,
      });

      // request.session.staff = {
      //   staffId: staff._id,
      //   isLoggedIn: true,
      //   isStaff: true,
      // };

      const currentDate = new Date();
      const TTL_IN_MINS = 60 * 5; //expires in 5 hours //todo change to 20 in production
      const twentyMinutesLater = new Date(
        currentDate.getTime() + TTL_IN_MINS * 60 * 1000
      );

      const token = await nanoid(50);
      await fastify.ResetPasswordSession.create({
        token: appconfig.resetTokenPrefix + token,
        uid: staff._id,
        expireAt: twentyMinutesLater,
      });

      await sendEmail({
        from: "thuvaragan <thuvaraganuidesigns@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "Reset password", // Subject line
        html: `<h1>Your token <a href="#" target="_blank">http://localhost:8080/change-password/${token}</a></h1>`, // html body
      });

      reply.code(201).send({ username, email });
    } else {
      const staff = await fastify.Staff.updateOne(
        { _id: request.body.id },
        {
          firstName,
          lastName,
          username,
          email,
          permission,
        }
      );
      reply.code(201).send({ username, email });
    }
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
