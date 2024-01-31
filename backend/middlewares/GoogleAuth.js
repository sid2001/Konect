const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

const verify = async (clientId,idToken,next,req)=>{
  try{
      const ticket = await client.verifyIdToken({
      idToken:idToken,
      audience:`${clientId}.apps.googleusercontent.com`
      });
      const payload = ticket.getPayload();
      console.log('token info user info:',payload);
      if(payload.aud!==`${clientId}.apps.googleusercontent.com`)//handle this error properly later
        next(new Error(`aud(${payload.aud}) doesn't match with client id: ${clientId}`));
      req.tokenPayload = payload;
      next();
  }
  catch(err){
    console.log('error in token verification: ',err);
    next(err);
  }
}

exports.getTokens = async (req,res,next)=>{
  const {tokens} = await req.googleAuthClient.getToken(req.body.authCode);
  console.log('auth tokens: ',tokens);
  req.idToken = tokens.id_token;
  next(); 
}

exports.verifyToken = async (req,res,next)=>{
  verify(req.CLIENT_ID,req.idToken,next,req);
}
