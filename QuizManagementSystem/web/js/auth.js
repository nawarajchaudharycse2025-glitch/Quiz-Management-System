document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // REGISTER
    // =========================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (password.length < 6) {
                alert("Password must contain at least 6 characters.");
                return;
            }

            const user = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem("quizUser", JSON.stringify(user));

            alert("Registration successful!");

            window.location.href = "login.html";
        });
    }


    // =========================
    // LOGIN
    // =========================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document
                .getElementById("loginEmail")
                .value
                .trim();

            const password = document
                .getElementById("loginPassword")
                .value;

            const savedUser = localStorage.getItem("quizUser");

            if (!savedUser) {
                alert("No account found. Please register first.");
                return;
            }

            const user = JSON.parse(savedUser);

            if (
                user.email === email &&
                user.password === password
            ) {

                localStorage.setItem("loggedIn", "true");

                alert("Login successful!");

                window.location.href = "dashboard.html";

            } else {

                alert("Invalid email or password.");
            }

        });
    }

});