const express = require('express')
const path = require('path');
const app = express()
const port = 3500;
app.use(express.static(__dirname + '/public'));

app.get('/version', (req, res) => {
  res.send('1.0.0')
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, () => {
  console.log(`Social error page listening at http://localhost:${port}`)
})
