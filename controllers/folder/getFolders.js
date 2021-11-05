const getFolders = async (request, reply, fastify) => {
  try {
    const filter = request.query;
    const { id } = request.params;
    const page = parseInt(filter.page) - 1;
    const perPage = 5;
    let pages = 1;
    let medias;
    let filterObj = {
      folder: id,
    };

    if (filter["filter[name]"] || filter["filter[type]"]) {
      if (filter["filter[name]"]) {
        filterObj.name = {
          $regex: filter["filter[name]"],
          $options: "si",
        };
      }

      if (filter["filter[type]"]) {
        filterObj.type = filter["filter[type]"];
      }

      medias = await fastify.Media.find(filterObj).sort({ created_at: -1 });
    } else {
      medias = await fastify.Media.find({ folder: id })
        .limit(perPage)
        .skip(perPage * page)
        .sort({ created_at: -1 });
    }
    const count = await fastify.Media.count(filterObj);
    pages = Math.ceil(parseInt(count) / perPage);
    reply.code(200).send({ medias, pages, count: parseInt(count) });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getFolders;
