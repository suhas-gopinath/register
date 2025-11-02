export const submit = async (
  username: string,
  password: string,
  setMessage: Function
) => {
  fetch("http://localhost:90/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      return response.json().then((data) => {
        if (response.ok) {
          setMessage(data.message);
        } else {
          alert(data.message);
        }
      });
    })
    .catch(() => {
      alert("Something went wrong");
    });
};
