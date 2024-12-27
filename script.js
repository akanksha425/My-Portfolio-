document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("http://your-backend-url/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            document.getElementById("formResponse").textContent = "Message sent successfully!";
        } else {
            document.getElementById("formResponse").textContent = "Failed to send the message. Please try again.";
        }
    } catch (error) {
        document.getElementById("formResponse").textContent = "An error occurred. Please try again.";
    }
});
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail", // or your email service
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password",
        },
    });

    const mailOptions = {
        from: email,
        to: "your-email@gmail.com", // Your email address
        subject: `New Message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Message sent successfully!");
    } catch (error) {
        res.status(500).send("Failed to send the message.");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
