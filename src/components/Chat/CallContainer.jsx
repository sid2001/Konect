import { useEffect } from "react";

const CallContainer = ()=>{

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
    <>
      <video id='localVideo' autoPlay muted playsInline></video>
      <video id='remoteVideo' autoPlay playsInline></video>
    </>
  )
}

export default CallContainer;