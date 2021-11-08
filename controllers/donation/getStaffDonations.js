const getStaffDonations = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const filter = request.query;
    const page = request.query.page;
    let donations;
    let pages = 1;
    let filters = {};
    let perPage = 2;

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Donation", priviledges: ["read"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isPublishEligible = await fastify.getPermissions(_id, [
      { rule: "Donation", priviledges: ["publish"] },
    ]);

    if (!isPublishEligible) {
      filters.staff = _id;
    } else {
      delete filters.staff;
    }

    if (filter["filter[isPublished]"]) {
      filters.isPublished =
        filter["filter[isPublished]"] === "true" ? true : false;

      if (!filters.isPublished) {
        filters.staff = _id;
      }
    }

    if (filter["filter[category]"]) {
      filters.category = filter["filter[category]"];
    }

    if (filter["filter[isUnderReview]"]) {
      filters.isUnderReview =
        filter["filter[isUnderReview]"] === "true" ? true : false;
    }

    if (filter["filter[body]"]) {
      donations = await fastify.Donation.aggregate([
        {
          $search: {
            index: "donations_body_search",
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
            goal: 1,
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
      donations = await fastify.Donation.find(filters)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .populate({
          path: "staff",
          select: "username",
        });
      const count = await fastify.Donation.count(filters);
      pages = Math.ceil(parseInt(count) / perPage);
    }

    reply.code(200).send({ data: donations, pages });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getStaffDonations;
