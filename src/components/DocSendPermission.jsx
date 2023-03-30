import React, { useState } from "react";
import docsModel from "../models/docsModel";
import mailModel from "../models/mailinviteModel";

export default function DocSendPermission(props) {
  const [mailAddress, setMailAddress] = useState("");

  async function handleSendPermission(event) {
    event.preventDefault();

    if (!props.currentDoc.length) {
      alert("No document is selected!");
      return;
    }
    if (props.currentDoc.allowed_users.includes(mailAddress)) {
      alert("Permission already exist!");
      return;
    }

    const result = await mailModel.sendMail(mailAddress);

    if (result.status === 200) {
      alert("The invitation has been sent successfully!");

      props.setCurrentDoc((prev) => {
        return {...prev, allowed_users: [...prev.allowed_users, mailAddress]};
      });
      await docsModel.updateDoc(props.currentDoc);
      setMailAddress("");
      return;
    } else if (result.status === 401) {
      alert("The email address does not exist!");
    } else {
      console.log(result.status);
    }
  }

  return (
    <div>
      <form className="permission-form" onSubmit={handleSendPermission}>
        <label htmlFor="send_permission">Send Permission: </label>
        <input
          id="send_permission"
          aria-label="send_permission"
          name="send_permission"
          type="email"
          placeholder="email"
          required={true}
          minLength={6}
          value={mailAddress}
          onChange={(e) => setMailAddress(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}
