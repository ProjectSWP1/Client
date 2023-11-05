import { Button, Container, Grid, TextField, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import './PostNews.css'
import { defaultTheme } from '../../Theme/Theme'

export default function PostNews() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.background.default
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginTop: '100px'
      }}>
        <div className='staff-news-container'>
          <Typography style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '400' }}>Create News</Typography>
          <div className='staff-news-header'>
            <div className='staff-news-header-left'>
              <img src="https://i.pinimg.com/736x/f0/f6/30/f0f63081e758c96e4051a865fb2293b8.jpg" />
            </div>
            <div className='staff-news-header-right'>
              <Typography style={{ fontSize: '0.6cm' }}>Mót</Typography>
            </div>
          </div>

          <div className='news-body'>
            <form className='news-form'>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="TextInput-38"
                  label="Your Content"
                  name="content"
                  value=""
                  style={{ marginBottom: '35px' }}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="TextInput-39"
                  label="Your Description"
                  name="description"
                  value=""
                  style={{ marginBottom: '35px' }}
                  multiline
                  rows={6}
                />
              </Grid>
            </form>
            <div className='staff-news-footer'>
              <Button className='staff-news-footer-btn'>Post</Button>
              <Button className='staff-news-footer-btn'>Cancel</Button>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  )
}
