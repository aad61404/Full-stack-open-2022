import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import "./app.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      setErrorMessage({ text: `Weclome ${user.name}`, type: "success" });
    } catch (exception) {
      setErrorMessage({ text: `wrong username or password`, type: "error" });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    setUser(null);
    window.localStorage.removeItem("user");
  };

  const handleBlogForm = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      setErrorMessage({ text: `a new blog ${blog.title}`, type: "success" });
      blogRef.current.toggleVisibility();
    } catch (exception) {
      setErrorMessage({ text: `wrong data`, type: "error" });
      console.log("exception", exception);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <p>{user.name} logged in</p>

          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogRef}>
            <BlogForm handleBlogForm={handleBlogForm} />
          </Togglable>
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
