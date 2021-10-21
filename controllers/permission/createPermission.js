const createPermission = async (request, reply, fastify) => {
  const { name, description, permissions } = request.body;
  try {
    const _id = request.staff;
    let permission = null;

    if (request.body._id) {
      permission = await fastify.Permission.updateOne(
        { _id: request.body._id },
        { name, description, permissions }
      );
    }

    if (!request.body._id) {
      permission = await fastify.Permission.create({
        name,
        description,
        permissions,
      });
    }

    reply.code(201).send(permission);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = createPermission;
