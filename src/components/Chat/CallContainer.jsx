import {useRef,useState, useEffect } from "react";
import Theme from "../UI/Theme";
import cross from "/src/assets/cross.png"
import connectSignallingServer from "../../services/SignallingServer";

const CallContainer = ({ws,callInfo,setCallInfo,username,callStatus,setCallStatus})=>{
  const [clickCount,setClickCount] = useState(0);
  const [mode,setMode] = useState(import.meta.env.VITE_MODE);
  const vidRef = useRef(null);
  const [peer,setPeer] = useState('');
  // var localStream;
  // var remoteVideo;
  // console.log('renderrrrrrrring');
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
  const handleSuccess = (stream) =>{
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const remoteAudio = document.getElementById('remoteAudio');
    console.log('local stream success handle');
    if(localVideo){
      console.log('setting local video');
      localVideo.srcObject = stream;
      // localStream = stream;
      console.log(stream);
      console.log('local stream: ',stream.getVideoTracks());
      if(callStatus==='answered'){
        connectSignallingServer({username:username,track:stream.getVideoTracks()[0],audioTrack:stream.getAudioTracks()[0],receiver:callInfo.to,isCaller:false,remoteVideo:remoteVideo,isAudio:false,remoteAudio:remoteAudio});
        // connectSignallingServer({username:username,track:stream.getVideoTracks()[0],audioTrack:stream.getAudioTracks()[0],receiver:callInfo.to,isCaller:false,remoteVideo:remoteVideo,isAudio:true,remoteAudio:remoteAudio});
      }
      else{
        connectSignallingServer({username:username,track:stream.getVideoTracks()[0],audioTrack:stream.getAudioTracks()[0], receiver:callInfo.to,isCaller:true,remoteVideo:remoteVideo,isAudio:false,remoteAudio:remoteAudio});
        // connectSignallingServer({username:username,track:stream.getVideoTracks()[0],audioTrack:stream.getAudioTracks()[0], receiver:callInfo.to,isCaller:true,remoteVideo:remoteVideo,isAudio:true,remoteAudio:remoteAudio});
      }
      }
    }
    
    const handleError = (err)=>{
      console.error('Error accessing user media:',err);
    }
    const getMedia = async ()=>{
        navigator.mediaDevices.getUserMedia({
          video:true,
          audio:true
        })
        .then(handleSuccess)
        .catch(handleError)
    }
  useEffect(()=>{
    switch(callStatus){
      case 'ringing':{
        console.log('ringing');
        // getMedia();
        break;
      }
      case 'rejected':{
        console.log('call declined');
        hangUpCall();
        break;
      }
      case 'accepted':{
        getMedia(); 
        // connectSignallingServer({username:username,track:localStream.getVideoTracks()[0],receiver:callInfo.to,isCaller:true});
        break;
      }
      case 'failed':{
        setCallInfo(p => ({...p,onCall:false}));
        break;
      }
      case 'calling' :{
        console.log("calling");
        break;
      }
      case 'answered':{
        getMedia(true);
        break;
      }
      case 'call_ended':{
        hangUpCall();
        break;
      }
      default:{
        console.log('invalid call status');
      }
    }
    return ()=>{
      const localVideo = document.getElementById('localVideo');
      if(localVideo && localVideo.srcObject){
        const tracks = localVideo.srcObject.getTracks();
        tracks.forEach(track=>track.stop());
      }
    }
  },[callStatus]);

  const getNodeFromRef = (nodes,ele) =>{
    var indx;
    nodes.forEach((n,i)=>{
      if(n.className===ele) indx = i;
    })
    return indx
  }
  const hoverHandler = (e) =>{
    // console.log(e);
    // console.log(vidRef.current.childNodes)
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
  const hangUpCall = ()=>{
    try{
    const indx = getNodeFromRef(vidRef.current.childNodes,'video-box local-video');
    const localSource = vidRef.current.childNodes[indx].childNodes[0];
    const tracks = localSource.srcObject.getTracks();
    tracks.forEach(track=>track.stop());
    localSource.srcObject = null;
    
    }catch(err){
      console.error(err);
    }
    setCallInfo(p=>{
      return (
        {...p,to:'',onCall:false}
      )
    }
    )
    console.log("callInfo", callInfo);
    const payload = {
      type:'call_ended',
      data:{
        recipient:callInfo.to
      }
    }
    if(callStatus!=='call_ended');
      ws.send(JSON.stringify(payload));
  }
  return (
    
    (callInfo.onCall)?
      <div id="video-container"  ref={vidRef} className="video-box-m" >
        <button className="video-close-btn" onClick={closeVideo}>
            <img src={cross} alt="close" />
        </button>
        <div className="video-box local-video" >
          <video id='localVideo' autoPlay muted playsInline></video>
        </div>
        <div className="video-box remote-video">
          <video id='remoteVideo' autoPlay playsInline></video>
          <audio autoPlay id="remoteAudio"></audio>
        </div>
        <div className="video-controls">
          <div id="hang-up" onClick={hangUpCall}>
            <img  src='/src/assets/hang-up.png' alt="" />
          </div>
        </div>
    </div>
    :''
  )
}

export default CallContainer;


            