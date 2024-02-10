const data = require("../data/store");

const getData = (req, res, next) => {
  let filteredData = [...data];
  if (req.query.status) {
    console.log(req.query.status);
    filteredData = filteredData.filter(
      (item) => item.status.toLowerCase() === req.query.status.toLowerCase()
    );
  }

  if (req.query.start && req.query.end) {
    const { start, end } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);
    filteredData = filteredData.filter((item) => {
      const createdAt = new Date(item.createdAt);

      return createdAt >= startDate && createdAt <= endDate;
    });
  }

  res.json(filteredData);
};

module.exports = { getData };
