import contacts from "/src/data/contacts.js"
import ContactsContainer from "./ContactsContainer"
const Contacts = ()=>{
  
  return(
    <ContactsContainer classN = 'contacts'>
      {
        contacts.map((contact)=>{
          return(
          <div key={contact.id} id={contact.id} className="contact-card">
            <div className={`contact-picture ${contact.online?'online':''}`}>
              <img src={contact.pfp} alt="" />
            </div>
            <div className="contact-detail">
              <div className="contact-username">{contact.username}</div>
              <div className="last-seen">{contact.lastseen}</div>
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