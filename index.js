const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const hotel = require('./models/hotel');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port,() => {
    console.log(`Server is started on port`);
})

db.sequelize.sync()
    .then((result) => {
        app.listen(port, () => {
            console.log(`Server is strated`);
        })
    })
    .catch((err) => {
        console.log(err);
    })