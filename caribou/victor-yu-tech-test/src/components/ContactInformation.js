import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import "../styles/ContactInformation.scss";

export default function ContactInformation({ contactId, contactName }) {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const renderMessages = () => {
    setUserData({
      ...userData,
      contactInformation: { contactId, contactName },
    });
    history.push("/messages");
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authentication-token");
    try {
      const removeContact = await axios.delete(
        "http://localhost:5000/removeContact",
        {
          headers: { "Authentication-Token": token },
          data: { contactId },
        }
      );
      if (removeContact.status === 200) {
        const { updatedContacts } = removeContact.data;
        const updatedUserData = { ...userData.user, contacts: updatedContacts };
        setUserData({ ...userData, user: updatedUserData });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>{contactName}</h2>
      <button onClick={renderMessages}>Messages</button>
      <button onClick={handleDelete}>Remove</button>
    </>
  );
}
