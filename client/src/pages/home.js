import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
function Home() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <div className="container-bg d-xl-flex p-3 flex-wrap justify-content-between">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`}>
            <div
              class="card text-bg-light m-2 p-5"
              style={{ maxWidth: "18rem", textDecoration: "none" }}
            >
              <div class="card-body">
                <h3 style={{ textDecoration: "none" }} class="card-title">
                  {blog.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div class="position-fixed  bottom-0 end-0">
        <Link to={"/addBlog"}>
          <button className="btn btn-primary m-3 p-3 px-4">
            <FaPlus />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
