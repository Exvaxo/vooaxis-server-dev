const createBlog = async (request, reply, fastify) => {
  const { documentId } = request.body;
  try {
    const _id = request.staff;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Blog", priviledges: ["create"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isBlog = await fastify.Blog.findOne({ documentId, staff: _id });

    if (isBlog) {
      reply.code(403).send({ msg: "content already exists" });
      return;
    }

    if (!isBlog) {
      const blog = await fastify.Blog.create({ documentId, staff: _id });
      reply.code(201).send(blog);
    }
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = createBlog;
