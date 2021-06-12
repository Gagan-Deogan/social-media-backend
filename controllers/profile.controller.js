const sendData = (req, res) => {
  const { profile, posts } = req;
  res.status(200).json({ data: { profile, posts } });
};

module.exports = { sendData };
