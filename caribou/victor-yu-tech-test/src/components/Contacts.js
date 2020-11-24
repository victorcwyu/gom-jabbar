import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import ContactInformation from "./ContactInformation";
import "../styles/Contacts.scss";

export default function Contacts() {
  const { userData } = useContext(UserContext);

  const contacts = userData.user.contacts.map((contact, index) => {
    return (
      <ContactInformation
        key={index}
        contactId={contact.id}
        contactName={contact.username}
      />
    );
  });

  let contactClass;
  const numberOfContacts = contacts.length;

  if (numberOfContacts === 1) {
    contactClass = "one-contact-wrapper";
  } else {
    contactClass = "contacts-wrapper";
  }

  return (
    <>
      {userData.user.contacts[0] !== undefined && (
        <div className="contacts-plus-title-wrapper">
          <h2>Contacts</h2>
          <div className={contactClass}>
            <ul>{contacts}</ul>
          </div>
        </div>
      )}
    </>
  );
}
