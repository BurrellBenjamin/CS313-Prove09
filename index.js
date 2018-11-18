const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

constapp = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.url('/index', function (req, res) {
    res.send('index.html');
})