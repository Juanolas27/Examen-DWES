const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require("dotenv").config()


const conexion = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

const register_usuario = ((req) =>{
    const query = "insert into usuarios (email, nombre, pwd, rol) values (?,?,?,?)"
    const values = [req.body.email, req.body.nombre,bcrypt.hashSync(req.body.pwd, bcrypt.genSaltSync(10)) , "usuario"]
    conexion.execute(query, values)
})

const login_usuario = (async(req) =>{
    const query = "select * from usuarios where email = ?"
    const values = [req.body.email]
    const [result, err] = await conexion.query(query, values)
    return bcrypt.compareSync(req.body.pwd,result[0].pwd)
})

const devolver_usuario = (async (req) =>{
    const query = "select * from usuarios where email = ?"
    const values = [req.body.email]
    const result = await conexion.execute(query, values)
    return result[0][0]
})
const devolver_usuario_por_id = (async (id) =>{
    const query = "select * from usuarios where id = ?"
    const values = [id]
    const result = await conexion.execute(query, values)
    return result[0][0]
})

const devolver_libros_usuario = (async (id) =>{
    const query = "select * from libro_por_usuario where id_usuario = ?"
    const values = [id]
    const result = await conexion.execute(query, values)
    return result[0]
})
const devolver_libros_por_id = (async (id) =>{
    
    values = [id]
    let lista = []
    await id.forEach(async (element)=>{
        const query = "select * from libro where id = ?"
        values = [element.id_libro]
        const result = await conexion.query(query,values)
        lista.push(result[0][0])
    })
    
    return lista
}
    
    )

const sumar_visita = (async(user) =>{
    const query = "select * from usuarios where id = ?"
    const values = [id]
    const [result, err] = await conexion.query(query,values)
    console.log(result[0][0])
    let sumado = result[0].visitas + 1

})

const devolver_libros = (async () =>{
    const query = "select * from libro"
    const [result,err] = await conexion.query(query)
    return result

})
module.exports = {
    register_usuario,
    login_usuario,
    devolver_usuario,
    devolver_libros,
    devolver_usuario_por_id,
    devolver_libros_usuario,
    devolver_libros_por_id,
}