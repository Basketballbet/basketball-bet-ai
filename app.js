const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chat");

const API_URL = "https://your-project-name.vercel.app/api/evaluate"; // <-- Replace with your Vercel URL

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("messageInput");
    const msg = input.value.trim();
    if (!msg) return;

    // Add user message
    const userBubble = document.createElement("div");
    userBubble.classList.add("message", "user");
    userBubble.textContent = msg;
    chatBox.appendChild(userBubble);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Call backend
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });
        const data = await response.json();

        // Add AI reply
        const aiBubble = document.createElement("div");
        aiBubble.classList.add("message", "ai");
        aiBubble.textContent = data.reply;
        chatBox.appendChild(aiBubble);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        const errorBubble = document.createElement("div");
        errorBubble.classList.add("message", "ai");
        errorBubble.textContent = "Error: Unable to reach backend.";
        chatBox.appendChild(errorBubble);
    }
});
