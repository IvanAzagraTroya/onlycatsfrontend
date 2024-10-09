import React, { useState, useRef } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import './Upload.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import uploadAnimationData from '../assets/upload-animation.json';

function Upload() {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
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


    return (
        <div className='upload-container'>
            <h1>Upload a File</h1>
            <input type="file" id="fileInput" 
            ref={fileInputRef} onChange={handleFileChange} />
            <button onClick={handleUploadClick}>
                {isUploading ? (
                    <DotLottieReact
                        autoplay={true}
                        data={uploadAnimationData}
                        speed={1}
                        loop={false}
                        style={{ width: '20px', height: '20px', down:'2px', scale:'2' }}
                    />
                ):(<PublishIcon/>)}
                
            </button>
            <div className='image-preview'>
                {imagePreview && (
                <img src={imagePreview} alt="Image Preview" style={{ aspectRatio: '1/1' }} />
                )}
            </div>
        </div>
    );
}

export default Upload;
