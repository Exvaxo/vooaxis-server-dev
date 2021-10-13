const updateBlog = async (request, reply, fastify) => {
  try {
    const { docId } = request.params;
    const body = request.body;
    const _id = request.staff;
    await fastify.Blog.updateOne({ documentId: docId, staff: _id }, body);
    reply.code(201).send({ documentId: docId, ...body });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = updateBlog;
