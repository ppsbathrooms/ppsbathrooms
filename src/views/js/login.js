document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("emailEntry");
  const passwordInput = document.getElementById("passEntry");
  const rememberMeCheckbox = document.getElementById("remember-me");
  const returnToInput = document.getElementById("returnTo");

  const urlParams = new URLSearchParams(window.location.search);
  const returnTo = urlParams.get("returnTo") || "/update";
  if (returnToInput) returnToInput.value = returnTo;

  // check for remembered email on page load
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMeCheckbox.checked = true;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Please enter a valid email address");
      return;
    }

    // password validation
    if (passwordInput.value.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      // remember me
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedEmail", emailInput.value);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // send login request to server
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
          returnTo: returnToInput ? returnToInput.value : "/update",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // login successful
        window.location.href = result.redirectTo;
      } else {
        // login failed
        alert(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  });
});
