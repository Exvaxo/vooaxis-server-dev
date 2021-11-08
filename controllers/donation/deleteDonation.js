const deleteDonation = async (request, reply, fastify) => {
  try {
    const { docId } = request.params;
    const _id = request.staff;

    await fastify.Donation.deleteOne({ documentId: docId, staff: _id });
    reply.code(204).send("no content");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = deleteDonation;
