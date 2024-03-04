const mongoose = require('mongoose')
const Users = require('../../models/Users')

const verifyClientSession = async (uid)=>{
    // const db = mongoose.connection
    // const sessions = db.collection('user-sessions');

    // const session = await sessions.findOne({_id:sid})

    // if(session===null) 
    //   return false
    // else{
    //   const userId = session.session.userId
      const user = await Users.findOne({_id:uid})
      
      if(user===null) return false
    // }
    return true
}
module.exports = verifyClientSession;