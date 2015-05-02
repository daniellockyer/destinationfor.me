module.exports = function(express, app) {
  var router = express.Router();

  router.get('/', function(req, res) {
    res.render('home');
  });

  router.get('/uni/:id', function(req, res) {
    res.render('uni', { id: req.params.id });
  });

  app.use(router);
}