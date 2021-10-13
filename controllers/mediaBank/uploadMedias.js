const upload = async (request, reply, fastify) => {
  try {
    const { type, name, url, ref } = request.body;
    const media = await fastify.MediaBank.create({
      type,
      name,
      url,
      ref,
    });
    reply.code(201).send(media);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = upload;
