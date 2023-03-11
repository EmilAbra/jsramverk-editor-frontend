/**
 * Model to execute code.
 */

const code = {
  getCodeResult: async function getCodeResult(value) {
    var data = {
      code: btoa(value),
    };
    try {
      const response = await fetch("https://execjs.emilfolino.se/code", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      });
      const result = await response.json();
      const decodedOutput = atob(result.data);

      return decodedOutput;

    } catch (error) {
      return (error);
    }
  },
};

export default code;
