const express = require('express');
const app = express();
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');

// Spotify API credentials
const spotifyApi = new SpotifyWebApi({
    clientId: '      ', // Spotify Developer Dashboard'dan aldığınız Client ID
    clientSecret: '       ', // Spotify Developer Dashboard'dan aldığınız Client Secret
    redirectUri: 'http://localhost:9000/callback' // Spotify Developer Dashboard'da ayarladığınız Redirect URI 
});

// Statik dosyaları sun
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Spotify'a yönlendirme
app.get('/login', (req, res) => {
    const scopes = [
        "user-top-read",
        "user-read-recently-played",
        "user-read-private",
        "user-read-email"
    ];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL); // Spotify'a yönlendir
});

// Callback endpoint
app.get('/callback', (req, res) => {
    const code = req.query.code;

    spotifyApi.authorizationCodeGrant(code).then((response) => {
        const accessToken = response.body.access_token;
        const refreshToken = response.body.refresh_token;

        // Token'ları ayarla
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        // Dashboard'a yönlendir
        res.redirect('/dashboard');
    }).catch((err) => {
        console.error('Error getting tokens:', err);
        res.send('Error getting tokens');
    });
});

// Dashboard sayfası
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Top items endpoint
app.get('/top-items', async (req, res) => {
    const timeRange = req.query.time_range || 'medium_term';

    try {
        const topArtists = await spotifyApi.getMyTopArtists({ time_range: timeRange, limit: 10 });
        const topTracks = await spotifyApi.getMyTopTracks({ time_range: timeRange, limit: 10 });

        res.json({
            topArtists: topArtists.body.items,
            topTracks: topTracks.body.items
        });
    } catch (err) {
        console.error('Error fetching top items:', err);
        res.status(500).send('Error fetching top items');
    }
});

// Uygulamayı başlat
app.listen(9000, () => {
    console.log('Uygulama http://localhost:9000 adresinde çalışıyor');
});