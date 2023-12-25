const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('../models/blog'); // Make sure to replace with the correct path to your blog model

// Connect to MongoDB
const dbURI = "mongodb+srv://KennyCWK:lIUCKItqWCgjkYWE@mongodbblog.ajns4gc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen(3000);
    })
    .catch((err) => console.log(err));

app.set('view engine', "ejs");
app.use(express.urlencoded({ extended: true }));

// Route to add a new blog


// Route to render the home page
app.get("/", (req, res) => {
    res.render('index', {h1: "Home page"});
});

// Route to handle the form submission for creating a blog
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)
    // let user_blog = req.body;
    // console.log(user_blog);
    // res.redirect("/");
    blog.save()
    .then((result) => {
        res.redirect("/blogs")
    })
    .catch((err) => {
        console.log(err)
    })
});
app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid blog ID' });
    }

    Blog.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                // Blog with the given ID was not found
                return res.status(404).json({ error: 'Blog not found' });
            }

            // Successful deletion, respond with a redirect
            res.json({ redirect: "/blogs" });
        })
        .catch(err => {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});



// app.delete("/blogs/:id", (req,res) => {
//     const id = req.params.id;
//     Blog.findByIdAndDelete(id)
//     .then(result => {
//         res.json({redirect: "/blogs"})
//     })
//     .catch(err => console.log(err))
// }) 🎁UNCOMMENT THIS IF ALL ELSE FAILS🎁

app.get("/blogs/create", (req, res) => {
    res.render('create');
});
app.get("/blogs/:id", (req,res) => {
    const id = req.params.id
    Blog.findById(id)
    .then((result) =>{
        res.render("details", {blog: result, title: "Blog Details"})
    })
    .catch((err) => console.log(err))
    // res.render("details")
})

// Sample route to demonstrate a simple response
app.get("/blogs", (req, res) => {
    Blog.find()
    .then((result) => {
        res.render("allBlogs", {h1: "All Blogs", blogs:result})
    })
    .catch((err) => {
        console.log(err)
    })
   
});

// Route to render a page displaying all blogs
// app.get("/allBlogs", (req, res) => {

//     res.render("index", {h1: "All Blogs"});
// });

// Route to render the form for creating a new blog


// Generic 404 route
app.use((req, res) => {
    res.render('404');
});
