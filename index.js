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
    echo(req);
    res.render('pages/results.ejs')
})

function calculateRate(mailType, weight){
    var price = 0;
    switch(mailType){
        case "stamped":{
            price += .50;
            if (weight > (1/16)){
                price += (weight -1 ) * .21;
            }
            break;
        }
        case "metered":{
            price += .47;
            if (weight > (1/16)){
                price += (weight - 1) * .21;
            }
            break;
        }
        case "flats":{
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