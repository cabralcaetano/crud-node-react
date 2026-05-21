const express = require('express')

const db = require('../db/database.js')

const router = express.Router();

// GET
router.get('/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
});

// INSERT
router.post('/tasks', (req, res) => {
    // validacao
    if (req.body.title === null) {
        console.log('titulo vazio')
        break;
    }
    // faz
    const result = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)').run(req.body.title, 0);

    // output
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.json(task);

});

// UPDATE
router.put('/tasks/:id', (req, res) => {
    //             ^^^^ onde o user joga o id da column
    // faz
    const put = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(req.body.title, req.body.done, req.params.id);

    //output
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(task);
});

// DELETE
router.delete('/tasks/:id', (req, res) => {
    //                ^^^^ onde o user joga o id da column
    // faz
    const task = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);

    // output
    res.json({ message: 'Task deletada com sucesso' });
});


module.exports = router;