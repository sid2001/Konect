import contacts from "/src/data/contacts.js"
import ContactsContainer from "./ContactsContainer"
const Contacts = ({search})=>{
  
  return(
    <ContactsContainer classN = {`contacts ${search?'drop':''}`}>
      {
        contacts.map((contact)=>{
          return(
          <div key={contact.id} id={contact.id} className="contact-card">
            <div className={`contact-picture ${contact.online==='true'?'online':''}`}>
              <img src={contact.pfp} alt="" />
            </div>
            <div className="contact-detail">
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