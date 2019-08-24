const app = require('express')();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// check connection
db.once('open',()=>{
    console.log('Connected to MongoDB');
});

//  check for db error
db.on('error',(err)=>{
    console.log(err);
});

// bring models
let Article = require('./models/article');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


app.get('/',(req,res)=>{
    res.render('index',{
        title:'TinDev'
    });
});

app.get('/articles',(req,res)=>{
   Article.find({},(err,articles)=>{
       if(err) throw err;
       
        res.render('articles/index',{
            title:'Articles',
            articles:articles
        });
    });

});

app.get('/articles/create',(req,res)=>{
    res.render('articles/create',{
        title:'Create Article'
    });
});

app.listen(2000,()=>{
    console.log('Server started on port 2000....');
});