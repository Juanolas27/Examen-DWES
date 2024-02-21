const express = require('express');
const router = express.Router();
const {login_usuario} = require('./conexionbd');
const {devolver_usuario} = require('./conexionbd');
const {devolver_libros} = require('./conexionbd');
const {devolver_usuario_por_id} = require('./conexionbd');
const {devolver_libros_usuario} = require('./conexionbd')
const {devolver_libros_por_id} = require('./conexionbd');

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  console.log(await devolver_libros(), await devolver_usuario_por_id(req.params.id))
  res.render("libros", {libros:await devolver_libros(), usuario:await devolver_usuario_por_id(req.params.id)})
});

router.post("/login_usuario", async function(req, res, next) {
  if (await login_usuario(req)){
    console.log("login correcto")
    res.cookie("usuario", (await devolver_usuario(req)).id)
    res.redirect(`/libros/${(await devolver_usuario(req)).id}`);
  }
  else{
    res.render("loggin_incorrecto")
  }
})

router.post("/registro", function(req, res) {
  res.redirect(`/registro`)

})

router.post("/logout", function(req, res) {
  res.clearCookie("usuario")
  res.redirect("/")
  res.render("login")
})

router.post("/coleccion/:id", async (req, res) => {
  console.log(await devolver_libros_por_id( await devolver_libros_usuario(req.params.id)));
  res.render("coleccion_usuario", {libros: await devolver_libros_por_id( await devolver_libros_usuario(req.params.id))})

})


module.exports = router;
