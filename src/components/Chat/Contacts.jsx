// import contacts from "/src/data/contacts.js"
import defaultProfile from "/src/assets/default-profile.png"
import ContactsContainer from "./ContactsContainer"

const Contacts = ({search,contacts,setSelectedUser})=>{
  console.log('contacts:' ,contacts);
  return(
    <ContactsContainer classN = {`contacts ${search?'drop':''}`}>
      {
        contacts.map((contact)=>{
          return(
          <div key={contact.id} id={contact.id} className="contact-card" onClick={()=>{setSelectedUser(contact.id)}}>
            <div className={`contact-picture ${contact.online==='true'?'online':''}`}>
              <img src={contact.pfp?contact.pfp:defaultProfile} alt='photo' />
            </div>
            <div className="contact-detail" >
              <div className="contact-detail-header">
                <div className="contact-username">{contact.username}</div>
                <div className="last-seen">{contact.lastseen}</div>
              </div>
              <div className="last-message">{contact.lastmessage}</div>
            </div>
          </div>)
        }  
        )
      }
    </ContactsContainer>
  )
}

export default Contacts