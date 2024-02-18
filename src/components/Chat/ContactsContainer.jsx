const ContactsContainer = ({classN,children})=>{

  return(
    <div className={`contact-container ${classN}`}>
    {children}
    </div>
  )
}

export default ContactsContainer;