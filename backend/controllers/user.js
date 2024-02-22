exports.getContacts = (req,res,next)=>{
  try{
    const contacts = req.user.getContacts();
    const payload = {
      message:'contacts data',
      data: contacts
    }
    res.status(200).json(JSON.stringify(payload));
  }
  catch(err){
    console.log(err);
    next(new Error(`error while fetching contact; user: ${req.user}`))
  }
}
