import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Loader = ({status})=>{
  const {pathname,search} = useLocation();
  const navigate = useNavigate();
  console.log('location',location);
  useEffect(()=>{
    if(status===1) navigate(`${pathname+search}`);
  },[status,pathname,search,navigate])
  return(
    <h1>
      Loading...
    </h1>
  )
}

export default Loader;