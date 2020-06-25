module.exports = {
  getHomeRoute: function (req, res, next) {
    res.render('index', { title: 'Home Page', url: req.url })
  },
  getAboutRoute: function (req, res, next) {
    res.render('about', { title: 'About Page', url: req.url })
  },
  getParamRoute: function (req, res, next) {
    res.render('param', { title: 'Params Route', url: req.url, req })
  },
}
