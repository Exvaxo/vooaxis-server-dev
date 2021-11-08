const uploadGallery = async (request, reply, fastify) => {
  try {
    const { type, name, url, ref } = request.body;

    const user_id = request.staff;
    const isEligible = await fastify.getPermissions(user_id, [
      { rule: "Gallery", priviledges: ["update"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const { _id } = request.params;
    await fastify.Media.create({
      type,
      name,
      url,
      ref,
      folder: _id,
    });
    reply.code(200).send({});
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = uploadGallery;
