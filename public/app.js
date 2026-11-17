// FRIDAY AI 3.0

const input = document.getElementById("userInput");
const button = document.querySelector("button");

const output = document.createElement("div");
output.id = "response";
output.style.marginTop = "25px";
output.style.padding = "15px";
output.style.maxWidth = "500px";
output.style.color = "white";
document.body.appendChild(output);

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

async function askFriday() {
    const message = input.value.trim();

    if (!message) {
        output.textContent = "Please enter a question.";
        return;
    }

    output.textContent = "FRIDAY is thinking...";
    button.disabled = true;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "AI request failed");
        }

        output.textContent = "FRIDAY: " + data.reply;
        speak(data.reply);

    } catch (error) {
        output.textContent = "Error: " + error.message;
    } finally {
        button.disabled = false;
    }
}

button.addEventListener("click", askFriday);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        askFriday();
    }
});

// Voice input
function startListening() {
    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!Recognition) {
        alert("Voice recognition is not supported.");
        return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-IN";

    recognition.onresult = function(event) {
        input.value = event.results[0][0].transcript;
        askFriday();
    };

    recognition.start();
}

const voiceButton = document.createElement("button");
voiceButton.textContent = "🎤 Speak to FRIDAY";
voiceButton.onclick = startListening;
document.body.appendChild(voiceButton);

console.log("FRIDAY AI 3.0 Ready!");
