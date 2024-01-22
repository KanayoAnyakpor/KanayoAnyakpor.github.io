import Post from "../Post";
import { useEffect, useState } from 'react';
import Landing from "../Landing";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/post')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <>
      <Landing />
      <div className="PostContent">
        {posts.length > 0 &&
          posts.map(post => (
            <Post key={post._id} {...post} />
          ))}
      </div>
    </>
  );
}
