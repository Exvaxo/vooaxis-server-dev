const createDonation = async (request, reply, fastify) => {
  const { documentId } = request.body;
  try {
    const _id = request.staff;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Donation", priviledges: ["create"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isDonation = await fastify.Donation.findOne({
      documentId,
      staff: _id,
    });

    if (isDonation) {
      reply.code(403).send({ msg: "content already exists" });
      return;
    }

    if (!isDonation) {
      const donation = await fastify.Donation.create({
        documentId,
        staff: _id,
      });
      reply.code(201).send(donation);
    }
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = createDonation;
