
const Theme = (className)=>{

  switch(className){
    case 'video-box-fs':{
      const style = {
        height:'200px',
        width:'200px',
      }
      const clas = 'video-box-m';
      return {
        className:clas,
        style:style
      } 
    }
    case 'video-box-m':
      {
        const style = {
          height:'100vh',
          width:'100vw'
        }
        const clas = 'video-box-fs';
        return {
          className:clas,
          style:style
        } 
      }
    default: return '';
  }
}
export default Theme;