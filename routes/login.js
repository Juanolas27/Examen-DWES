const express = require('express');
const router = express.Router();
const {register_usuario} = require('./conexionbd')

/* GET home page. */
router.get('/', async function(req, res, next) {

  

  res.render('login');
});

router.post("/", function(req, res, next) {
  register_usuario(req)
  res.render('login')
})





module.exports = router;
