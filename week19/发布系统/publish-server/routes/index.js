var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.post('/', function(request, res, next) {
  fs.writeFileSync(`../server/public/${request.query.filename}`, request.body.content)
  // res.render('index', { title: 'Express' });

  res.send('')
  res.end()
});

module.exports = router;
