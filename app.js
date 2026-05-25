// =============================================
// Viking Chat — Cleveland State University Bot
// Full CSU knowledge base: admissions, tuition,
// programs, housing, calendar, staff & more
// =============================================

const BOT_NAME = "Viking";
const USER_INITIALS = "KP";

// ---- CSU KNOWLEDGE BASE ----
// Organized by topic. Each entry has keyword triggers and response data.

const csuData = {

  // --- GENERAL INFO ---
  general: {
    keywords: ["what is csu", "about cleveland state", "tell me about csu", "overview", "history", "founded", "president", "mascot", "nickname"],
    responses: [
      `Cleveland State University (CSU) is a public research university located in downtown Cleveland, Ohio. Founded in 1964, it offers over 200 academic programs across 8 colleges. The university has more than 120,000 alumni and currently enrolls around 14,160 students. The president is Dr. Laura J. Bloomberg and the provost is Nigamanth Sridhar. CSU's mascot is Magnus the Viking! 🏛️`,
    ]
  },

  // --- ADMISSIONS ---
  admissions: {
    keywords: ["admission", "apply", "application", "acceptance", "enroll", "how to get in", "requirements", "sat", "act", "gpa", "deadline", "spring 2026", "fall 2025", "undergraduate apply"],
    responses: [
      `Here's what you need to know about CSU admissions:\n\n📋 **Application:** CSU accepts the Common Application. SAT/ACT scores are considered but not required.\n\n📅 **Key Deadlines:**\n• Fall 2025 – Priority deadline active now\n• Spring 2026 – Undergraduate applications due December 2, 2025\n\n📊 **Enrollment:** ~14,160 students total (9,505 undergrad, 4,655 grad)\n\n🎯 For more info visit csuohio.edu/admissions or call 888-CSUOHIO`,
    ]
  },

  // --- PROGRAMS & COLLEGES ---
  programs: {
    keywords: ["program", "major", "degree", "college", "department", "course", "study", "undergraduate", "graduate", "law", "engineering", "business", "arts", "science", "education", "health", "nursing"],
    responses: [
      `CSU offers 200+ programs across 8 colleges:\n\n🏛️ **College of Arts & Sciences** – Humanities, sciences, social sciences\n⚙️ **Washkewicz College of Engineering** – All major engineering disciplines\n💼 **Monte Ahuja College of Business** – Business, accounting, finance, MBA\n⚖️ **Cleveland-Marshall College of Law** – JD programs (est. 1897), Dean: Lee Fisher\n🏥 **College of Health** – Nursing, health sciences, PT, OT\n🎓 **Levin College of Public Affairs & Education** – Education, urban affairs, counseling\n🔬 **College of Graduate Studies** – 160+ grad programs\n\nTuition is approx. $400/credit hour with flat-rate option for 12–15 credit hours.`
    ]
  },

  // --- TUITION & FINANCIAL AID ---
  tuition: {
    keywords: ["tuition", "fees", "cost", "financial aid", "scholarship", "fafsa", "afford", "price", "pay", "in-state", "out-of-state", "international", "credit hour", "net price", "aid"],
    responses: [
      `Here's a full breakdown of CSU costs for 2025–2026:\n\n💰 **Tuition:**\n• In-state: $12,982/year\n• Out-of-state: $18,502/year\n• Graduate in-state: $11,297/year\n• Graduate out-of-state: $21,107/year\n• Per credit hour: ~$400\n\n🏠 **Living Costs (on-campus):** ~$18,804/year\n\n📦 **Total COA (in-state, on-campus):** ~$32,786/year\n\n🎁 **Financial Aid:**\n• 77% of first-year students receive need-based aid\n• Average aid amount: $9,231\n• Average net price: $15,639\n• 70% of enrolled students receive grants/scholarships\n\n📌 Complete FAFSA early for best aid packages. Contact Bursar's Office: 216-687-3615`
    ]
  },

  // --- HOUSING & CAMPUS LIFE ---
  housing: {
    keywords: ["housing", "dorm", "residence", "live on campus", "apartment", "euclid commons", "the edge", "langston", "resident", "roommate", "meal plan", "campus life", "move in"],
    responses: [
      `CSU has on-campus housing options for all students:\n\n🏠 **Residence Halls:**\n• **Euclid Commons** – Primary residence hall (Community Director: Heaven Duley)\n• **The Edge** – Upper-division focused (Community Director: John Moore)\n• **Langston** – Community-focused living (Community Director: Erin Reynolds)\n\n📅 **Move-In Dates:**\n• Summer 2025: Starting May 16, 2025\n• Fall 2025–26: Starting August 21, 2025\n\n💵 **Summer Housing:** $2,000 for entire summer (~$139/week)\n🏢 **Annual On-Campus Cost:** $9,700–$18,304 depending on room type\n\n📞 Residence Life Office: 216-687-5196\n📧 reslife@csuohio.edu\n📍 Euclid Commons, Room 198, 2450 Euclid Ave.`
    ]
  },

  // --- CAMPUS LIFE & ACTIVITIES ---
  campuslife: {
    keywords: ["club", "organization", "activity", "recreation", "gym", "fitness", "event", "homecoming", "cultural", "student life", "sports", "viking", "ncaa", "horizon league", "student org"],
    responses: [
      `CSU has a vibrant campus life:\n\n🎉 **Student Organizations:** 200+ clubs including the Indian Student Organization, cultural groups, academic clubs, fraternities & sororities\n\n🏋️ **Recreation Center:** 110,000 sq ft facility with modern fitness equipment, courts, and wellness programs\n\n🏀 **Athletics:** NCAA Division I – Horizon League (Vikings!)\n• Mascot: Magnus the Viking\n• Colors: University Green & Fresh Green\n\n📅 **Major Events:** Homecoming, cultural festivals, career fairs, networking events, hackathons\n\n📰 **Campus Newspaper:** The Cauldron\n\n🌍 **Diversity:** Students from all over the world — average class size ~23 students`
    ]
  },

  // --- ACADEMIC CALENDAR ---
  calendar: {
    keywords: ["calendar", "semester", "fall 2025", "spring 2026", "summer 2026", "start date", "end date", "finals", "exam", "break", "holiday", "graduation", "commencement", "withdraw", "drop", "add class", "registration", "schedule"],
    responses: [
      `CSU follows a semester-based academic calendar:\n\n📅 **Fall 2025:**\n• Classes begin: Late August 2025\n• Add/drop via CampusNet: First week of term\n• Incomplete deadline: May 1, 2026\n\n📅 **Spring 2026:**\n• Undergrad application deadline: December 2, 2025\n• Intent to Graduate (Final): Spring 2026 deadline via CampusNet\n\n📅 **Summer 2026:**\n• Intent to Graduate forms due during summer\n\n📌 **Registration Tips:**\n• Add classes via CampusNet in first week\n• Late adds need a form + Bursar confirmation\n• Non-attendance ≠ official withdrawal\n• Medical withdrawals: consult college advising first\n\n📞 Bursar's Office: 216-687-3615\n🌐 Check CampusNet for exact dates — always up to date!`
    ]
  },

  // --- CONTACT & DEPARTMENTS ---
  contact: {
    keywords: ["contact", "phone", "email", "address", "location", "office", "bursar", "registrar", "police", "emergency", "all in one", "help desk", "where is", "how do i reach"],
    responses: [
      `Here are key CSU contacts:\n\n🏫 **Main Address:** 2121 Euclid Avenue, Cleveland, OH 44115-2214\n📞 **Main Line:** (216) 687-2000\n\n📌 **Key Offices:**\n• **All-in-One Service Center (Bursar/Registrar):** 216-687-5411 | allin1@csuohio.edu | 1899 E. 22nd St., BH 114\n• **Residence Life & Housing:** 216-687-5196 | reslife@csuohio.edu\n• **TRIO Student Support Services:** 216-687-2402 | trioadvising@csuohio.edu | Berkman Hall 110\n• **Admissions (Toll Free):** 888-CSUOHIO\n\n🚨 **Emergency / University Police:**\n• On-campus: Ext. 911 or Ext. 9323\n• Direct: 216-687-9323\n\n🌐 Website: www.csuohio.edu`
    ]
  },

  // --- STAFF & FACULTY ---
  staff: {
    keywords: ["staff", "faculty", "director", "dean", "president", "provost", "professor", "advisor", "who is", "resident assistant", "community director", "cayla", "heaven", "john moore", "erin", "laura bloomberg", "nigamanth"],
    responses: [
      `Here are key CSU staff members:\n\n👩‍💼 **University Leadership:**\n• **President:** Dr. Laura J. Bloomberg\n• **Provost:** Nigamanth Sridhar\n\n⚖️ **College of Law Dean:** Lee Fisher\n🎓 **Levin College Dean:** Jill Gordon, Ph.D.\n\n🏠 **Residence Life Staff:**\n• **Resident Services Manager:** Cayla Bentley (first point of contact for residential students)\n• **Euclid Commons Community Director:** Heaven Duley\n• **The Edge Community Director:** John Moore\n• **Langston Community Director:** Erin Reynolds\n\n📋 **Faculty:** 511 academic staff | 1,000+ administrative staff\n\n🔍 For the full directory visit: csuohio.edu/phone`
    ]
  },

  // --- LOCATION ---
  location: {
    keywords: ["where", "location", "downtown", "cleveland", "ohio", "campus", "address", "map", "parking", "near"],
    responses: [
      `CSU is located in the heart of downtown Cleveland, Ohio! 📍\n\n🏙️ **Campus:** 85 acres, large urban campus\n📍 **Address:** 2121 Euclid Avenue, Cleveland, OH 44115\n\n🎭 **Nearby Attractions:** Museums, theaters, sports teams (Guardians, Browns, Cavaliers), cultural venues — all within walking distance!\n\n🚗 **Parking:** Note — parking on campus can be expensive and competitive. Many students live off-campus and commute.\n\n🚇 CSU is accessible via RTA public transit from across Cleveland.`
    ]
  }
};

