const { User } = require("../models/user.model");

const sendSearchResult = async (req, res) => {
  try {
    const { users } = req;
    if (!users.length) {
      return res.status(422).json({ success: false, data: "No User Found.." });
    }
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ succcess: false, error: "something went worng" });
  }
};

module.exports = { sendSearchResult };
