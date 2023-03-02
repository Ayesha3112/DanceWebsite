const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");

// CONNECTION TO MONGOOSE
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
   // console.log("we are connected");
}
const port = 8000;


// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// DEFINE MONGOOSE MODEL
const Contact = mongoose.model('Contact' , contactSchema);

// EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'));  // For serving static files
// app.use('/static', express.static('static'));  here '/static'=URL and 'static'=Folder
app.use(express.urlencoded());


// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'pug');  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));  // Set the view directory


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {  };
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {  };
    res.status(200).render('contact.pug', params);
})


// SAVE THE DATA USING ENDPOINTS
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved to the database");
    }).catch(() =>{
        res.status(400).send("Item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, () => {
    console.log(`this app starts successfully on port ${port}`);
});
