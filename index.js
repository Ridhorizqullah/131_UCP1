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

app.post('/hotel', async (req, res) => {
    const data = req.body;
     try {
        const hotel = await db.hotel.create(data);
        res.status(hotel);
    } catch (error) {
    res.send({message : error.message});
    }
});

app.get('/hotel', async (req, res) => {
    try{
        const Hotel = await db.Hotel.findAll();
        res.send(Hotel);
    }
    catch (error){
        res.send({message : error.message});
    }
});

app.put('/hotel/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const hotel = await db.hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).send({ message: 'hotel not found' });
        }
        await hotel.update(data);   
        res.send({ message: 'hotel berhasil di update' });
    } 
    catch (error) {
        res.send({ message: error.message });
    }
});

app.delete('/hotel/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const hotel = await db.hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).send({ message: 'hotel not found' });
        }
        await hotel.destroy();
        res.send({ message: 'hotel berhasil dihapus' });
    } catch (error) {
        res.send({ message: error.message });
    }
});