var express =  require('express'),
    app = express();

    // require and use body parser
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

var todoRoutes = require("./routes/todos");

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

// prefix todoRoutes
app.use('/api/todos/', todoRoutes);

app.listen(3000, ()=>{
    console.log("app is running on port 3000 http://localhost:3000");
}); 

