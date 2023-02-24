const keyUser = require('../../scripts/obterVariosElementosHTML.js')

module.exports.getKeyUsers = async (req, res, next) => {
  const elements = await keyUser.getHTMLElements();

  res.json(elements);
}