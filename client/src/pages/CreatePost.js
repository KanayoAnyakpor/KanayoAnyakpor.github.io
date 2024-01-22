import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
];

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [redirect, setRedirect] = useState(false);
  
    async function createNewPost(ev) {
      ev.preventDefault();
  
      const data = new FormData();
  
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
  
      // Append each file to the FormData
      for (let i = 0; i < files.length; i++) {
        data.append('file', files[i]);
      }
  
      const response = await fetch('http://localhost:5000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      
      console.log(response);
      if (response.ok) {
        alert('Post created!');
        setRedirect(true);
      } else {
        alert('Post failed!');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
  
    if (redirect) {
      return <Navigate to="/" />;
    }
  
    return (
      <form className="newPost" onSubmit={createNewPost}>
        <h1>Create New Post</h1>
        <input type="title" placeholder={"Title"} value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <input type="summary" placeholder={"Summary"} value={summary} onChange={(ev) => setSummary(ev.target.value)} />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} multiple />
        <ReactQuill value={content} onChange={(newValue) => setContent(newValue)} module={modules} formats={formats} />
        <button style={{ marginTop: '5px' }}>Create Post</button>
      </form>
    );
  }
  