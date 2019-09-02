const express   = require('express');

const router    = express.Router();

// bring models
let Article = require('../models/article');
// express validator 
const { check, validationResult } = require('express-validator');
router.get('/',(req,res)=>{
    Article.find({},(err,articles)=>{
        if(err) throw err;
        
         res.render('articles/index',{
             title:'Articles',
             articles:articles
         });
     });
 
 });
 
 router.get('/create',(req,res)=>{
     res.render('articles/create',{
         title:'Create Article'
     });
 });
 
 router.post('/create',[
         check('title',[
             'Title Required',
             ' String',
             ' and minimun 5'
         ]).isString().isLength({min:5}),
         check('author',[
             'Author Required',
             ' String',
             ' and minimun 3'
         ]).isString().isLength({min:3}),
         check('body',[
             'Body Required',
             ' String',
             ' and minimun 10'
         ]).isString().isLength({min:10})
    ],(req,res)=>{
         const errors = validationResult(req);
         if(!errors.isEmpty()){
             res.render('articles/create',{
                 title:'Create Article',
                 errors:errors
             });
         }else{
             let article =new Article();
             article.title   = req.body.title;
             article.author  = req.body.author;
             article.body    = req.body.body;
             article.save((err)=>{
                 if(err) throw err;
                 req.flash('success','article added');
                 res.redirect('/articles');
             });
         }
 
 
     }
 );
 
 router.get('/:id',(req,res)=>{
     Article.findById(req.params.id,(err,article)=>{
         if(err) throw err;
         res.render('articles/show',{
             article:article
         });
     });
 });
 router.get('/edit/:id',(req,res)=>{
     Article.findById(req.params.id,(err,article)=>{
         if(err) throw err;
         res.render('articles/edit',{
             title:'Edit ' + article.title,
             article:article
         });
     });
 });
 
 router.post('/update/:id',(req,res)=>{
     let article ={};
     article.title   = req.body.title;
     article.author  = req.body.author;
     article.body    = req.body.body;
     
     let query = {_id:req.params.id};
 
     Article.update(query,article,(err)=>{
         if(err) throw err;
         req.flash('success','Article Updated');
         res.redirect('/articles');
     });
 });
 
 router.delete('/:id',(req,res)=>{
     let query = {_id:req.params.id};
     Article.remove(query,(err)=>{
         if(err) throw err;
         res.send('Success');
     });
 });

 module.exports=router