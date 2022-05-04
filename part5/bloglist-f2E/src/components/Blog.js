import React, { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        <p className="title">
          {blog.title} <button onClick={toggleVisibility}>view</button>
        </p>
        <p className="author">{blog.author}</p>
      </div>
      {visible && (
        <div className="extra-info">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLike}>like</button>
          </p>
          <p>{blog.author}</p>
          <button
            className="remove"
            style={{
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleRemove}
          >
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
