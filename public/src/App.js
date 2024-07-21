import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import SharedLayout from "./pages/SharedLayout";
import BlogCreate from "./components/BlogCreate";
import SingleBlog from "./pages/SingleBlog";
import UpdateBlog from "./pages/UpdateBlog";

function App()
{
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/" element={<SharedLayout/>}>
					<Route index element={<Blog/>}/>
					<Route path="/create" element={<BlogCreate/>}/>
					<Route path="/details/:blogId" element={<SingleBlog/>}/>
					<Route path="/update/:blogId" element={<UpdateBlog/>}/>
				</Route>
					
			</Routes>
		</BrowserRouter>
	);
}

export default App;
