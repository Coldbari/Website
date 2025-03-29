document.addEventListener("DOMContentLoaded", () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    // If user is NOT logged in, and they're on index.html, send them to login
    if (!isLoggedIn && window.location.pathname.includes("index.html")) {
        window.location.replace("login.html");
    }
});



const section = document.getElementById("section");
const heading = document.getElementById("heading");
const message = document.getElementById("message");
const btn = document.getElementById("toggleBtn");

// Get user input fields
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const signinBtn = document.getElementById("signinBtn"); // Sign-in button
const signupBtn = document.getElementById("signupBtn"); // Sign-up button

btn.addEventListener("click", () => {
    section.classList.toggle("active");  

    if (section.classList.contains("active")) {
        heading.textContent = "Hello, Friend!";
        message.textContent = "Register with your personal details to use all of site features";
        btn.textContent = "Sign Up";
    } else {
        heading.textContent = "Welcome Back!";
        message.textContent = "Enter your personal details to use all of the site features";
        btn.textContent = "Sign In";
    }
});

// Store user credentials on Sign-Up
signupBtn.addEventListener("click", () => {
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    if (email === "" || password === "") {
        alert("Please enter an email and password to sign up.");
        return;
    }

    // Save credentials in localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Sign-up successful! Please sign in.");
});

// Check credentials on Sign-In
signinBtn.addEventListener("click", () => {
    const email = signinEmail.value.trim();
    const password = signinPassword.value.trim();

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");

        // Store login state
        localStorage.setItem("loggedIn", "true");

        // Prevent going back to login page
        window.location.replace("index.html");  // ✅ Uses replace() instead of href
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

