// =============================================
// Viking Chat — Main Application Logic
// Handles messages, bot replies, UI state
// =============================================

// Bot identity and predefined response pool
const BOT_NAME = "Viking";
const USER_INITIALS = "KP";

// A set of contextual replies the bot can pick from
// Each entry maps to a keyword pattern
const replyMap = [
  { keywords: ["hello", "hi", "hey", "sup", "hiya"],
    replies: ["Hey! What's on your mind?", "Hi there! How can I help today?", "Hello! Ready when you are."] },
  { keywords: ["how are you", "how r u", "how do you do"],
    replies: ["Doing great, thanks for asking! What do you need?", "All good on my end. What can I help with?"] },
  { keywords: ["help", "support", "assist", "need help"],
    replies: ["Of course, I'm here for that. Tell me more.", "Sure thing — what do you need help with?", "Absolutely. Walk me through the issue."] },
  { keywords: ["bye", "goodbye", "see you", "later", "cya"],
    replies: ["Take care! Come back anytime.", "Catch you later!", "Goodbye! Have a great day."] },
  { keywords: ["thanks", "thank you", "thx", "ty"],
    replies: ["Anytime!", "Happy to help!", "No problem at all."] },
  { keywords: ["what can you do", "what do you do", "your features", "capabilities"],
    replies: ["I can help you brainstorm, answer questions, draft text, debug ideas, and a lot more. Try me!"] },
  { keywords: ["name", "who are you", "what are you"],
    replies: [`I'm ${BOT_NAME}, your personal assistant. What do you need?`] },
  { keywords: ["project", "task", "deadline", "work"],
    replies: ["Let's tackle it. What's the project about?", "Happy to help you plan that out. What's the scope?"] },
  { keywords: ["code", "bug", "error", "fix", "debug"],
    replies: ["Paste the snippet and I'll take a look.", "Let me help you debug. What's the error message?", "Sure, walk me through what it should do vs what's happening."] },
];

// Generic fallback replies when no keyword matches
const fallbackReplies = [
  "Tell me more about that.",
  "Interesting — can you expand on that?",
  "Got it. What would you like to do with that?",
  "I'm with you. What's the next step?",
  "That makes sense. How can I help from here?",
  "Sure — want me to dig into that further?",
];

// Tracks whether the bot is currently "typing"
let isTyping = false;

// ---- INIT ----

// Show a welcome message when the page loads
window.addEventListener("DOMContentLoaded", () => {
  appendMessage("bot", `Hey there! I'm ${BOT_NAME}. Ask me anything or just start a conversation.`);
});

// ---- MESSAGE HANDLING ----

// Called when user presses send or hits Enter
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  // Don't send empty messages
  if (!text || isTyping) return;

  // Render user's message in the thread
  appendMessage("user", text);

  // Clear the input field and reset height
  input.value = "";
  autoResize(input);

  // Simulate the bot thinking, then reply
  simulateTyping(text);
}

// Handle keyboard shortcuts inside the textarea
function handleKeyDown(e) {
  // Enter alone = send, Shift+Enter = new line
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Auto-grow the textarea as user types
function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 160) + "px";
}

// ---- BOT RESPONSE LOGIC ----

// Show typing indicator, wait a bit, then post reply
function simulateTyping(userText) {
  isTyping = true;
  showTyping(true);

  // Random delay between 600ms and 1.6s to feel natural
  const delay = 600 + Math.random() * 1000;

  setTimeout(() => {
    showTyping(false);
    isTyping = false;

    const reply = generateReply(userText);
    appendMessage("bot", reply);
  }, delay);
}

// Find the best matching reply for the user's input
function generateReply(text) {
  const lower = text.toLowerCase();

  for (const entry of replyMap) {
    // Check if any keyword from this group appears in the message
    const matched = entry.keywords.some(kw => lower.includes(kw));
    if (matched) {
      // Pick a random reply from the matched group
      return pickRandom(entry.replies);
    }
  }

  // No keyword matched — use a generic fallback
  return pickRandom(fallbackReplies);
}

// Pick a random item from an array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---- DOM HELPERS ----

// Inject a new message bubble into the thread
function appendMessage(sender, text) {
  const container = document.getElementById("messages");

  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  // Avatar: "V" for bot, "KP" for user
  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = sender === "bot" ? "V" : USER_INITIALS;

  const content = document.createElement("div");
  content.className = "msg-content";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;

  // Format current time as HH:MM
  const timeEl = document.createElement("div");
  timeEl.className = "msg-time";
  timeEl.textContent = getCurrentTime();

  content.appendChild(bubble);
  content.appendChild(timeEl);
  wrapper.appendChild(avatar);
  wrapper.appendChild(content);
  container.appendChild(wrapper);

  // Scroll to the latest message
  scrollToBottom();
}

// Show or hide the typing indicator
function showTyping(visible) {
  const indicator = document.getElementById("typingIndicator");
  if (visible) {
    indicator.classList.add("visible");
    scrollToBottom();
  } else {
    indicator.classList.remove("visible");
  }
}

// Smooth scroll to bottom of messages container
function scrollToBottom() {
  const container = document.getElementById("messages");
  container.scrollTop = container.scrollHeight;
}

// Clear all messages and re-inject the welcome message
function clearChat() {
  const container = document.getElementById("messages");
  container.innerHTML = "";
  appendMessage("bot", `Chat cleared. Hi again! I'm ${BOT_NAME}. What do you need?`);
}

// Return current time as "HH:MM" string
function getCurrentTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}
