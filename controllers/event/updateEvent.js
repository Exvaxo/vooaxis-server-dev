const moment = require("moment");
const updateEvent = async (request, reply, fastify) => {
  try {
    const { docId } = request.params;
    const body = request.body;
    const _id = request.staff;

    const filter = { documentId: docId };

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Event", priviledges: ["update"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isPublishEligible = await fastify.getPermissions(_id, [
      { rule: "Event", priviledges: ["publish"] },
    ]);

    if (!isPublishEligible) {
      filter.staff = _id;
    } else {
      delete filter.staff;
    }

    let obj = {
      ...body,
    };

    if (body.date) {
      obj.date = moment(body.date, "DD/MM/YYYY");
    }

    await fastify.Event.updateOne(filter, obj);
    reply.code(201).send({ documentId: docId, ...obj });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = updateEvent;
