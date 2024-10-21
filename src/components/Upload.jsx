import React, { useState, useRef, useEffect } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import './Upload.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import uploadAnimationData from '../assets/upload-animation.json';
import axios from 'axios';

function Upload() {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [descText, setDescText] = useState("");
    const [uploadError, setUploadError] = useState(null);

    const handleUploadClick = async () => {
        setIsUploading(true);
        setUploadError(null);
        //fileInputRef.current.click();

        try{
            const formData = await axios.post('http://localhost:8000/posts', {
                id: 10,
                owner_id: 1,
                image_url: "",//fileInputRef.current.files[0], // cambiar esto una vez tenga el store de imágenes
                text: descText,
                post_date: new Date().now,
                likes: 0 
            },{
                headers: {
                    'Content-Type': 'multipart/json'
                }
            });
            const imageData = await axios.postForm('http://localhost:8000/images', {
                post_id: 10,
                image: /*new Blob*/(fileInputRef) //fs.createReadStream('/foo/bar.jpg') axios docs
            },{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(formData.request);
            if (formData.request.status != 201 && imageData.request.status != 201) {
                throw new Error(`Error uploading file: ${formData.request.status}`);
             }
    
            // Handle successful upload (e.g., clear form, display success message)
            console.log('Upload successful!');
            setIsUploading(false);
            setImagePreview(null);
            setDescText('');
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadError(error.message);
        } finally {
            setIsUploading(false); // Ensure loading state is reset
        }
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

      const hadnleDescriptionText = (event) => {
        setDescText(event.target.value);
      }


    return (
        <div className='upload-container'>
            <h1>Upload a File</h1>
                <input type="file" id="fileInput" 
                ref={fileInputRef} onChange={handleFileChange} />
                <br />
                <textarea id="commentInput" onChange={hadnleDescriptionText}/>
                <br />
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
                <h3>{descText}</h3>
            </div>
        </div>
    );
}

export default Upload;
