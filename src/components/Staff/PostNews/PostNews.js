import { Avatar, Button, Container, Grid, Paper, TableContainer, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './PostNews.css'
import { defaultTheme } from '../../Theme/Theme'
import { URL_FETCH_AZURE_SERVER } from '../../../config'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { deepOrange } from '@mui/material/colors'

export default function PostNews() {
  const [listNews, setListNews] = useState([])
  const [employee, setEmployee] = useState(null)
  const [changed, setChanged] = useState(false)
  const [open, setOpen] = useState(false)

  const [newsId, setNewsId] = useState("")
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [createDate, setCreateDate] = useState("")
  const UPDATE_TITLE = "Update news"
  const POST_TITLE = "Create news"
  const [title, setTitle] = useState(POST_TITLE)

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  const email = !token ? null : JSON.parse(atob(token.split('.')[1])).email;

  useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}user/getnews`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    }).then(response => response.json())
      .then(data => {
        const sortedNews = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        setListNews(sortedNews);
        console.log(data);
      })
      .catch(error => console.log(error))

    fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-employee-by/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    }).then(response => response.json())
      .then(data => {
        setEmployee(data)
      })
      .catch(error => console.log(error))
  }, [changed])

  const handlePostNews = () => {
    setOpen(true)
    setTitle(POST_TITLE)
    setChanged(false)
    setContent("")
    setDescription("")
  }

  const handleUpdateNews = (news) => {
    setOpen(true)
    setChanged(false)
    setTitle(UPDATE_TITLE)
    setContent(news.content)
    setDescription(news.description)
    setNewsId(news.newsId)
    setCreateDate(news.dateCreated)
  }

  const handleDeleteNews = (newsId) => {
    const newsDto = {
      newsId: newsId
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#DDDDDD",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL_FETCH_AZURE_SERVER}staff/deletenews`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(newsDto)
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((message) => {
                throw new Error(message);
              });
            }
            Swal.fire({
              title: "Success!",
              text: `Delete Successfully`,
              icon: "success",
            });
            setListNews(
              listNews.filter((news) => {
                return news.newsId != newsId;
              })
            );
          })
          .catch((error) => {
            Swal.fire({
              title: "Fail!",
              text: `${error.message}`,
              icon: "error",
            });
          });
      }
    });
  }

  const handleUpdateNewsButton = () => {
    const newsDto = {
      newsId: newsId,
      empId: employee.empId,
      dateCreated: createDate,
      content: content,
      description: description
    }
    fetch(`${URL_FETCH_AZURE_SERVER}staff/editnews`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(newsDto)
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text();
    }).then(data => {
      setOpen(false);
      setChanged(true)
      Swal.fire({
        title: 'Success!',
        text: `${data}`,
        icon: 'success',
      });
    }).catch(error => {
      setOpen(false);
      Swal.fire({
        title: 'Fail!',
        text: `${error}`,
        icon: 'error',
      });
    });
  }

  const handlePostButton = () => {
    const newsDto = {
      empId: employee.empId,
      content: content,
      description: description
    }
    console.log(newsDto);
    fetch(`${URL_FETCH_AZURE_SERVER}staff/postnews`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(newsDto)
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text();
    }).then(data => {
      setOpen(false);
      setChanged(true)
      Swal.fire({
        title: 'Success!',
        text: `${data}`,
        icon: 'success',
      });
    }).catch(error => {
      setOpen(false);
      Swal.fire({
        title: 'Fail!',
        text: `${error}`,
        icon: 'error',
      });
    });
  }

  const handleCancelButton = () => {
    setOpen(false)
  }

  const columns = [
    {
      id: 1,
      name: 'Credit',
      selector: (news) => {
        return (
          <p>{news.employeesNews.name}</p>
        )
      }
    },
    {
      id: 2,
      name: 'Content',
      selector: (news) => {
        return (
          <p>{news.content}</p>
        )
      }
    },
    {
      id: 3,
      name: 'Date Created',
      selector: (news) => {
        return (
          <p>{news.dateCreated}</p>
        )
      }
    },
    {
      id: 4,
      name: 'Actions',
      selector: (news) => {
        return (
          <div>
            <Button variant='contained' size='small' sx={{ mr: '10px' }} onClick={() => handleDeleteNews(news.newsId)}>Remove</Button>
            <Button variant='contained' size='small' sx={{ mr: '10px' }} onClick={() => handleUpdateNews(news)}>Update</Button>
          </div>
        )
      }
    }
  ]

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
        {open ? <div className='staff-news-container'>
          <Typography style={{ marginBottom: '20px', fontSize: '40px', fontWeight: 'bolder', color:'green'}}>{title}</Typography>
          <div className='staff-news-header'>
            {/* <div className='staff-news-header-left'>
              <img src="https://i.pinimg.com/736x/f0/f6/30/f0f63081e758c96e4051a865fb2293b8.jpg" />
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{employee.email.email.charAt(0)}{" "}</Avatar>
            </div> */}
            <div className='staff-news-header-right'>
              <Typography style={{ fontSize: '20px' }}><i>Credit:</i> {email}</Typography>
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
                  value={content}
                  style={{ marginBottom: '35px' }}
                  multiline
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="TextInput-39"
                  label="Your Description"
                  name="description"
                  value={description}
                  style={{ marginBottom: '35px' }}
                  multiline
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
              </Grid>
            </form>
            <div className='staff-news-footer'>
              {title === POST_TITLE ? <Button className='staff-news-footer-btn' onClick={handlePostButton}>Post</Button> :
                <Button className='staff-news-footer-btn' onClick={handleUpdateNewsButton}>Update</Button>}
              <Button className='staff-news-footer-btn' onClick={handleCancelButton}>Cancel</Button>
            </div>
          </div>
        </div> : <TableContainer component={Paper} sx={{ mt: '100px' }}>
          <DataTable
            columns={columns}
            data={listNews.map(item => ({
              ...item,
            }))}
            title="News"
            pagination
            keyField='email'
            paginationPerPage={5} // Number of rows per page
            paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
          />
          <Button variant='text' fullWidth onClick={handlePostNews}>Post news</Button>
        </TableContainer>}
      </Container>
    </ThemeProvider>
  )
}
