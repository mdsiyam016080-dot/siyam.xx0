// Web Audio API Sound Generator
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function triggerSmoothSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
}

// Touch & Theme Light Switcher
const themes = ['theme-dark', 'theme-neon', 'theme-cyber'];
let themeIdx = 0;

document.addEventListener('click', (e) => {
    triggerSmoothSound();
    if (e.target.classList.contains('touch-sound-trigger') || e.target.tagName === 'BUTTON') {
        themeIdx = (themeIdx + 1) % themes.length;
        document.body.className = themes[themeIdx];
    }
});

document.getElementById('enter-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
});

// REAL AI Image Generator
async function handleAiImage() {
    const prompt = document.getElementById('ai-input').value;
    if (!prompt) return alert('একটি প্রম্পট লিখুন!');
    
    alert('এআই ইমেজ জেনারেট হচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন...');
    
    try {
        const res = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        
        if (data.success) {
            window.open(data.imageUrl, '_blank');
        } else {
            alert('ছবি তৈরি করতে সমস্যা হয়েছে!');
        }
    } catch (e) {
        alert('সার্ভার এরর!');
    }
}

// REAL AI Chat
function handleAiChat() {
    const prompt = document.getElementById('ai-input').value;
    if (!prompt) return alert('প্রম্পট লিখুন!');
    window.open(`https://chat.openai.com/?q=${encodeURIComponent(prompt)}`, '_blank');
}

// REAL Video Downloader
async function handleVideoDownload() {
    const url = document.getElementById('downloader-url').value;
    if (!url) return alert('ভিডিও লিংক পেস্ট করুন!');
    
    alert('ডাউনলোড লিংক তৈরি করা হচ্ছে...');
    try {
        const res = await fetch('/api/download-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await res.json();
        if (data.downloadUrl) {
            window.open(data.downloadUrl, '_blank');
        } else {
            alert('ভিডিও প্রসেস করা সম্ভব হয়নি, অন্য লিংক ট্রাই করুন।');
        }
    } catch (e) {
        alert('ডাউনলোড সার্ভিস বর্তমানে ব্যস্ত।');
    }
}

// Youtube Search
function handleMediaSearch() {
    const query = document.getElementById('media-query').value;
    if (!query) return alert('সার্চ কিওয়ার্ড লিখুন!');
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
}
