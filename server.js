const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000

const mysql = require('mysql');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

//connection mysql
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'coding'
})
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('My SQL connected....');
    }
})

app.post('/save', (req, res) => {
    const fromalldata = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        dept: req.body.dept
    }
    
    console.log(fromalldata);

    const QUERY =
        'INSERT INTO collage (name, email, age, dept) VALUES (?, ?, ?, ?)';

    db.query(QUERY, [fromalldata.name, fromalldata.email, fromalldata.age, fromalldata.dept], (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ message: 'data save in mysql' });
        }
    })
})
app.get('/display',(req,res)=>{
    const QUERY='SELECT * FROM collage'
    db.query(QUERY,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({messagge:data});
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is running port no ${PORT}`);
})