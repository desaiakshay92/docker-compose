document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("submit-form");
    const responseDiv = document.getElementById("response");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        if (name === "") {
            responseDiv.innerText = "Please enter your name.";
            return;
        }

        // Show loading indicator
        responseDiv.innerText = "Submitting...";
        responseDiv.style.color = "#007BFF"; // Loading color

        fetch("/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })
            .then(data => {
                responseDiv.innerText = `Hello, ${data.message}!`;
                responseDiv.style.color = "#333"; // Reset to default color
            })
            .catch(error => {
                console.error("Fetch error:", error);
                responseDiv.innerText = "An error occurred. Please try again.";
                responseDiv.style.color = "red";
            });
    });
});
