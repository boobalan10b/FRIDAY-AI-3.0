// FRIDAY AI 3.0

const input = document.getElementById("userInput");
const button = document.querySelector("button");

// Voice response
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

// Ask FRIDAY
function askFriday() {
    const question = input.value.trim();

    if (!question) {
        speak("Please ask me something.");
        return;
    }

    let answer = "";

    if (question.toLowerCase().includes("hello")) {
        answer = "Hello! I am FRIDAY AI. How can I help you?";
    }
    else if (question.toLowerCase().includes("your name")) {
        answer = "My name is FRIDAY AI version 3.0.";
    }
    else if (question.toLowerCase().includes("time")) {
        answer = "The time is " +
            new Date().toLocaleTimeString();
    }
    else if (question.toLowerCase().includes("date")) {
        answer = "Today's date is " +
            new Date().toLocaleDateString();
    }
    else {
        answer = "I am FRIDAY AI. I am ready to help you.";
    }

    alert(answer);
    speak(answer);
}

// Button event
button.addEventListener("click", askFriday);

// Voice recognition
function startListening() {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        input.value = event.results[0][0].transcript;
        askFriday();
    };
}

// Voice command
const voiceButton = document.createElement("button");

voiceButton.textContent = "🎤 Speak to FRIDAY";
voiceButton.onclick = startListening;

document.body.appendChild(voiceButton);

console.log("FRIDAY AI 3.0 Ready!");
