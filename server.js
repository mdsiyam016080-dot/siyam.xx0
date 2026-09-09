const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Rate Limiting (সাইট ক্র্যাশ করা থেকে বাঁচাতে)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ১৫ মিনিট
    max: 100, // প্রতিটি IP সর্বোচ্চ ১০০টি রিকোয়েস্ট পাঠাতে পারবে
    message: { error: 'অতিরিক্ত রিকোয়েস্ট পাঠিয়েছেন। অনুগ্রহ করে ১৫ মিনিট পর আবার চেষ্টা করুন।' }
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));

// Secure Admin Route
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const adminPass = process.env.ADMIN_PASSWORD || 'siyam123';
    
    if (password === adminPass) {
        res.json({ success: true, token: 'siyam-secure-admin-token' });
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized Access' });
    }
});

// AI Image Generator Endpoint
app.post('/api/generate-image', (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
    
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
    
    res.json({ success: true, imageUrl });
});

// AI Video Generator Endpoint (New Feature)
app.post('/api/generate-video', (req, res) => {
    const { prompt, style } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    // AI Prompt Customization for Video Themes
    const videoPrompt = encodeURIComponent(`${prompt}, ${style || 'romantic animation'}, high quality, 4k`);
    const videoUrl = `https://image.pollinations.ai/prompt/${videoPrompt}?width=1280&height=720&model=flux&nologo=true`;

    res.json({ success: true, videoUrl });
});

// Universal Video Downloader Endpoint
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

// Serve 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});
