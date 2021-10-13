const getMedias = async (request, reply, fastify) => {
  try {
    const filter = request.query;
    const page = parseInt(filter.page) - 1;
    const limit = 10;
    let medias;
    if (filter["filter[name]"] || filter["filter[type]"]) {
      let filterObj = {};
      if (filter["filter[name]"]) {
        filterObj.name = { $regex: filter["filter[name]"], $options: "si" };
      }
      if (filter["filter[type]"]) {
        filterObj.type = filter["filter[type]"];
      }

      medias = await fastify.MediaBank.find(filterObj).sort({ created_at: -1 });
    } else {
      medias = await fastify.MediaBank.find({})
        .limit(limit)
        .skip(limit * page)
        .sort({ created_at: -1 });
    }
    reply.code(200).send(medias);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getMedias;
