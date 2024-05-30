const express = require("express");//Import the express module
const app = express();//create an Express application instance
const port = 8080;//The 'port' variable is used in the 'app.listen(port,callback)' method to specify the part on which the express server will listen for incoming requests.
const path = require("path");//Imports the path module for working with file paths. 
const { v4: uuidv4 } = require('uuid'); //for generating random id.
const methodOverride = require("method-override")
 

app.use(express.urlencoded({extended : true}));//Parses URL-encoded from data.
app.use(methodOverride('_method'));// override with POST having ?_method=DELETE

app.set("view engine","ejs");//Sets EJS as the view engine for rendering templates.
app.set("views",path.join(__dirname,"views"));//Specifies the directory for view templates.

app.use(express.static(path.join(__dirname,"public")));//Serves static files from the public directory. 

let posts = [
    {
        id:uuidv4(),
        username : "Rashid Khan",
        content : "I love coding"
    }
];

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");//render next page after click
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res) =>{   //<form method="post" action="/posts/<%=post.id%>?_method=PATCH">
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs");
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port,() => {
    console.log(`listening to port : ${8080}`);
});