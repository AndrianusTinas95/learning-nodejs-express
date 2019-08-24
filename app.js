const app = require('express')();
const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


app.get('/',(req,res)=>{
    res.render('index',{
        title:'TinDev'
    });
});

app.get('/articles',(req,res)=>{
    let articles = [
        {
            id:1,
            title:'First Article',
            author:'TinDev',
            body:'This is my frirst article'
        },
        {
            id:2,
            title:'Second Article',
            author:'TinDev',
            body:'This is my second article'
        },
        {
            id:1,
            title:'Third Article',
            author:'TinDev',
            body:'This is my Third article'
        },
    ];
    res.render('articles/index',{
        title:'Articles',
        articles:articles
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