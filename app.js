// =============================================
// VikingGPT — Cleveland State University
// Claude API + live csuohio.edu web search
// BearcatGPT-inspired interface
// =============================================

const SYSTEM_PROMPT = `You are VikingGPT, the official AI assistant for Cleveland State University (CSU).
Search csuohio.edu and related CSU sites for accurate, real-time answers.
Give specific details: hours, deadlines, phone numbers, emails, room numbers.
Be concise, helpful, and friendly — like a knowledgeable student advisor.
Always cite the source page. Never make up information.`;

// Conversation history so context carries across messages
let conversationHistory = [];
let isTyping = false;

// ---- VIEW SWITCHING ----

// Show the home/agents view
function showHome() {
  document.getElementById("homeView").style.display = "flex";
  document.getElementById("chatView").style.display = "none";
}

// Open a specific agent and start the chat
function startChat(agentName) {
  // Reset conversation for fresh start
  conversationHistory = [];

  document.getElementById("homeView").style.display = "none";
  document.getElementById("chatView").style.display = "flex";
  document.getElementById("chatAgentName").textContent = agentName;
  document.getElementById("messages").innerHTML = "";

  // Welcome message tailored to which agent was clicked
  const welcomes = {
    "Viking Chat":        `Hi! I'm VikingGPT, your Cleveland State University assistant 🏛️\n\nI search csuohio.edu in real-time to answer any question about CSU — admissions, tuition, housing, programs, rec center hours, calendar, staff, and more.\n\nWhat would you like to know?`,
    "CSU Admissions":     `Hi! I'm the CSU Admissions assistant.\n\nI can help you with:\n• Application steps & deadlines\n• Required documents\n• Transfer admissions\n• Graduate programs\n• International students\n\nWhat do you need help with?`,
    "Campus Resources":   `Hi! I'm the CSU Campus Resources assistant.\n\nI can help you find:\n• Rec center hours & pool schedule\n• Library access & hours\n• Tutoring & academic support\n• Counseling & wellness services\n• Parking & transit\n\nWhat are you looking for?`,
  };

  appendMessage("bot", welcomes[agentName] || welcomes["Viking Chat"], "csuohio.edu");
}

// ---- MESSAGE HANDLING ----

// Send user message and trigger API call
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text || isTyping) return;

  appendMessage("user", text);
  input.value = "";
  autoResize(input);

  // Add to history so Claude has full conversation context
  conversationHistory.push({ role: "user", content: text });
  callClaudeAPI(text);
}

// Enter sends; Shift+Enter adds a new line
function handleKeyDown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Auto-grow textarea as user types
function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 140) + "px";
}

// ---- CLAUDE API WITH WEB SEARCH ----

// Calls Claude API with the web search tool scoped to CSU domains
// This means Viking reads real csuohio.edu pages — not hardcoded data
async function callClaudeAPI(userMessage) {
  isTyping = true;
  setTyping(true, "Searching csuohio.edu...");

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: conversationHistory,

        // Web search restricted to official CSU domains
        tools: [{
          type: "web_search_20250305",
          name: "web_search",
          allowed_domains: [
            "csuohio.edu",
            "csurec.com",
            "law.csuohio.edu",
            "levin.csuohio.edu",
            "engineering.csuohio.edu",
            "business.csuohio.edu",
            "artsandsciences.csuohio.edu"
          ]
        }]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    // Extract text blocks from the response
    const text = data.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();

    if (text) conversationHistory.push({ role: "assistant", content: text });

    setTyping(false);
    isTyping = false;
    appendMessage("bot", text || "I couldn't find that right now. Try csuohio.edu or call (216) 687-2000.", "csuohio.edu");

  } catch (err) {
    setTyping(false);
    isTyping = false;
    console.error("VikingGPT error:", err);
    appendMessage("bot", "Sorry, I had trouble reaching CSU's website.\n\nYou can get help directly:\n📞 (216) 687-2000\n🌐 csuohio.edu\n📧 allin1@csuohio.edu");
  }
}

// ---- DOM HELPERS ----

// Add a message bubble to the thread
function appendMessage(sender, text, source = null) {
  const container = document.getElementById("messages");

  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = sender === "bot" ? "V" : "KP";

  const content = document.createElement("div");
  content.className = "msg-content";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.style.whiteSpace = "pre-line";
  bubble.textContent = text;
  content.appendChild(bubble);

  // Show source attribution under bot replies
  if (sender === "bot" && source) {
    const src = document.createElement("div");
    src.className = "msg-source";
    src.textContent = `🔍 Source: ${source}`;
    content.appendChild(src);
  }

  const time = document.createElement("div");
  time.className = "msg-time";
  time.textContent = getCurrentTime();
  content.appendChild(time);

  wrapper.appendChild(avatar);
  wrapper.appendChild(content);
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

// Show or hide the animated typing/searching indicator
function setTyping(visible, label = "Searching csuohio.edu...") {
  const el = document.getElementById("typingIndicator");
  const lb = document.getElementById("typingLabel");
  if (lb) lb.textContent = label;
  el.classList.toggle("visible", visible);
  if (visible) document.getElementById("messages").scrollTop = 99999;
}

// Return current time as "HH:MM"
function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
}
