const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()



const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))

const Student = mongoose.model('Student', {
    firstName: String,
    lastName: String,
    rollNo: Number,
    techStack: Number
})

app.get('/', (req, res) => {
    res.json({message: 'All Good!'})
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB connection established")
        console.log("Serrver running on http://localhost:4000")
    })
    .catch((err) => console.log("DB connection failed", err))
})