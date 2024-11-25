import React, { useState, useRef } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import './Upload.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import uploadAnimationData from '../assets/upload-animation.json';
import axios from 'axios';
import getCookie from '../utils/GetCoockie';
import decodeJwt from '../utils/DecodeJwt';

function Upload() {
    const jwt = getCookie('jwt');
    const userToken = jwt ? decodeJwt(jwt) : null;
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [descText, setDescText] = useState("");
    const [uploadError, setUploadError] = useState(null);

    const handleUploadClick = async () => {
        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('UserId', userToken.userId);
            formData.append('text', descText);
            formData.append('post_date', new Date().toISOString());
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:8000/onlycats/posts/create_post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (response.status !== 201) {
                setUploadError(true);
                throw new Error(`Error uploading file: ${response.status}`);
            }

            // Handle successful upload (e.g., clear form, display success message)
            //console.log('Upload successful!');
            setDescText('');
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadError(error.message);
        } finally {
            setSelectedFile(null);
            setImagePreview(null);
            setIsUploading(false); // Ensure loading state is reset
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
            setIsUploading(true);
        } else {
            setIsUploading(false);
            setImagePreview(null);
        }
    };

    const handleDescriptionText = (event) => {
        setDescText(event.target.value);
    };

    return (
        <div className='upload-container'>
            <h1>Upload a File</h1>
            <input type="file" id="fileInput" ref={fileInputRef} onChange={handleFileChange} />
            <br />
            <textarea id="commentInput" onChange={handleDescriptionText} />
            <br />
            <button onClick={handleUploadClick}>
                {isUploading ? (
                    <DotLottieReact
                        autoplay={true}
                        data={uploadAnimationData}
                        speed={1}
                        loop={false}
                        style={{ width: '20px', height: '20px', down: '2px', scale: '2' }}
                    />
                ) : (
                    <PublishIcon />
                )}
            </button>
            <div className='image-preview'>
                {imagePreview && (
                    <img src={imagePreview} alt="Image Preview" style={{ aspectRatio: '1/1' }} />
                )}
                <h3>{descText}</h3>
            </div>
        </div>
    );
}

export default Upload;