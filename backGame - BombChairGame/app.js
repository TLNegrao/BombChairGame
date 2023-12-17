require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const helmet  = require('helmet');

// const port = 3100;

const app = express();
const config = require('./config/database');


//connect to database
mongoose.connect(config.database).then(() => {
    console.log('Conectado ao banco de dados -> ' + config.database)
}).catch((err) => {
    console.log('Erro ao conectar com banco de dados ' + err)
});



app.use(helmet());
// app.use(morgan('tiny'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const routes = require('./route');
app.use(routes);
  

app.listen(3100, () => console.log("Server is Running"));