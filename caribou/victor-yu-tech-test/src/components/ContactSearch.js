import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import "../styles/ContactSearch.scss";

export default function ContactSearch() {
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
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          alert(errorMessage);
          setInput("");
        });
    } catch (error) {
      console.error(error);
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
        contactData.data.contactData,
      ];
      const updatedUserData = { ...userData.user, contacts: updatedContacts };
      setUserData({ ...userData, user: updatedUserData });
      setSearchData(null);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setSearchData(null);
    setInput("");
  };

  return (
    <>
      <div className="search">
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
        <div className="searchResults">
          <h2>Search Results</h2>
          <button onClick={handleAddContact}>
            Add {searchData.username} to your Contacts
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </>
  );
}
