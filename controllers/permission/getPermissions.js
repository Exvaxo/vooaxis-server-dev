const getPermissions = async (request, reply, fastify) => {
  try {
    const _id = request.staff;

    const permissions = await fastify.Permission.find({});
    let updatedPermissions = [];
    for (let index = 0; index < permissions.length; index++) {
      let id = permissions[index]._id;
      c = await fastify.Staff.count({ permission: id });
      updatedPermissions.push({
        _id: id,
        name: permissions[index].name,
        description: permissions[index].description,
        permissions: permissions[index].permissions,
        count: c,
      });
    }

    reply.code(200).send(updatedPermissions);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getPermissions;
