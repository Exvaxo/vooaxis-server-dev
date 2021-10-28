const moment = require("moment");
const updateEvent = async (request, reply, fastify) => {
  try {
    const { docId } = request.params;
    const body = request.body;
    const _id = request.staff;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Event", priviledges: ["update"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    let obj = {
      ...body,
    };

    if (body.date) {
      obj.date = moment(body.date, "DD/MM/YYYY");
    }

    await fastify.Event.updateOne({ documentId: docId, staff: _id }, obj);
    reply.code(201).send({ documentId: docId, ...obj });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = updateEvent;
