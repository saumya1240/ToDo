var bodyParser =  require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://sample:test@todo-shard-00-00-tge2j.mongodb.net:27017,todo-shard-00-01-tge2j.mongodb.net:27017,todo-shard-00-02-tge2j.mongodb.net:27017/test?ssl=true&replicaSet=todo-shard-0&authSource=admin&retryWrites=true&w=majority' , {useNewUrlParser: true , useUnifiedTopology: true });

//to create a schema 
var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo' , todoSchema);

//var data =[{item : 'Complete the assignment'}, {item : 'Wash your hands'}, {item : 'Get some rest'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){ 

app.get('/todo' , function(req,res){
    Todo.find({} , function(err, data){
        if(err) throw err;
        res.render('todo' , {todos:data});
    });
});

app.post('/todo' ,urlencodedParser, function(req,res){
    var newtodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item' , function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err , data){
        if(err) throw err;
        res.json(data);
    }); 
});


};