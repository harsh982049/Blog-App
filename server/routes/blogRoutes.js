const express = require('express');
const {createBlog, getAllBlogs, getSingleBlog, updateBlog ,deleteBlog, deleteComment} = require('../controllers/blogController');
const router = express.Router();

router.post('/create', createBlog);
router.get('/getAllBlogs', getAllBlogs);
router.get('/getSingleBlog/:id', getSingleBlog);
router.delete('/deleteBlog/:id', deleteBlog);
router.patch('/updateBlog/:id', updateBlog);
router.delete('/deleteComment/:blogId/comments/:commentId', deleteComment);

module.exports = router;