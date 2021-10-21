const fp = require("fastify-plugin");

module.exports = fp((fastify, opts, next) => {
  const getPermissions = async (_uid, rules) => {
    const permission = await fastify.Staff.findOne({ _id: _uid })
      .select("_id")
      .populate({
        path: "permission",
        select: "permissions",
      });

    let perm = permission.permission.permissions;

    let isEligible = true;

    for (let index = 0; index < rules.length; index++) {
      for (let r = 0; r < rules[index].priviledges.length; r++) {
        let rule = rules[index].priviledges[r];
        if (perm[rules[index].rule] !== undefined) {
          if (!perm[rules[index].rule].includes(rule)) {
            isEligible = false;
          }
        } else {
          isEligible = false;
        }
      }
    }

    return isEligible;
  };
  fastify.decorate("getPermissions", getPermissions);
  next();
});