// Fallback replies for unrecognized questions
const fallbackReplies = [
  `I'm Viking, CSU's assistant! I can help with admissions, programs, tuition, housing, academic calendar, staff info, and more. What would you like to know?`,
  `Hmm, I'm not sure about that one. Try asking me about CSU admissions, tuition costs, housing, programs, or contact info!`,
  `Great question! For the most accurate answer, you can also reach CSU directly at (216) 687-2000 or visit csuohio.edu. What else can I help with?`,
  `I specialize in Cleveland State University info. Ask me about majors, costs, campus life, deadlines, or staff — I've got you covered!`,
];

// Tracks whether the bot is currently "typing"
let isTyping = false;

// ---- INIT ----

// Show a welcome message when the page loads
window.addEventListener("DOMContentLoaded", () => {
  appendMessage("bot", `Hey! I'm Viking, your Cleveland State University assistant 🏛️\n\nI can help you with:\n• Admissions & applications\n• Programs & colleges\n• Tuition & financial aid\n• Housing & campus life\n• Academic calendar & deadlines\n• Staff & contact info\n\nWhat would you like to know about CSU?`);
});

// ---- MESSAGE HANDLING ----

// Called when user clicks send or presses Enter
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  // Don't send if empty or bot is mid-response
  if (!text || isTyping) return;

  // Append user message to thread
  appendMessage("user", text);

  // Clear input and reset height
  input.value = "";
  autoResize(input);

  // Trigger bot response with typing delay
  simulateTyping(text);
}

