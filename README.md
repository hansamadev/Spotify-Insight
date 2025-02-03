# Spotify Insights 🎧

This project connects to the **Spotify API** to display your top artists and tracks over different time periods. It allows users to view their listening habits for the last 4 weeks, 6 months, or all-time. The app is built with **Express.js** for the backend and **Spotify Web API** for fetching data. 🎶

## Features 🌟

- View your most-played artists and tracks. 🔝
- Explore listening data for different time periods: short-term, medium-term, and all-time. ⏳
- Simple and responsive dashboard interface. 📱
- Dynamic content fetching using Spotify Web API. 🔄

## Installation ⚙️

Follow these steps to set up and run the project locally:

### Prerequisites 🔑

- **Node.js** (v14 or higher) installed on your machine.
- **Spotify Developer Account** to get the API credentials.

### Steps 🚀

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/spotify-insights.git
   cd spotify-insights
   ```

2. **Install the dependencies:**
   You'll need to install the required npm packages:

   - **Express** for setting up the server.
   - **spotify-web-api-node** for connecting to the Spotify Web API.

   Run the following command to install both dependencies:
   ```bash
   npm install --save express spotify-web-api-node
   ```

3. **Set up Spotify API credentials:**
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Create a new app to get your **Client ID** and **Client Secret**.
   - Replace the placeholders in `app.js` with your credentials:

   ```js
   const spotifyApi = new SpotifyWebApi({
       clientId: 'YOUR_CLIENT_ID',
       clientSecret: 'YOUR_CLIENT_SECRET',
       redirectUri: 'http://localhost:9000/callback'
   });
   ```

4. **Run the app:**
   Start the Express server:
   ```bash
   npm start
   ```

5. **Access the app:**
   Open your browser and go to `http://localhost:9000` to access the dashboard. 🌍

## Usage 💡

1. **Login with Spotify:**  
   Click the "Login with Spotify" button to authenticate and allow the app to fetch your top artists and tracks. 🎵

2. **View Data:**  
   After logging in, you will be able to explore your top artists and tracks based on different time ranges:
   - Last 4 weeks ⏰
   - Last 6 months 📅
   - All-time 🏆

## Technologies Used 🛠️

- **Express.js**: A web application framework for Node.js, used to handle the server-side logic and routing. 🌐
- **Spotify Web API**: A Node.js library to interact with the Spotify API and fetch user data. 🎧
- **HTML/CSS**: For creating the frontend design and layout of the dashboard. 💻
- **JavaScript**: For handling dynamic data fetching and displaying it on the dashboard. 📊

## License 📜

MIT License
