module.exports.index = function(application, req, res) {
    var newsModel = new application.src.routes.key-user-finder.models.news();
  
    newsModel.getLastNews(function(err, result) {
      res.render("news/index", {news : result});
    });
  }