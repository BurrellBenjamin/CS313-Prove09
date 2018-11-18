const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('public/index.html'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.get('/results.ejs?', function (req, res){
    var price = calculateRate(req.query['type'],req.query['weight']);
    var weight = req.query['weight'];
    var type = req.query['type'];
    res.render('pages/results.ejs', {price: price, weight: weight, type: type});
})

function calculateRate(mailType, weight){
    var price = 0;
    switch(mailType){
        case "stamped letter":{
            price += .50;
            if (weight > (1/16)){
                price += (weight -1 ) * .21;
            }
            break;
        }
        case "metered letter":{
            price += .47;
            if (weight > (1/16)){
                price += (weight - 1) * .21;
            }
            break;
        }
        case "large envelope":{
            price += 1.00;
            if (weight > (1/16)){
                price += (weight - 1) * .21;
            }
            break;
        }
        case "package":{
            price +=3.50;
            if (weight > 4)
                price += .25;
            if (weight >8)
                price += (weight - 8) * .35;
            break;
        }
    }
    return price;
}