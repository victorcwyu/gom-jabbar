import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import ContactInformation from "./ContactInformation";

export default function Contacts() {
  const { userData, setUserData } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authentication-token");
    try {
      axios
        .post(
          "http://localhost:5000/findUser",
          { username: input },
          {
            headers: {
              "Authentication-Token": token,
            },
          }
        )
        .then((res) => {
          setSearchData(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authentication-token");
    try {
      const contactData = await axios.post(
        "http://localhost:5000/addContact",
        { contactData: searchData },
        {
          headers: {
            "Authentication-Token": token,
          },
        }
      );
      const updatedContacts = [
        ...userData.user.contacts,
        contactData.data.userData,
      ];
      const updatedUserData = { ...userData.user, contacts: updatedContacts };
      setUserData({ ...userData, user: updatedUserData });
      setSearchData(null);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

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
      <div>
        <h1>Contacts</h1>
        <ul>{contacts}</ul>
      </div>
      <div>
        <h2>Search Users</h2>
        <input
          type="text"
          placeholder="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {!searchData && <button onClick={handleSearch}>Search</button>}
      </div>
      {searchData && (
        <div>
          <button onClick={handleAddContact}>
            Add {searchData.username} to your Contacts
          </button>
        </div>
      )}
    </>
  );
}

// <div>
//   <h2>Contacts</h2>
//   <ul>{contacts}</ul>
// </div>;
