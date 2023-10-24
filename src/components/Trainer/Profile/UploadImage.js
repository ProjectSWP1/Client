import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
const IMAGE_FILE_MAXIMUM_SIZE = 10 * 1024 * 1024;

const UploadImage = ({employeeId}) => {
    const [isLoadingThumbnail, setLoadingThumbnail] = useState(false);
    const [thumbnailBase64Url, setthumbnailBase64Url] = useState(undefined);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    const inputThumbnailRef = useRef(null);

    const handleDragOver = (event) => {
        // Prevent default behaviour of drop event : Open new window for displaying image
        event.preventDefault();
    };

    const updateThumbnail = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setLoadingThumbnail(true);

        reader.addEventListener('load', () => {
            const formData = new FormData();

            formData.append('qualificationFile', file);
            fetch(`http://localhost:8080/trainer/${employeeId}/upload-qualification`, {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + token,
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("UPLOAD QUALIFICATION FAIL");
                    }
                    setLoadingThumbnail(false);
                    setthumbnailBase64Url(reader.result?.toString());
                })
                .catch((error) => {
                    setLoadingThumbnail(false);
                    Swal.fire({
                        title: 'Fail!',
                        text: `${error.message}`, // Use error.message to display the error message
                        icon: 'error',
                    });
                });
        });
    };

    const isValidFile = (files) => {
        let isValid = true;
        const error = "FILE SIZE IS TOO LARGE";
        if (files[0] && files[0].size > IMAGE_FILE_MAXIMUM_SIZE) {
            Swal.fire({
                title: 'Fail!',
                typTypography: `${error}`,
                icon: 'error',
            });
            isValid = false;
        }
        return isValid;
    };

    const handleDrop = (event) => {
        // Prevent default behaviour of drop event : Open new window for displaying image
        event.preventDefault();
        const files = event?.dataTransfer?.files;
        if (files && isValidFile(files) && inputThumbnailRef.current) {
            inputThumbnailRef.current.files = files;
            updateThumbnail(files[0]);
        }
    };

    const handleChangeFile = (event) => {
        const { files } = event.currentTarget;
        if (files && isValidFile(files)) {
            updateThumbnail(files[0]);
        }
    };

    const handleDeleteQualification = () => {
        setLoadingThumbnail(true);
        fetch(`http://localhost:8080/trainer/${employeeId}/delete-qualification`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete qualification');
            }
            return response.text();
        }).then(message => {
            setthumbnailBase64Url(undefined);
            Swal.fire({
                title: 'Success!',
                text: `${message}`,
                icon: 'success',
            });
        }).catch(error => {
            console.error(error.message);
        }).finally(() => {
            setLoadingThumbnail(false);
        });
    }

    useEffect(() => {
        setLoadingThumbnail(true);
        fetch(`http://localhost:8080/trainer/${employeeId}/qualification-image`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch qualification');
            }
            return response.arrayBuffer();
        }).then(data => {
            const blob = new Blob([data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            setthumbnailBase64Url(imageUrl);
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            setLoadingThumbnail(false);
        });
    }, [employeeId]);

    return (
        <Box
            pt={1}
            mb={5}
            bgcolor={grey}
            borderRadius={4}
            id="thumbnail"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggable={true}
        >
            <Box
                px={4}
                mt={2}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                borderBottom={`1px solid ${grey}`}
            >
                <Typography
                    fontSize={14}
                    fontWeight={600}
                    color={grey}
                >
                    Qualification
                </Typography>
            </Box>
            <Box px={4} mt={2} pb={2}>
                {!thumbnailBase64Url || isLoadingThumbnail ? (
                    <React.Fragment>
                        <Box
                            color={grey}
                            mb={2.5}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            position="relative"
                        >
                            {isLoadingThumbnail ? (
                                <Box
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    borderRadius="6px"
                                    sx={{
                                        backgroundColor: 'rgba(134, 140, 150 , 0.5)'
                                    }}
                                >
                                    <CircularProgress sx={{margin : 'auto'}} />
                                </Box>
                            ) : (
                                ''
                            )}
                            <img style={{
                                width: '80%',
                            }} src='https://tse4.mm.bing.net/th?id=OIP.djrHhPrOVynppSdGJ2dtPgHaHa&pid=Api&P=0&h=220'
                            />
                            <Typography
                                fontSize={14}
                                fontWeight={600}
                                color={grey}
                            >
                                Kéo và thả file vào đây để
                            </Typography>
                            <Typography
                                fontSize={14}
                                fontWeight={600}
                                color={grey}
                            >
                                upload qualification
                            </Typography>
                            <Typography color={grey}>hoặc</Typography>
                        </Box>
                    </React.Fragment>
                ) : (
                    <Typography>
                        <img
                            style={{
                                width: '100%',
                                height: '60vh',
                                objectFit: 'cover',
                                borderRadius: '6px'
                            }}
                            src={thumbnailBase64Url}
                            alt="post thumbnail"
                        />{' '}
                    </Typography>
                )}
                {thumbnailBase64Url ?
                    <React.Fragment>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ my: 1 }}
                            onClick={() => {
                                inputThumbnailRef?.current?.click();
                            }}
                        >
                            Change your qualification
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ my: 1, marginLeft: 1 }}
                            onClick={handleDeleteQualification}
                        >
                            Delete qualification
                        </Button>
                    </React.Fragment> : ''}
                {!thumbnailBase64Url ?
                    <Button
                        color="primary"
                        fullWidth
                        variant="contained"
                        sx={{ my: 1 }}
                        onClick={() => {
                            inputThumbnailRef?.current?.click();
                        }}
                    >
                        Choose your qualification
                    </Button> : ''}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={inputThumbnailRef}
                    onChange={handleChangeFile}
                />
            </Box>
        </Box>
    );
};

export default UploadImage;
