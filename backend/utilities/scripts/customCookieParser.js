//extracts cookie with specific key 
const customCookieParser = (cookie,str)=>{
  console.log('cookie: ',cookie);
  try{
    const cookieArray = cookie.split(';').map(c => c.trim())
    cookieArray.forEach((c)=>{
      var key,value;
      [key,value] = c.split('=');
      console.log(c,' key: ',key,' value: ',value);
      if(key===str) return value
    })
  }catch(err){
    console.error('invalid cookie passed',err)
  }
  return ''
}

module.exports = customCookieParser