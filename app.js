const app = require('express')();


app.get('/',(req,res)=>{
    res.send('Hallo TinDev');
});

app.listen(2000,()=>{
    console.log('Server started on port 2000....');
});