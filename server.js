const express = require('express')
const app = express();
const port = process.env.PORT ||  3000;

const path = require('path');

app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname,'public')));
app.get('/', (req, res) => {
  res.sendFile('index.html',{root:__dirname});
});

app.get('/contact', (req, res) => {
    res.sendFile('contact.html',{root:__dirname});
  });
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});