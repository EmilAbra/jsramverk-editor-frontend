import React, { useState } from "react";
import docsModel from "../models/docsModel";
import authModel from "../models/authModel";

export default function DocPermission(props) {
  const [userName, setUserName] = useState("");

  async function handlePermission(event) {
    event.preventDefault();
    const user = await authModel.getUser(userName);

    if (user.status === 200) {
      if (props.currentDoc.allowed_users.includes(userName)) {
        alert("Permission already exist.");
        return;
      }
      props.setCurrentDoc((prev) => {
        return {...prev, allowed_users: [...prev.allowed_users, userName]}
      })
      const result = await docsModel.updateDoc(props.currentDoc);

      if (result.status === 204) {
        alert(`Permission for ${userName} successfully registered.`);
      }
    } else if (user.status === 401) {
      alert(`User ${userName} does not exist.`);
    } else {
      alert(user.errors.message);
    }
  }

  return (
    <div>
      <form className="permission-form" onSubmit={handlePermission}>
        <label htmlFor="permission">Add Permission: </label>
        <input
          id="permission"
          name="permission"
          type="email"
          placeholder="email"
          required={true}
          minLength={6}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button>Confirm</button>
      </form>
    </div>
  );
}