// Handle keyboard shortcuts in the textarea
function handleKeyDown(e) {
  // Enter sends the message; Shift+Enter creates new line
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Auto-grow textarea as user types
function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 160) + "px";
}

// ---- BOT RESPONSE LOGIC ----

// Show typing indicator then post the reply after a delay
function simulateTyping(userText) {
  isTyping = true;
  showTyping(true);

  // Vary the delay slightly to feel more natural
  const delay = 700 + Math.random() * 800;

  setTimeout(() => {
    showTyping(false);
    isTyping = false;
    const reply = generateReply(userText);
    appendMessage("bot", reply);
  }, delay);
}

// Match user input against the CSU knowledge base
function generateReply(text) {
  const lower = text.toLowerCase();

  // Check each topic's keywords against the input
  for (const topic of Object.values(csuData)) {
    const matched = topic.keywords.some(kw => lower.includes(kw));
    if (matched) {
      // Return a response from the matched topic
      return pickRandom(topic.responses);
    }
  }

  // Nothing matched — return a helpful fallback
  return pickRandom(fallbackReplies);
}

// Pick a random element from an array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---- DOM HELPERS ----

// Append a new message bubble to the chat thread
function appendMessage(sender, text) {
  const container = document.getElementById("messages");

  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  // Avatar label: "V" for Viking bot, "KP" for user
  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = sender === "bot" ? "V" : USER_INITIALS;

  const content = document.createElement("div");
  content.className = "msg-content";

  // Support newlines in bot responses
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.style.whiteSpace = "pre-line";
  bubble.textContent = text;

  // Timestamp for each message
  const timeEl = document.createElement("div");
  timeEl.className = "msg-time";
  timeEl.textContent = getCurrentTime();

  content.appendChild(bubble);
  content.appendChild(timeEl);
  wrapper.appendChild(avatar);
  wrapper.appendChild(content);
  container.appendChild(wrapper);

  // Always scroll to the latest message
  scrollToBottom();
}

// Toggle the typing indicator visibility
function showTyping(visible) {
  const indicator = document.getElementById("typingIndicator");
  if (visible) {
    indicator.classList.add("visible");
    scrollToBottom();
  } else {
    indicator.classList.remove("visible");
  }
}

// Smooth-scroll the message container to the bottom
function scrollToBottom() {
  const container = document.getElementById("messages");
  container.scrollTop = container.scrollHeight;
}

// Clear chat and reset to welcome message
function clearChat() {
  const container = document.getElementById("messages");
  container.innerHTML = "";
  appendMessage("bot", `Chat cleared! I'm Viking, your CSU assistant 🏛️ Ask me anything about Cleveland State University.`);
}

// Return current time as "HH:MM"
function getCurrentTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}
