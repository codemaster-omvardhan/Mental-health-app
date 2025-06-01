# 🧠 Mental Health Daily Check-In App

A cross-platform mobile app built with **React Native** and **Firebase**, designed to help users monitor and improve their mental well-being through daily mood tracking, personalized insights, and mindfulness practices.

---

## 🚀 Features

- 🌤️ **Mood Check-In:**  
  Select your current mood using emoji-based input and receive a motivational or calming quote.

- 📈 **Mood Trends Visualization:**  
  View your mood history and trends over time using interactive charts with `react-native-chart-kit`.

- 🔖 **Bookmark Feature:**  
  Save favorite quotes or mindfulness exercises locally using `AsyncStorage` and `React Context`.

- 🔐 **Authentication System:**  
  Secure login and signup functionality using **Firebase Authentication**.

- 🧘 **Mindfulness & Relaxation:**  
  Access guided mindfulness tips and techniques to manage daily stress and improve focus.

- 👤 **User Profile & Logout:**  
  Manage user sessions and log out easily. Logout button placed intuitively at the end of the profile screen.

---

## 🧰 Tech Stack

- **Frontend:** React Native (with Expo)
- **Navigation:** Expo Router
- **Backend & Auth:** Firebase
- **State Management:** React Context
- **Storage:** AsyncStorage
- **Charts:** react-native-chart-kit
- **Styling:** Tailwind-like utility classes via custom styles

---

## 🛠️ Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/your-username/mental-health-checkin-app.git
cd mental-health-checkin-app

# Install dependencies
npm install

# Start Expo development server
npx expo start
