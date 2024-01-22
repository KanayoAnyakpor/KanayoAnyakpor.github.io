import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    document.title = "League Through Kanayo's Lens";
    fetch('http://localhost:5000/profile', {
      credentials: 'include',
    }).then(async (response) => {
      const data = await response.json();
      setUserInfo(data);
    });
  }, []);

  function logout() {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        alert('Logout failed!');
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert('Logout successful!');
        setUserInfo(null);
      }
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">League Through Kanayo's Lens</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {username && (
          <a href="/">{username}</a>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
