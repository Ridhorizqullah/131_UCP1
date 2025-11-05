const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/hotel', async (req, res) => {
    try {
        const hotel = await db.Hotel.create(req.body);
        res.status(201).json(hotel); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/hotel', async (req, res) => {
    try {
        const hotels = await db.Hotel.findAll();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/hotel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await db.Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        await hotel.update(req.body);
        res.json({ message: 'Hotel berhasil diupdate' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/hotel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await db.Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        await hotel.destroy();
        res.json({ message: 'Hotel berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


db.sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is started on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });