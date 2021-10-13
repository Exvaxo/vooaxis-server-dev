const createBlog = async (request, reply, fastify) => {
  const { documentId, title, slug, thubmnail, category, subtitle, body } =
    request.body;
  try {
    const _id = request.staff;
    const blog = await fastify.Blog.create({
      documentId,
      title,
      slug,
      thubmnail,
      category,
      subtitle,
      body,
      staff: _id,
    });
    reply.code(201).send(blog);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = createBlog;
