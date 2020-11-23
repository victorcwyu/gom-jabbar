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

  return (
    <>
      {userData.user.contacts[0] !== undefined && (
        <div className="contactsWrapper">
          <h1>Contacts</h1>
          <ul>{contacts}</ul>
        </div>
      )}
    </>
  );
}
