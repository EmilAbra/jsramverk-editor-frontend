/**
 * Model to send mail invite with permission to a document.
 */

const mail = {
    baseUrl: window.location.href.includes("localhost")
    ? "http://localhost:1337"
    : "https://jsramverk-editor-emab21.azurewebsites.net",
    sendMail: async function sendMail(toMailAddress) {
        var data = {
            toMailAddress: toMailAddress,
            urlAdress: `${mail.baseUrl}/`
        };

        let response = await fetch(`${mail.baseUrl}/editor/mail_invite`, {
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
            method: "POST",
        });

        return response;
    }
};

export default mail;
