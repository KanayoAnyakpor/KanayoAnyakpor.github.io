
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSquare from '../ImageSquare';

export default function PostPage() 
{
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        
        fetch(`http://localhost:5000/post/${id}`)
        .then(response => {response.json().then(postInfo => {
            setPostInfo(postInfo);
            });
    });
    }, []);

    if (!postInfo) return '';
    return(

        <div className="postPage">
            <ImageSquare imageUrl={`http://localhost:5000/${postInfo.cover.replace(/\\/g, '/')}`} />
            <h1>{postInfo.title}</h1>
            
            <div className="postPage-author">By {postInfo.author.username}</div>
            <time>{postInfo.createdAt}</time>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    );
}