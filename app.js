const express    = require('express');
const path       = require('path');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
// const flash      = require('connect-flash');
const session    = require('express-session');

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



app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname,'public')));

// express session
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge: 6000 }
}));

// express messages middleware
app.use(require('connect-flash')());
app.use((req,res,next)=>{
    res.locals.messages = require('express-messages')(req,res);
    next();
});


// home route
app.get('/',(req,res)=>{
    req.flash('success','Cek lah');

    res.render('index',{
        title:'TinDev',
    });
});

// router files
let articles = require('./routes/articles');
let users = require('./routes/users');

app.use('/articles',articles);
app.use('/users',users);

app.listen(2000,()=>{
    console.log('Server started on port 2000....');
});