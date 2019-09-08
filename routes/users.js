const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

// Bring in user model
let User = require('../models/user');

const { check, validationResult } = require('express-validator');

// Register Form 
router.get('/register',(req,res)=>{
    res.render('users/register');
});

// Register Form 
router.post('/register',[
    check('name',[
        'Name Required',' String',' and Minimum 5'
    ]).isString().isLength({min:5}),
    check('email',[
        'Email Required',' Format Email',
    ]).isEmail(),
    check('username',[
        'Username Required',' String',' and Minimum 6'
    ]).isString().isLength({min:6}),
    check('password',[
        'Password Required',' String',' and Minimum 6'
    ]).isString().isLength({min:6}),
    check('password_confirm','Passwords not must match.').isString()
    .isLength({min:6}).withMessage('Confirm password is required. Min 6')
    .custom((value, {req}) => (value === req.body.password)),
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('users/register',{
            errors:errors
        });
    }else{
        const name              = req.body.name;
        const email             = req.body.email;
        const username          = req.body.username;
        const password          = req.body.password;
        // const password_confirm  = req.body.password_confirm;
        
        let user = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err) throw err;
                user.password = hash;
                user.save((err)=>{
                    if(err) throw err;
                    req.flash('success','You are now registered and can log in');
                    res.redirect('/users/login');
                });
            });
        });
    }
});

router.get('/login',(req,res)=>{
    res.render('users/login');
});
module.exports=router