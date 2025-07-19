document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  fetch("http://localhost:8888/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })  // Email not stored yet in backend
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
      if (data === "Signup successful") {
        window.location.href = "login.html";
      }
    })
    .catch(err => console.error("Signup error:", err));
});
