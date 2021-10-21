const getStaffBlogs = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const filter = request.query;
    const page = request.query.page;
    let blogs;
    let pages = 1;
    let filters = {};
    let perPage = 2;

    filters.staff = _id;

    if (filter["filter[isPublished]"]) {
      filters.isPublished =
        filter["filter[isPublished]"] === "true" ? true : false;
    }

    if (filter["filter[category]"]) {
      filters.category = filter["filter[category]"];
    }

    if (filter["filter[isUnderReview]"]) {
      filters.isUnderReview =
        filter["filter[isUnderReview]"] === "true" ? true : false;
    }

    if (filter["filter[body]"]) {
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
          $match: {
            isPublished:
              filter["filter[isPublished]"] === "true" ? true : false,
            isUnderReview:
              filter["filter[isUnderReview]"] === "true" ? true : false,
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
            isUnderReview: 1,
            isPublished: 1,
            staff: {
              username: 1,
            },
          },
        },
      ]);
    } else {
      blogs = await fastify.Blog.find(filters)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .populate({
          path: "staff",
          select: "username",
        });
      const count = await fastify.Blog.count(filters);
      pages = Math.ceil(parseInt(count) / perPage);
    }
    reply.code(200).send({ data: blogs, pages });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getStaffBlogs;
