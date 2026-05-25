// =============================================
// Viking Chat — Cleveland State University Bot
// Powered by Claude AI + live web search
// Searches csuohio.edu for real-time answers
// =============================================

const BOT_NAME = "Viking";
const USER_INITIALS = "KP";

// System prompt that tells the AI to act as a CSU assistant
// and search the official CSU website for accurate answers
const SYSTEM_PROMPT = `You are Viking, the official AI assistant for Cleveland State University (CSU).

Your job is to answer questions from current and prospective CSU students, faculty, and visitors by searching the official CSU website (csuohio.edu) and related CSU pages.

IMPORTANT RULES:
- Always search csuohio.edu first for up-to-date, accurate information
- Give specific, precise answers — hours, dates, deadlines, names, contacts
- If you find specific data (times, phone numbers, emails, deadlines), include them
- Keep answers clear and well-structured with bullet points or sections where helpful
- Mention the source page when relevant so users can verify
- You cover: admissions, programs, tuition, housing, campus life, recreation, calendar, staff, contacts, financial aid, academic departments, parking, library, and anything CSU-related
- If something is not on the CSU website, say so and suggest where to find it
- Be friendly, helpful, and concise — like a knowledgeable student advisor
- Do NOT make up information. If unsure, say so and direct them to the right office`;

// Tracks whether a request is in flight
let isTyping = false;

// Stores the conversation so context carries across messages
let conversationHistory = [];

// ---- INIT ----

// Show the welcome message when the page loads
window.addEventListener("DOMContentLoaded", () => {
  appendMessage(
    "bot",
    `Hey! I'm Viking, your Cleveland State University assistant 🏛️\n\nI search csuohio.edu in real-time to give you accurate, up-to-date answers about:\n• Rec center hours & facilities\n• Admissions & deadlines\n• Tuition & financial aid\n• Housing & campus life\n• Academic programs & calendar\n• Staff, contacts & departments\n\nWhat would you like to know about CSU?`,
    "csuohio.edu"
  );
});

// ---- MESSAGE HANDLING ----

// Send a message — called by button click or Enter key
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  // Prevent sending empty messages or spamming while typing
  if (!text || isTyping) return;

  // Add the user's message to the thread
  appendMessage("user", text);

  // Clear and reset the textarea
  input.value = "";
  autoResize(input);

  // Add this message to the conversation history for context
  conversationHistory.push({ role: "user", content: text });

  // Call the Claude API with web search enabled
  callClaudeAPI(text);
}

// Handle keyboard shortcuts in the textarea
function handleKeyDown(e) {
  // Enter alone sends the message; Shift+Enter adds a new line
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Auto-grow the textarea as the user types
function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 150) + "px";
}

// Allow quick-ask chips in the sidebar to pre-fill and send a question
function quickAsk(text) {
  const input = document.getElementById("userInput");
  input.value = text;
  sendMessage();
}

// ---- CLAUDE API CALL ----

// Send question to Claude API with web search tool enabled
// This lets Viking search csuohio.edu just like a student would
async function callClaudeAPI(userMessage) {
  isTyping = true;

  // Show the animated typing indicator
  setTypingVisible(true, "Searching csuohio.edu...");

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,

        // System prompt shapes Viking's personality and focus
        system: SYSTEM_PROMPT,

        // Full conversation history so Viking remembers context
        messages: conversationHistory,

        // Web search tool lets Viking search csuohio.edu in real-time
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",

            // Restrict searches to CSU's official domain for accuracy
            allowed_domains: [
              "csuohio.edu",
              "csurec.com",
              "law.csuohio.edu",
              "levin.csuohio.edu",
              "engineering.csuohio.edu",
              "business.csuohio.edu"
            ]
          }
        ]
      })
    });

    const data = await response.json();

    // Check for API-level errors
    if (data.error) {
      throw new Error(data.error.message || "API error");
    }

    // Pull the text content from the response blocks
    // The response may include tool_use (search) and text blocks
    const fullText = data.content
      .filter(block => block.type === "text")
      .map(block => block.text)
      .join("\n")
      .trim();

    // Add Viking's reply to the conversation history
    if (fullText) {
      conversationHistory.push({ role: "assistant", content: fullText });
    }

    // Hide the typing indicator and show the reply
    setTypingVisible(false);
    isTyping = false;

    appendMessage("bot", fullText || "I couldn't find that info right now. Try visiting csuohio.edu or call (216) 687-2000.", "csuohio.edu");

  } catch (err) {
    // Something went wrong — show a helpful fallback
    setTypingVisible(false);
    isTyping = false;

    console.error("Viking API error:", err);
    appendMessage(
      "bot",
      `Sorry, I ran into an issue reaching the CSU website right now.\n\nYou can get help directly:\n📞 (216) 687-2000\n🌐 csuohio.edu\n📧 allin1@csuohio.edu`,
      null,
      true // mark as error style
    );
  }
}

// ---- DOM HELPERS ----

// Inject a message bubble into the chat thread
function appendMessage(sender, text, source = null, isError = false) {
  const container = document.getElementById("messages");

  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  // "V" for Viking, "KP" for the user
  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = sender === "bot" ? "V" : USER_INITIALS;

  const content = document.createElement("div");
  content.className = "msg-content";

  // The actual message bubble
  const bubble = document.createElement("div");
  bubble.className = `msg-bubble${isError ? " error" : ""}`;
  bubble.style.whiteSpace = "pre-line";
  bubble.textContent = text;

  content.appendChild(bubble);

  // For bot messages, show a small source attribution line
  if (sender === "bot" && source) {
    const src = document.createElement("div");
    src.className = "msg-source";
    src.innerHTML = `🔍 Source: <a href="https://${source}" target="_blank">${source}</a>`;
    content.appendChild(src);
  }

  // Timestamp for each message
  const timeEl = document.createElement("div");
  timeEl.className = "msg-time";
  timeEl.textContent = getCurrentTime();
  content.appendChild(timeEl);

  wrapper.appendChild(avatar);
  wrapper.appendChild(content);
  container.appendChild(wrapper);

  // Scroll to the latest message
  scrollToBottom();
}

// Show or hide the typing/searching indicator
function setTypingVisible(visible, label = "Searching csuohio.edu...") {
  const indicator = document.getElementById("typingIndicator");
  const labelEl = document.getElementById("typingLabel");

  if (visible) {
    // Update the label text (e.g. "Searching csuohio.edu...")
    if (labelEl) labelEl.textContent = label;
    indicator.classList.add("visible");
    scrollToBottom();
  } else {
    indicator.classList.remove("visible");
  }
}

// Smooth-scroll the message list to the bottom
function scrollToBottom() {
  const container = document.getElementById("messages");
  container.scrollTop = container.scrollHeight;
}

// Clear the full chat and reset to the welcome message
function clearChat() {
  // Reset conversation history so Viking starts fresh
  conversationHistory = [];

  const container = document.getElementById("messages");
  container.innerHTML = "";
  appendMessage(
    "bot",
    `Chat cleared! I'm Viking, your CSU assistant 🏛️\n\nAsk me anything about Cleveland State University — I'll search csuohio.edu for the latest info.`,
    "csuohio.edu"
  );
}

// Return current time as "HH:MM"
function getCurrentTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}
