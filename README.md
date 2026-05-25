# CSU-bot — Viking Chat Assistant

A dark-theme chatbot for Cleveland State University students and visitors. Built with vanilla HTML, CSS, and JavaScript. Answers questions by searching csuohio.edu in real-time.

## Features

- Live search of csuohio.edu for accurate, up-to-date answers
- Covers admissions, tuition, housing, programs, rec center, calendar, staff & contacts
- Modern dark UI with animated typing indicator
- Sidebar quick-ask chips for common topics
- Conversation memory — context carries across messages
- Fully responsive for mobile and desktop

## Project Structure

```
CSU-bot/
├── index.html   # Markup, layout, sidebar chips
├── style.css    # Dark theme styles and animations
├── app.js       # Claude API integration, web search, chat logic
└── README.md    # Project documentation
```

## Getting Started

Open `index.html` in a browser. The bot connects to the Claude API automatically.

```bash
git clone https://github.com/priyakrishna9919/CSU-bot.git
cd CSU-bot
open index.html
```

## How It Works

When a user asks a question, the bot calls the Claude API with a web search tool scoped to csuohio.edu and related CSU domains. The AI reads the relevant pages and responds with precise, sourced answers — just like a student advisor would.

## Topics Covered

- Admissions & application deadlines
- Programs, majors & colleges
- Tuition, fees & financial aid
- Housing & residence life
- Rec center hours & facilities
- Academic calendar & registration
- Campus life & student organizations
- Staff, faculty & department contacts

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Claude API (claude-sonnet-4) with web search tool
- Google Fonts: Syne + DM Mono

---

Built for CSU students who want fast, accurate answers without digging through the website.
