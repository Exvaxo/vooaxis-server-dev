const getStaffSingleDonation = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const { docId } = request.params;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Donation", priviledges: ["read"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const donation = await fastify.Donation.findOne({
      documentId: docId,
    });

    reply.code(200).send(donation);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getStaffSingleDonation;
