const Blog = require('../model/blogModel');

const createBlog = async (req, res, next) => {
    try
    {
        const userBlog = req.body;
        const blog = await Blog.create(userBlog);
        if(!blog)
        {
            return res.json({status: false, msg: 'Could not create blog in the database. Please try again'});
        }
        // console.log(blog);
        return res.json({status: true, blog});
    }
    catch(error)
    {
        next(error);
    }
};

const getSingleBlog = async (req, res, next) => {
    try
    {
        const {id: blogId} = req.params;
        // console.log(blogId);
        const blog = await Blog.findById({_id: blogId});
        if(!blog)
        {
            return res.json({status: false, msg: 'Could not fetch blog from the database. Please try again'});
        }
        // console.log(blog);
        return res.json({status: true, blog});
    }
    catch(error)
    {
        next(error);
    }
};

const getAllBlogs = async (req, res, next) => {
    try
    {
        const {category} = req.query;
        let blogs;
        if(!category)
        {
            blogs = await Blog.find({});
        }
        else
        {
            blogs = await Blog.find({category});
        }
        if(!blogs)
        {
            return res.json({status: false, msg: 'Could not fetch blogs from the database. Please try again'});
        }
        // console.log(blog);
        return res.json({status: true, blogs});
    }
    catch(error)
    {
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try
    {
        // const oldBlog = req.body;
        // console.log(blogId);
        // console.log(req.body);
        // console.log(oldBlog);
        const {id: blogId} = req.params;
        const {title, category, author, content, imageUrl, comments} = req.body;
        // const comments = req.body;

        let updatedBlog;
        if(comments)
        {
            // console.log(comments);
            updatedBlog = await Blog.findOneAndUpdate({_id: blogId}, {comments}, {new: true});
        }
        else
        {
            updatedBlog = await Blog.findOneAndUpdate({_id: blogId}, {title, category, author, content, imageUrl},{new: true});
        }
        // const updatedBlog = await Blog.findOneAndUpdate({_id: blogId}, {title, category, author, content, imageUrl},{new: true});

        if(!updatedBlog)
        {
            return res.json({status: false, msg: 'Could not update blog in the database. Please try again' });
        }
        return res.json({status: true, blog: updatedBlog});
    }
    catch(error)
    {
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try
    {
        const {id: blogId} = req.params;
        // console.log(blogId);
        const blog = await Blog.findByIdAndDelete({_id: blogId});
        if(!blog)
        {
            return res.json({status: false, msg: 'Could not delete blog from the database. Please try again'});
        }
        // console.log(blog);
        return res.json({status: true, blog});
    }
    catch(error)
    {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try
    {
        // console.log(req.params);
        const {blogId, commentId} = req.params;
        // console.log(blogId, commentId);
        const blog = await Blog.findOneAndUpdate({_id: blogId}, {$pull: {comments: {_id: commentId}}}, {new: true});
        if(!blog)
        {
            return res.json({status: false, msg: 'Could not delete comment from the database. Please try again' });
        }
        res.json({status: true, blog});
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog, deleteComment};