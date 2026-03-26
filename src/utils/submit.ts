export const submit = async (
  username: string,
  password: string,
  setMessage: Function,
  setLoading?: Function,
) => {
  if (setLoading) setLoading(true);
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
          if (setLoading) setLoading(false);
          setMessage(
            "Registration successful. You will be redirected to login page.",
          );
          setTimeout(() => {
            window.location.href = "http://localhost:3003/login";
          }, 7000);
        } else {
          if (setLoading) setLoading(false);
          alert(data.message);
        }
      });
    })
    .catch(() => {
      if (setLoading) setLoading(false);
      alert("Something went wrong");
    });
};
