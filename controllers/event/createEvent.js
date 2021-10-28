const createEvent = async (request, reply, fastify) => {
  const { documentId } = request.body;
  try {
    const _id = request.staff;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Event", priviledges: ["create"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isEvent = await fastify.Event.findOne({ documentId, staff: _id });

    if (isEvent) {
      reply.code(403).send({ msg: "content already exists" });
      return;
    }

    if (!isEvent) {
      const event = await fastify.Event.create({ documentId, staff: _id });
      reply.code(201).send(event);
    }
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = createEvent;
