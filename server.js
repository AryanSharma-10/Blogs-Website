import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

let userName = "default Name";
let blogs = [ {content: "content2", title: "title2"},{content: "content1", title: "title1"}];
let userBlogs = [{id: 1, content: "Sample1", title: "sample1"}, {id: 2, content: "Sample2", title: "sample2"}];
let blogID = 3;

app.listen(port, ()=>{
    console.log(`Backend server running on: http://localhost:${port}`);
})

app.get("/", (req, res)=>{
    res.render(home.ejs);
})

app.get("/blogs", (req, res)=>{
    console.log(blogs);
    res.json(blogs);
})


app.get("/user-blogs", (req, res)=>{
    console.log(userBlogs);
    res.json(userBlogs);
})

app.post("/blogs", (req, res)=>{ 
    const data = req.body;
    userBlogs.push({
        id: blogID,
        title: data.title,
        content: data.content
    });
    console.log(userBlogs);
    blogID += 1;
    
    console.log(userBlogs[userBlogs.length - 1]);
    res.json(data);
})

app.get("/blogs/:id", (req, res)=>{ 
    const id = parseInt(req.params.id);
    const blog = userBlogs.find((blog)=>{
        return blog.id === id;
    })

    console.log(blog);
    res.json(blog);
})

app.patch("/blogs/:id", (req, res)=>{ 
    const id = parseInt(req.params.id);
    const data = req.body;
    const blog = userBlogs.find((blog)=>{
        return blog.id === id;
    })

    if(data.title)
        blog.title = data.title;

    if(data.content)
        blog.content = data.content;

    console.log(blog);
    res.json(blog);
})

app.delete("/blogs/:id", (req, res)=>{ 
    const id = parseInt(req.params.id);
    const data = req.body;
    console.log("incoming blog: ");
    console.log(data);

    const blog = userBlogs.find((blog)=>{
        return blog.id === id;
    })

    const index = userBlogs.indexOf(blog);
    userBlogs.splice(index, 1);

    console.log(blog);
    res.json(blog);
})
