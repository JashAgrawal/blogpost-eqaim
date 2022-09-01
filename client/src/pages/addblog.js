import { useState, useRef } from "react";
import axios from "axios";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaLink,
  FaHome,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Addblog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  let navigate = useNavigate();
  const tagss = {
    bold: "*b*",
    italic: "*i*",
    underline: "*u*",
    Strikethrough: "*s*",
  };
  const handlebuttons = (e, tag) => {
    const closing = tag.replace("*", "*/");
    e.preventDefault();
    let data = content;
    const selectionTxt = window.getSelection().toString();
    if (selectionTxt !== "") {
      data = data.replace(selectionTxt, tag + selectionTxt + closing);
    } else {
      data = data + tag + "write here" + closing;
      console.log(data);
    }
    setContent(data);
    document.getElementById("blog").focus();
    document.getElementById("blog").scrollIntoView();
  };
  const addImage = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = null;
    let formData = new FormData();

    formData.append("file", fileObj);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://localhost:8080/api/uploadImage", formData, config)
      .then((response) => {
        setContent(
          content + "\n" + "*img*" + response.data.url + "*/img*" + "\n"
        );
      })
      .catch((error) => {
        alert("something went wrong adding image");
        console.log(error);
      });
    document.getElementById("blog").focus();
    document.getElementById("blog").scrollIntoView();
  };
  const handleClick = () => {
    if (title == "" || content == "") {
      alert("title and content needed");
      return;
    }
    axios
      .post("http://localhost:8080/api/addBlog", { title, content })
      .then((res) => {
        console.log(res);
        alert("success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Link to="/">
        <div class="position-fixed bottom-50 start-0">
          <button className="btn btn-primary p-4 m-3 py-3">
            <FaHome />
          </button>
        </div>
      </Link>

      <div class="position-fixed top-50  start-0">
        <button onClick={handleClick} className="btn btn-primary p-4 m-3 py-3">
          <FaEnvelopeOpenText />
        </button>
      </div>
      <div>
        <button
          class="btn btn-light m-1"
          onClick={(e) => handlebuttons(e, tagss.bold)}
        >
          <FaBold />
        </button>
        <button
          class="btn btn-light m-1"
          onClick={(e) => handlebuttons(e, tagss.italic)}
        >
          <FaItalic />
        </button>
        <button
          class="btn btn-light m-1"
          onClick={(e) => handlebuttons(e, tagss.underline)}
        >
          <FaUnderline />
        </button>
        <button
          class="btn btn-light m-1"
          onClick={(e) => handlebuttons(e, tagss.Strikethrough)}
        >
          <FaStrikethrough />
        </button>
        <button class="btn btn-light m-1" onClick={(e) => addImage()}>
          <FaLink />
        </button>
      </div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <div className="m-2">
        <div class="input-group my-2 m-auto w-50 input-group-lg">
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ height: "70vh" }} class="w-75 m-auto">
          <textarea
            style={{ resize: "none", overflow: "auto" }}
            id="blog"
            class="border w-100 h-100 rounded"
            // contentEditable={true}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Addblog;
