import {useRef,useState, useEffect } from "react";
import Theme from "../UI/Theme";

const CallContainer = ({callInfo})=>{
  const [clickCount,setClickCount] = useState(0);
  const vidRef = useRef(null);
  
  const [windowSize,setWindowSize] = useState({
    width:500,
    height:500
  })
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setClickCount(0);
    },1000);
    if(clickCount===2){
      console.log(vidRef.current.className);
      const theme = Theme(vidRef.current.className);
      console.log(theme.style);
      vidRef.current.style.height = theme.style.height;
      vidRef.current.style.width = theme.style.width;
      vidRef.current.className = theme.className;
    }
    return ()=>{
      clearTimeout(timeout);
    }
  },[clickCount])

  const vidClickHandler = ()=>{
    setClickCount((c)=>c+1);
  }

  useEffect(()=>{
    const handleSuccess = (stream) =>{
      const localVideo = document.getElementById('localVideo');
      if(localVideo){
        localVideo.srcObject = stream;
      }
    }
    const handleError = (err)=>{
      console.error('Error accessing user media:',err);
    }

    navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })
    .then(handleSuccess)
    .catch(handleError)

    return ()=>{
      const localVideo = document.getElementById('localVideo');
      if(localVideo && localVideo.srcObject){
        const tracks = localVideo.srcObject.getTracks();
        tracks.forEach(track=>track.stop());
      }
    }
  },[]);

  return (
    
    (callInfo.onCall)?
      <div id="video-container" onClick={vidClickHandler} ref={vidRef} className="video-box-m">
      <video id='localVideo' autoPlay muted playsInline></video>
      <video id='remoteVideo' autoPlay playsInline></video>
    </div>
    :''
  )
}

export default CallContainer;


            