import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/user/get-newest-news',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(!response.ok){
          return response.text().then((message) => {
            throw new Error(message);
        })}
        return response.json()
      })
      .then((data) => {
        setNews(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>NEWS</h1>
      {isLoading ? (
        <CircularProgress />
      ) : news.length === 0 ? (
        <p>Currently we don't have any news about zoo</p>
      ) : (
        <ul>
          {news.map((item) => (
            <li key={item.newsId}>
              <h2>{item.content}</h2>
              <p>{item.description}</p>
              <p>Date created: {item.dateCreated}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
