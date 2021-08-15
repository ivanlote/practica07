const { Pool } = require('pg')
const path = require('path')

/*const pool=new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'tareas_bd',
    port: '5433'
})*/

const pool = new Pool({
    host: 'ec2-54-156-85-145.compute-1.amazonaws.com',
    user: 'fpjbdixchesuoq',
    password: '21865becf99c4527ee114fe3c3f1072d5607a7a48ea8493db647aecf20fc4ebe',
    database: 'd57u1pjnaardgu',
    port: '5432',
    ssl: true, dialectOptions: { "ssl": { "require": true } }
})
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const getTarea = async (req, res) => {

    const respuesta = await pool.query('SELECT * FROM tarea ORDER BY _id')
    console.log(respuesta.rows);
    res.render("tarea", {
        tareas: respuesta.rows
    });
}

const getTareaById = async (req, res) => {
    const tarea = await pool.query('SELECT * FROM tarea WHERE _id=$1', [req.params.id])
    const tareas = await pool.query('SELECT * FROM tarea ORDER BY _id')
    res.render("tarea", {
        tarea: tarea.rows[0],
        tareas: tareas.rows
    });
}

const createTarea = async (req, res) => {
    if (req.body._id === '') {
        const { nombre } = req.body
        const respuesta = await pool.query('INSERT INTO tarea(nombre) VALUES ($1)', [nombre])
        res.redirect('/')
    } else {
        updateTarea(req, res)
    }

}

const deleteTarea = async (req, res) => {
    await pool.query('DELETE FROM tarea WHERE _id=$1', [req.params.id])
    res.redirect('/')
}

const updateTarea = async (req, res) => {
    const id = req.body._id
    const { nombre } = req.body
    await pool.query('UPDATE tarea SET nombre=$1 WHERE _id=$2', [nombre, id])
    res.redirect('/')
}

const updateEstadoTarea = async (req, res) => {
    const id = req.params.id
    await pool.query('UPDATE tarea SET estado=$1 WHERE _id=$2', ['true', id])
    res.redirect('/')
}

module.exports = {
    getTarea,
    createTarea,
    getTareaById,
    deleteTarea,
    updateTarea,
    updateEstadoTarea
}

    // host: 'localhost',
    // user: 'postgres',
    // password: 'kxlvx',
    // database: 'tareas_node',
    // port: '5432'
