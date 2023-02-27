const getKeyUser = require('./scripts/searchKeyUsers')

module.exports.getKeyUser = async (req, res, next) => {
  let response = []
  
  let statusCode = 200;
  
  try {
    response = await getKeyUser.searchKeyUsers({"company":"Adapcon","sector":"Financeiro"});
  } catch (error) {
    console.log(error)
    statusCode = 500;
    response.push({"error: ": error});
  }

  res.status(statusCode);
  res.json(response);
}