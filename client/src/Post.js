import React from 'react';
import { formatISO9075 } from 'date-fns';
import ImageSquare from './ImageSquare';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  // Check if createdAt is a valid date
  console.log("Client title:", title);

  // Replace backslashes with forward slashes in the cover variable
  const coverUrl = `http://localhost:5000/${cover.replace(/\\/g, '/')}`;

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
        <ImageSquare imageUrl={coverUrl} />
        </Link> 
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

