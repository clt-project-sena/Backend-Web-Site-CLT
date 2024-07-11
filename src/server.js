const express = require('express');
const BDConnect = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

BDConnect();

var corsOptions ={
  origin: true //["https://tibavija.github.io"]
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: `Welcome!` });
});

app.use('/api/panel', require('./routes/panel.routes'));
app.use('/api/user', require('./routes/user.routes'));

app.listen(PORT,()=> {
  console.log(`Server running on port ${PORT}.`);
});