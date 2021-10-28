const deleteEvent = async (request, reply, fastify) => {
  try {
    const { docId } = request.params;
    const _id = request.staff;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Event", priviledges: ["delete"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    await fastify.Event.deleteOne({ documentId: docId });
    reply.code(204).send("no content");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = deleteEvent;
