var express =  require('express'),
    app = express();

app.get('/', function(req, res){
    res.send("hi from express");
});

app.listen(3000, ()=>{
    console.log("app is running on port 3000");
});
