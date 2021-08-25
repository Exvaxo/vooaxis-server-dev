const getNotes = async (request, reply, fastify) => {
  try {
    const _id = request.user;
    const filter = request.query;
    let notes;
    if (filter["filter[body]"]) {
      notes = await fastify.Note.aggregate([
        {
          $search: {
            index: "notes_body_search",
            text: {
              query: filter["filter[body]"],
              path: "body",
            },
          },
        },
        {
          $lookup: {
            // joins user details
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" }, //return object instead of array
        {
          $project: {
            // controls the visibility
            _id: 1,
            title: 1,
            body: 1,
            user: {
              username: 1,
            },
          },
        },
      ]);
    } else {
      notes = await fastify.Note.find({ user: _id }).populate("user");
    }
    reply.code(200).send(notes);
  } catch (error) {
    fastify.httpErrors.internalServerError();
    fastify.log.error(error);
  }
};

module.exports = getNotes;
