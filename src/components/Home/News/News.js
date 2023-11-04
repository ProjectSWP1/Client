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
        // <ul>
        //   {news.map((item) => (
        //     <li key={item.newsId}>
        //       <h2>{item.content}</h2>
        //       <p>{item.description}</p>
        //       <p>Date created: {item.dateCreated}</p>
        //     </li>
        //   ))}
        // </ul>

        /*<Grid container spacing={0} justifyContent="center" sx={{mt: '100px', mb: '100px'}}>
          {news.map(item => (
            <Grid key={item.newsId} container justifyContent="center" xs={4} className='news-container'>
              <Card sx={{ height: 'auto', width: '70%', mb: '10px' }} className='news-card'>
                <CardMedia
                  component="img"
                  height="100%"
                  image={'assets/images/wildlife1.jpg'}
                  className='news-image'
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
              <div className='news-overlay'>
                <Typography gutterBottom variant="h5" component="div" className='text-news'>
                  {item.description}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>*/

        <Container className='news-container'>
          {news.map(item => (
            <div className='news-all-cards'>
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
