const getStaffBlogs = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const filter = request.query;
    let blogs;
    if (filter["filter[body]"]) {
      console.log(filter["filter[body]"]);
      blogs = await fastify.Blog.aggregate([
        {
          $search: {
            index: "blogs_body_search",
            text: {
              query: filter["filter[body]"],
              path: {
                wildcard: "*",
              },
            },
          },
        },
        {
          $lookup: {
            // joins user details
            from: "staffs",
            localField: "staff",
            foreignField: "_id",
            as: "staff",
          },
        },
        { $unwind: "$staff" }, //return object instead of array
        {
          $project: {
            // controls the visibility
            _id: 1,
            title: 1,
            subtitle: 1,
            slug: 1,
            thumbnail: 1,
            category: 1,
            body: 1,
            staff: {
              username: 1,
            },
          },
        },
      ]);
    } else {
      blogs = await fastify.Blog.find({ staff: _id }).populate({
        path: "staff",
        select: "username",
      });
    }
    reply.code(200).send(blogs);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getStaffBlogs;
