document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8888/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    if (data === "Login successful") {
      sessionStorage.setItem("username", username);
      window.location.href = "index.html"; // go to your main app
    }
  });
});
