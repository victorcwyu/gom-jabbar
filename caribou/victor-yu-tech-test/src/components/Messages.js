import React, { useState, useContext } from "react";
import axios from "axios";

export default function Messages() {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleSearch = async (e) => {
    console.log(input);
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

  return (
    <>
      <div>
        <h2>Add a Contact</h2>
        <input
          type="text"
          placeholder="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </>
  );
}
