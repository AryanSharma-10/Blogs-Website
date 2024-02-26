import express from "express";
import bodyParser from "body-parser";
import axios from "axios"

const app = express();
const port = 3000;
const backendPort = 5000;
const API_URL = `http://localhost:${backendPort}`

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(port, ()=> {
    console.log(`Server running on http://localhost:${port}`)
})

//Home Page Route
app.get("/", async (req, res)=>{
    try {
        const response = await axios.get(`${API_URL}/blogs`);
        console.log(response.data);
        res.render("home.ejs", {blogs: response.data})
    } catch (error) {
        console.log("ERROR");
    }
})

// User Blog Route
app.get("/my-blogs", async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/user-blogs`);
        console.log(response.data);
        res.render("userBlogs.ejs", {blogs: response.data});
    }
    catch(error){
        console.log("Error");
    }
})

// Create Blog Route
app.get("/create-blog", (req,res)=>{
    res.render("createBlog.ejs",{title: "Create New Blog"});
})

app.post("/create-blog", async (req, res)=>{
    try{
        console.log(req.body);
        const response = await axios.post(`${API_URL}/blogs`, req.body);
        console.log(response.data);
        res.redirect("/my-blogs");
    } catch(error){
        console.log("ERROR");
    }
})

// Get BLog by ID
app.get("/blogs/:id", async (req, res)=>{
    const id = req.params.id;
    try{
        const response = await axios.get(`${API_URL}/blogs/${id}`);
        const data = response.data;
        res.render("editBlog.ejs", {id: data.id, title: data.title, content: data.content});
    }catch(error){
        console.log("ERROR");
    }
})

app.post("/blogs/:id", async (req, res)=>{
    const id = req.params.id;
    const data = req.body;
    try{
        const response = await axios.patch(`${API_URL}/blogs/${id}`, data);
        const blog = response.data;
        console.log(blog);
        res.redirect("/my-blogs");
    }catch(error){
        console.log("ERROR");
    }
})


app.get("/blogs/delete/:id", async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    try{
        const response = await axios.delete(`${API_URL}/blogs/${id}`, data);
        const blog = response.data;
        console.log(blog);
        res.redirect("/my-blogs");
    }catch(error){
        console.log("ERROR");
    }
}) 


app.get("/styles/:id", async (req, res)=>{
    const id = req.params.id;
    console.log(`Edit request for: ${id}`);
    // console.log("BRUH");
    res.render("editBlog.ejs", {title: "Edit Blog", blogTitle: "title", content: "content"});
})


app.get("*", (req,res)=>{
    res.render("pageNotFound.ejs", {title: "404 Page Not Found"})
})

function authenticate(res){
    if(userName == "")
    {
        console.log("HI")
        res.redirect("/");
    }
}