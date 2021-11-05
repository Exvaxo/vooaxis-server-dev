const getFolders = async (request, reply, fastify) => {
  try {
    const filter = request.query;
    const page = parseInt(filter.page) - 1;
    const perPage = 23;
    let medias;
    let pages = 1;

    if (filter["filter[folderName]"]) {
      let filterObj = {};

      if (filter["filter[folderName]"]) {
        filterObj.folderName = {
          $regex: filter["filter[folderName]"],
          $options: "si",
        };
      }

      medias = await fastify.Folder.find(filterObj).sort({ created_at: -1 });
    } else {
      medias = await fastify.Folder.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ created_at: -1 });
    }
    const count = await fastify.Folder.count();
    pages = Math.ceil(parseInt(count) / perPage);

    reply.code(200).send({ medias, pages });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getFolders;
