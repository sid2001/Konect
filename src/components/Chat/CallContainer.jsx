import {useRef,useState, useEffect } from "react";
import Theme from "../UI/Theme";
import cross from "/src/assets/cross.png"

const CallContainer = ({callInfo,setCallInfo})=>{
  const [clickCount,setClickCount] = useState(0);
  const [mode,setMode] = useState(import.meta.env.VITE_MODE)
  const vidRef = useRef(null);
  console.log('video ref',vidRef)
  // const [windowSize,setWindowSize] = useState({
  //   width:500,
  //   height:500
  // })
  // useEffect(()=>{
  //   const timeout = setTimeout(()=>{
  //     setClickCount(0);
  //   },1000);
  //   if(clickCount===2){
  //     console.log(vidRef.current.className);
  //     const theme = Theme(vidRef.current.className);
  //     console.log(theme.style);
  //     vidRef.current.style.height = theme.style.height;
  //     vidRef.current.style.width = theme.style.width;
  //     vidRef.current.className = theme.className;
  //   }
  //   return ()=>{
  //     clearTimeout(timeout);
  //   }
  // },[clickCount])

  // const vidClickHandler = ()=>{
  //   setClickCount((c)=>c+1);
  // }

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

  const getNodeFromRef = (nodes,ele) =>{
    var indx;
    nodes.forEach((n,i)=>{
      if(n.className===ele) indx = i;
    })
    return indx
  }
  const hoverHandler = (e) =>{
    console.log(e);
    console.log(vidRef.current.childNodes)
    const i = getNodeFromRef(vidRef.current.childNodes,'video-controls');
    // vidRef.current.childNodes[i].style.transition = '4s';
    switch(e.type) {
      case 'mouseenter':
        vidRef.current.childNodes[i].style.display = 'block';
        break;
      case 'mouseleave':
        vidRef.current.childNodes[i].style.display = 'none';
        break;
      default :
        console.log('invalid event!!');
    }
  }
  const closeVideo = ()=>{
    setCallInfo(p=>{
      return (
        {...p,onCall:false}
      )
    }
    )
  }
  return (
    
    (callInfo.onCall)?
      <div id="video-container"  ref={vidRef} className="video-box-m" onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
        <button className="video-close-btn" onClick={closeVideo}>
            <img src={cross} alt="close" />
        </button>
        <div className="video-box local-video" >
          <video id='localVideo' autoPlay muted playsInline></video>
        </div>
        <div className="video-box remote-video">
          <video id='remoteVideo' autoPlay playsInline></video>
        </div>
        <div className="video-controls">
        </div>
    </div>
    :''
  )
}

export default CallContainer;


            