var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/join', function (req, res, next) {
  res.render('join', { title: '모두에게 알려주고 싶은, 입소문' });
});

router.get('/popup/jusoPopup', (req, res) => {
  res.render('jusoPopup');
});

router.post('/popup/jusoPopup', (req, res) => {
  res.locals = req.body;
  res.render('jusoPopup');
});

module.exports = router;