# 🧠 AI-Assisted Knowledge Quiz

## 1. Project Setup & Demo

**Web Setup:**
```bash
npm install
npm start
```

The project will start locally at **http://localhost:5173/** (default Vite port).

**Mobile Setup (Optional Hybrid Extension):**
- **iOS:** Open the project in **Xcode** and run on a simulator/device.
- **Android:** Use  
  ```bash
  ./gradlew assembleDebug
  ```
  or launch via **Android Studio**.

**Demo:**
- 💻 Web: Host your build on **Vercel**, **Netlify**, or any static site host.
- 📱 Mobile: Provide a **screen recording** of the working app (if applicable).

---

## 2. Problem Understanding

The goal was to build an **AI-assisted quiz web app** where users can:
- Choose a topic (e.g., AI, Wellness, Space, etc.)
- Automatically generate **5 AI-created multiple-choice questions** using **Gemini 2.5 Flash API**.
- Attempt the quiz interactively.
- Receive **AI-generated personalized feedback** based on score and topic.

**Assumptions:**
- Users have an internet connection (API calls require online access).  
- Each quiz strictly returns **5 questions**, each with **4 options** and a **correct answer index**.  
- The interface supports **dark and light mode**.

---

## 3. AI Prompts & Iterations

**Initial Prompt Example (for Quiz Generation):**
```text
Generate exactly 5 multiple-choice quiz questions about "Artificial Intelligence".
Return only a JSON object with fields: question, options, correctAnswer.
```

**Issues Faced:**
- Gemini API sometimes returned text with markdown formatting (```json blocks).  
- Some responses missed required fields.

**Refined Prompt:**
- Added explicit instructions to return *only* JSON.  
- Added rule validation (4 options, correctAnswer index).  
- Implemented post-processing cleanup for extra markdown.

---

## 4. Architecture & Code Structure

**Main Files:**
```
src/
 ┣ components/
 ┃ ┗ TopicSelection.jsx      # Displays quiz topics with animations
 ┣ services/
 ┃ ┗ aiService.js            # Handles Gemini API integration
 ┣ App.jsx                   # Root navigation and quiz state handling
 ┣ index.css                 # Global Tailwind and dark mode styles
 ┣ main.tsx                  # Entry point
```

**AI Integration (`aiService.js`):**
- Uses **Gemini 2.5 Flash** model (`gemini-2.5-flash:generateContent`)
- `generateQuiz(topic)` → Creates quiz questions dynamically.  
- `generateFeedback(score, total, topic)` → Generates personalized motivational text.

**UI Layer:**
- **Framer Motion**: Smooth animations and hover effects.  
- **TailwindCSS**: Clean responsive design with dark mode.  
- **Lucide Icons**: Topic-based icons (Heart, Brain, Rocket, etc.).

**State Management:**  
- Handled in React using prop passing and hooks (no external context required).

---

## 5. Screenshots / Screen Recording

Attach:
- 🖼 Topic selection screen  
- 🧩 Quiz question screen  
- 🎯 Result/feedback screen  

![WhatsApp Image 2025-10-05 at 18 26 39_06b7ba23](https://github.com/user-attachments/assets/b08569df-2acd-40e9-9468-0805c4287466)
![WhatsApp Image 2025-10-05 at 18 26 40_243f57ff](https://github.com/user-attachments/assets/b6fb5696-b996-4f49-b5d8-c0f54eb256ff)
![WhatsApp Image 2025-10-05 at 18 26 41_a2f4cd7d](https://github.com/user-attachments/assets/c71efc9d-4168-493e-8983-045a8f6c1534)
![WhatsApp Image 2025-10-05 at 18 26 41_7b5954d7](https://github.com/user-attachments/assets/ebbf2097-6f44-48ea-bf55-1dfb31270d79)
![WhatsApp Image 2025-10-05 at 18 26 40_cabeeb59](https://github.com/user-attachments/assets/351ddaa0-388b-4873-acee-80cef3506d2d)




---

## 6. Known Issues / Improvements

| Issue | Description | Potential Fix |
|-------|--------------|----------------|
| Inconsistent JSON | Occasionally Gemini returns extra text | Add regex cleanup + stricter prompt |
| Static topic list | Topics are hardcoded | Fetch dynamically from API or database |
| No persistent data | Scores not saved | Add localStorage or backend |
| No timer | Users can take unlimited time | Add countdown timer for challenge mode |

---

## 7. Bonus Work

✨ **Extra Features Added:**
- Smooth **Framer Motion animations**  
- Beautiful **gradient cards**  
- Fully **responsive design**  
- **Dark & Light mode toggle support**  
- Footer credit: “Developed by Prem Kumar”
