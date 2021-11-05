const updateBlog = async (request, reply, fastify) => {
  try {
    const { docId } = request.params;
    const body = request.body;
    const _id = request.staff;

    const filter = { documentId: docId };

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Blog", priviledges: ["update"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isPublishEligible = await fastify.getPermissions(_id, [
      { rule: "Blog", priviledges: ["publish"] },
    ]);

    if (!isPublishEligible) {
      filter.staff = _id;
    } else {
      delete filter.staff;
    }

    let obj = {
      ...body,
    };

    await fastify.Blog.updateOne(filter, obj);
    reply.code(201).send({ documentId: docId, ...obj });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = updateBlog;
