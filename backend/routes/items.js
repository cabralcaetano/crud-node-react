const express = require('express')

const db = require('../db/database.js')

const router = express.Router();

router.get('/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
});

router.post('/tasks', (req, res) => {
    const result = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)').run(req.body.title, 0);
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.json(task);

});

router.put('/tasks/:id', (req, res) => {
    const put = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(req.body.title, req.body.done, req.params.id);
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(task);
});

router.delete('/tasks/:id', (req, res) => {
    const task = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    res.json({ message: 'Task deletada com sucesso' });
});


module.exports = router;