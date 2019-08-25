const express       = require('express');
const path          = require('path');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');

const app = express();

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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname,'public')));

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

app.post('/articles/create',(req,res)=>{
    console.log('Submited');
    let article =new Article();
        article.title   = req.body.title;
        article.author  = req.body.author;
        article.body    = req.body.body;
        article.save((err)=>{
            if(err) throw err;
            res.redirect('/articles');
        });
});

app.get('/articles/:id',(req,res)=>{
    Article.findById(req.params.id,(err,article)=>{
        if(err) throw err;
        res.render('articles/show',{
            article:article
        });
    });
});

app.listen(2000,()=>{
    console.log('Server started on port 2000....');
});