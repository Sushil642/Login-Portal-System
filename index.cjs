const express =require("express");
const bodyParser=require("body-parser");
const  collection =require("./mongodb.cjs");



const app=express();
const port=3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/",(req,res)=>{
   
    showAlerts = false;

    res.render("login.ejs",{showAlerts});
});     
app.post("/login", async (req,res)=>{
    
    try{
    const check=await collection.findOne({email:req.body.Email});
    // console.log(check);
    // console.log(check.enter_pass == req.body.Password);
   
    if(check.enter_pass == req.body.Password)
    {
        // res.send("You have successfully login");
        res.render("dashboard.ejs",{
            username:check.username,
            email:check.email
        })
    }
    else{
       res.render("login.ejs",{passwd:"inc",showAlerts:true})
    }
    
}
catch{
   
    res.render("login.ejs",{email:"inc",passwd:"inc",showAlerts:true})
}

});
app.post("/Register",(req,res)=>{
   
    res.render("register.ejs");
});
app.post("/Registered",async (req,res)=>{
    const data={
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        username:req.body.username,
        number:req.body.number,
        enter_pass:req.body.enter_pass,
        conf_pass:req.body.conf_pass

    }
    await collection.insertMany([data]);
    res.render("login.ejs");
    
});
app.listen(port,()=>{
   console.log(`Server Running on port ${port}`);
});

//mongodb data storage



