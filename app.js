const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const { userInfo } = require('os');



//membuat koneksi dengan database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cahyaseptia011",
    database: "dumbways"
});

app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//menghubungkan database
connection.connect(function(error) {
    if (!!error) console.log(error);
    else console.log("Terhubung ke database!");
});

app.get('/', (req, res) => {
    let sql = "SELECT * FROM image_blog JOIN users ON users.id = image_blog.id";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('user_interface', {
            title: "Dumb Gram",
            image_blog: rows
        });
    });
});

app.get('/addUser', (req, res) => {
    res.render('user_add', {
        title: 'Dumb Gram'
    });
});

app.post('/save', (req, res) => {
    let data = {
        name: req.body.name,
        email: req.body.email
    };
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/addBlog', (req, res) => {
    res.render('user_addBlog', {
        title: 'Tambahkan Blog'
    });
});

app.post('/saveBlog', (req, res) => {
    let data = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.file_image
    };
    let sql = "INSERT INTO image_blog SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(4500, () => {
    console.log("terhubung dengan menggunakan port 4500!");
});