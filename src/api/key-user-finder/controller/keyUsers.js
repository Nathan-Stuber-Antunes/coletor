module.exports.keyUsers = (req, res, next) => {
  const products = [
      {
        id: 1,
        name: "hammer",
      },
      {
        id: 2,
        name: "screwdriver",
      },
      {
        id: 3, 
        name: "wrench",
      },
     ];
  res.json(products);
}