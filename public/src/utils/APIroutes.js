const host = "http://localhost:5000";

export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const createBlogRoute = `${host}/api/blog/create`;
export const getAllBlogsRoute = `${host}/api/blog/getAllBlogs`;
export const getSingleBlogRoute = `${host}/api/blog/getSingleBlog`;
export const deleteBlogRoute = `${host}/api/blog/deleteBlog`;
export const updateBlogRoute = `${host}/api/blog/updateBlog`;
export const deleteCommentRoute = `${host}/api/blog/deleteComment`;