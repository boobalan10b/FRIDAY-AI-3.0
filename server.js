const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const client = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// AI chat
app.post("/api/chat", async (req, res) => {
    try {
        if (!client) {
            return res.status(503).json({
                error: "AI API key is not configured."
            });
        }

        const message = req.body.message;

        if (
            typeof message !== "string" ||
            !message.trim() ||
            message.length > 4000
        ) {
            return res.status(400).json({
                error: "Please enter a valid message."
            });
        }

        const response = await client.responses.create({
            model: process.env.OPENAI_MODEL || "gpt-5.5",
            instructions:
                "You are FRIDAY AI 3.0, a helpful personal assistant. " +
                "You can communicate in English and Tamil.",
            input: message.trim()
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("AI error:", error.message);

        res.status(500).json({
            error: "Sorry, FRIDAY could not answer right now."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log("FRIDAY AI 3.0 is running!");
});
