document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(
    '.text-entry input[type="password"]'
  );
  const inputWrappers = document.querySelectorAll(
    ".text-entry > div:last-child"
  );
  const changeButton = document.getElementById("change-password-button");
  const requirementChecks = document.querySelectorAll(".required div");

  const validators = {
    length: (password) => password.length >= 8,
    letter: (password) => /[a-zA-Z]/.test(password),
    number: (password) => /[0-9]/.test(password),
    special: (password) =>
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const validate = () => {
    const currentPass = inputs[0].value;
    const newPass = inputs[1].value;
    const confirmPass = inputs[2].value;

    const isCurrentPasswordFilled = currentPass !== "";
    const isNewPasswordValid = Object.values(validators).every((validator) =>
      validator(newPass)
    );
    const doPasswordsMatch = newPass === confirmPass && newPass !== "";

    // update requirement indicators
    Object.keys(validators).forEach((key, index) => {
      requirementChecks[index].style.backgroundColor = validators[key](newPass)
        ? "#44C858" // green
        : "#D9D9D9"; // gray
    });

    // style for new password wrapper
    if (isNewPasswordValid) {
      inputWrappers[1].style.border = "1px solid #44C858";
      inputWrappers[1].style.backgroundColor = "rgba(68, 200, 88, 0.1)";
    } else {
      inputWrappers[1].style.border = "";
      inputWrappers[1].style.backgroundColor = "";
    }

    // style for confirm password wrapper
    if (doPasswordsMatch && isNewPasswordValid) {
      inputWrappers[2].style.border = "1px solid #44C858";
      inputWrappers[2].style.backgroundColor = "rgba(68, 200, 88, 0.1)";
    } else {
      inputWrappers[2].style.border = "";
      inputWrappers[2].style.backgroundColor = "";
    }

    const isValid =
      isCurrentPasswordFilled && isNewPasswordValid && doPasswordsMatch;
    changeButton.style.opacity = isValid ? "1" : "0.5";
    changeButton.style.cursor = isValid ? "pointer" : "not-allowed";

    return isValid;
  };

  inputs.forEach((input) => input.addEventListener("input", validate));

  changeButton.addEventListener("click", async (e) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }

    try {
      const response = await fetch("/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: inputs[0].value,
          newPassword: inputs[1].value,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        $("#password-message").css("color", "#44C858");
        $("#password-message").html(result.message);
      } else {
        $("#password-message").css("color", "#D64646");
        $("#password-message").html(result.message);
      }
    } catch (error) {
      console.error("Password change error:", error);
      alert("An error occurred while changing password");
    }
  });

  // Initial validation
  validate();
});
