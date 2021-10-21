const getStaffSingleBlog = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const { docId } = request.params;

    const blog = await fastify.Blog.findOne({
      documentId: docId,
      staff: _id,
    });
    reply.code(200).send(blog);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getStaffSingleBlog;
