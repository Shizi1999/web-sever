const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const cors = require('cors');

const route = require('./routes/index');
const connectDB = require('./config/db/connect');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();
route(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
