const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Real AI Image Generator Endpoint (Pollinations API)
app.post('/api/generate-image', (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
    
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
    
    res.json({ success: true, imageUrl });
});

// 2. Real Universal Video Downloader Endpoint
app.post('/api/download-video', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const response = await axios.get(`https://api.cobalt.tools/api/json`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: { url: url }
        });
        
        if (response.data && response.data.url) {
            res.json({ success: true, downloadUrl: response.data.url });
        } else {
            res.status(500).json({ error: 'Could not fetch download link' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to process video link' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
