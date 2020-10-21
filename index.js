var express =  require('express'),
    app = express();

var todoRoutes = require("./routes/todos");

app.get('/', function(req, res){
    res.send("hi from the root route");
});

// prefix todoRoutes
app.use('/api/todos/', todoRoutes);

app.listen(3000, ()=>{
    console.log("app is running on port 3000");
});

