import { useEffect, useState } from "react"
import PropTypes from "prop-types";

const ImageComponent = ({src,id})=>{
  const [imageLoaded,setImageLoaded] = useState(false);
  useEffect(()=>{
    const img = new Image()
    img.onload = ()=>setImageLoaded(true)
    img.src = src
    console.log(img);
  },[src])
  return (
    <>
    {imageLoaded?<img loading="lazy" src={src} id={id} alt="image"/>:<div className="image-placeholder"></div>}
    </>
  )
}

ImageComponent.propTypes = {
  src:PropTypes.string,
  id:PropTypes.string
}
export default ImageComponent;