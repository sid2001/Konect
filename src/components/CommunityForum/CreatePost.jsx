import { useState, useRef, useContext } from 'react';
import { UserContext } from '../Context/userContext.js';
import styled,{keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import { FiUser, FiX } from 'react-icons/fi';
import { createPost } from '../../utils/forum.js';
import { Store as store } from 'react-notifications-component';

const slideInFromRight = keyframes`
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  // animation: 0.1s ease 0s ${slideInFromRight};
`;

const FormContainer = styled.div`
  background-color: rgb(26, 26, 26);
  color: #d7dadc;
  padding: 20px;
  border: 1px solid #2a2a2b;
  position: relative;
  width: 70%;
  border-radius: 20px;
  animation: 0.08s ease 0s ${slideInFromRight};
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px; 
`;

const UserIcon = styled(FiUser)`
  font-size: 24px;
  color: #d7dadc;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  position: absolute;
  right: 45%;
  text-wrap: wrap;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  align-items: center;
`;

const FormInput = styled.textarea`
  background-color: #1a1a1b;
  color: #d7dadc;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 4px;
  padding: 8px;
  resize: none;
  font-family: inherit;
  margin-bottom: 16px;
  width: 100%;
  &:focus {
    outline: 1px solid #d7dadc;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 8px;
  border: 1px solid rgb(77, 77, 77);
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 5px;
`;

const RemoveImageButton = styled.button`
  position: relative;
  top: -8px;
  right: -8px;
  background-color: #1a1a1b;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddImageIcon = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: #1a1a1b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: transparent;
  color: rgb(235, 235, 235);
  border: none;
  font-size: 15px;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-behavior: ease-in-out;
  border-radius: 20px;
  padding: 10px 15px;
  transition-timing-function: linear;
  
  &:hover {
    color: rgb(65, 130, 227);
    background-color: rgba(63, 62, 62, 0.458);
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: rgb(235, 235, 235);
  border: none;
  font-size: 15px;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-behavior: ease-in-out;
  border-radius: 20px;
  padding: 10px 15px;
  transition-timing-function: linear;
  &:hover {
    color: rgb(233, 92, 118);
    background-color: rgba(63, 62, 62, 0.458);
  }
`;

const CreatePostForm = ({setCreatePost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null); 
  const {user} = useContext(UserContext);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUpload = () => {
    const files = Array.from(fileInputRef.current.files);
    // Create a new array to store the image files
  const imageData = [];

  // Iterate over each file
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Add the image data to the array
      imageData.push(event.target.result);
      // If all files have been processed, set the state with the new array of image data
      if (imageData.length === files.length) {
        setImages([...images, ...imageData]);
      }
    };
    console.log('file: ',file);
    // Read the file as a data URL (base64-encoded string)
    reader.readAsDataURL(file);
  });


  // Clear the file input after processing
  fileInputRef.current.value = '';
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      images,
    };
    console.log(postData);
    createPost(postData)
    .then(res=>{
      if(res.status===202){ 
        store.addNotification({
          title: "Success!",
          message: "Post created successfully!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        })
      }else{
        throw new Error('Post not created!');
      }
      setTitle('');
      setDescription('');
      setImages([]); 
      setCreatePost(false);
    }).catch(err=>{
      console.log(err);
      store.addNotification({
          title: "Error",
          message: "Post not created!",
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        })
    })
    // Close the form
  };

  const handleCancel = () => {
    setCreatePost(false); // Close the form
  };

  return (
    <Overlay>
      <FormContainer>
        <FormHeader>
          <UserIcon />
          <FormTitle>Create a post</FormTitle>
          <div>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <SubmitButton onClick={handleSubmit}>Post</SubmitButton>
          </div>
        </FormHeader>
        <FormBody>
          <FormInput
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          <FormInput
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            rows={15}
          />
          <ImageContainer>
            {images.map((imageUrl, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <ImagePreview src={imageUrl} />
                <RemoveImageButton onClick={() => handleRemoveImage(index)}>
                  <FiX size={16} color="#d7dadc" />
                </RemoveImageButton>
              </div>
            ))}
            <AddImageIcon htmlFor="image-upload">+</AddImageIcon>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              ref={fileInputRef}
              multiple
            />
          </ImageContainer>
        </FormBody>
      </FormContainer>
    </Overlay>
  );
};

CreatePostForm.propTypes ={
  setCreatePost: PropTypes.func
}

export default CreatePostForm;
