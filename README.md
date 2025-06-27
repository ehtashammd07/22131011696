# 🔗 React URL Shortener – AffordMed Evaluation Project

A fully functional URL shortener built using **React.js**, **JavaScript**, and **Material UI**, with support for custom shortcodes, expiration, redirection, and statistics – all adhering strictly to AffordMed's guidelines.

---

## 📸 Screenshots

### 🌐 URL Shortener Form
![Shortener Screenshot](https://github.com/user-attachments/assets/d74b887f-0b88-4b4c-b131-6bd4bb8086b9)

### 📊 Statistics Page
![Stats Screenshot](https://github.com/user-attachments/assets/765bf344-ce2f-4f95-b994-c21df3209942)


## 🔒 Evaluation Constraints Addressed

- ✅ No use of `console.log()` or inbuilt logging methods
- ✅ Maximum 5 URLs at once
- ✅ Default validity = 30 minutes if left blank
- ✅ Unique shortcodes; collisions handled
- ✅ Expired or invalid URLs are rejected with proper alerts
- ✅ Styling strictly with **Material UI** (no Tailwind, ShadCN, etc.)

---

## 🛠️ Functionality Overview

- **Input Fields**:
  - Long URL (required)
  - Validity (in minutes – optional)
  - Custom shortcode (optional)

- **Shortening Logic**:
  - If custom shortcode is missing, a random 6-character code is generated
  - Links are stored in `localStorage` with expiry

- **Redirection Flow**:
  - URL accessed via shortlink (e.g. `/abc123`)
  - Redirects to long URL if valid
  - Shows error and navigates home if expired or invalid

- **Statistics Page**:
  - Displays:
    - Original URL
    - Short URL
    - Expiry Time

---

## 🎨 UI & Styling

- Built using **Material UI (v5)** components:
  - `Container`, `Typography`, `TextField`, `Button`, `Grid`, `Box`
- Fully responsive and clean layout
- No use of Tailwind CSS or other utility libraries

---

## 🔍 Client-side Validation

- ✅ Long URL: Validated using the `URL` constructor
- ✅ Validity: Must be a positive number
- ✅ Custom Shortcode: Alphanumeric, unique
- ✅ All fields handled gracefully for empty/invalid states

---

## 🧪 Testing Environment

- Runs on: `http://localhost:3000`
- Built using:
  - React
  - React Router DOM
  - Material UI
- Stateless (no backend)
- Storage: `localStorage` (simulates persistence)
- Fully functional without internet or server
