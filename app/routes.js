module.exports = function(app) {
  var path = require('path');

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    //res.sendFile("public/index.html", {"root": __dirname});
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

};