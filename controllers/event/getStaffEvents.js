const getStaffEvents = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const filter = request.query;
    const page = request.query.page;
    let events;
    let pages = 1;
    let filters = {};
    let perPage = 2;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Event", priviledges: ["read"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    //filters.staff = _id;

    if (filter["filter[isPublished]"]) {
      filters.isPublished =
        filter["filter[isPublished]"] === "true" ? true : false;
    }

    if (filter["filter[isUnderReview]"]) {
      filters.isUnderReview =
        filter["filter[isUnderReview]"] === "true" ? true : false;
    }

    if (filter["filter[body]"]) {
      events = await fastify.Event.aggregate([
        {
          $search: {
            index: "events_body_search",
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
            slug: 1,
            date: 1,
            thumbnail: 1,
            eventDetails: 1,
            linkType: 1,
            link: 1,
            informations: 1,
            isPublished: 1,
            isUnderReview: 1,
            tabs: 1,
            staff: {
              username: 1,
            },
          },
        },
      ]);
    } else {
      events = await fastify.Event.find(filters)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .populate({
          path: "staff",
          select: "username",
        });
      const count = await fastify.Event.count(filters);
      pages = Math.ceil(parseInt(count) / perPage);
    }
    reply.code(200).send({ data: events, pages });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getStaffEvents;
