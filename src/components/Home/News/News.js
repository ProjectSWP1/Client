import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './News.css';
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

export default function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/user/get-newest-news', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message);
          })
        }
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
    <div style={{textAlign: 'center'}}>
      <h1 className='news-title'>NEWS</h1>
      {isLoading ? (
        <CircularProgress />
      ) : news.length === 0 ? (
        <p>Currently we don't have any news about zoo</p>
      ) : (
        
        <Container className='news-container'>
          {news.map(item => (
            <div key={item.newsId} className='news-all-cards'>
              <Card sx={{ height: 'auto', width: '70%', mb: '10px' }} className='news-card'>
                <CardMedia
                  component="img"
                  height="100%"
                  image={'assets/images/wildlife1.jpg'}
                  className='news-image'
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className='news-content'>
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
              <div className='news-overlay'>
                <Typography gutterBottom variant="h5" component="div" className='text-news'>
                  {item.description}
                </Typography>
              </div>
            </div>
          ))}
        </Container>
      )}
    </div>
  );
}
