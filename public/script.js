// Web Audio API Smooth Touch Sound System
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function triggerSmoothSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
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

// Touch Event Listener & Auto Theme Light Switcher
const themes = ['theme-dark', 'theme-neon', 'theme-cyber'];
let themeIdx = 0;

document.addEventListener('click', (e) => {
    // যেকোনো ক্লিক বা টাচে সাউন্ড হবে
    triggerSmoothSound();

    // টাচ লাইটিং সুইচ
    if (e.target.classList.contains('touch-sound-trigger') || e.target.tagName === 'BUTTON') {
        themeIdx = (themeIdx + 1) % themes.length;
        document.body.className = themes[themeIdx];
    }
});

// Landing Page Transition
document.getElementById('enter-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
});

// Theme Switch Button
document.getElementById('theme-switcher').addEventListener('click', () => {
    themeIdx = (themeIdx + 1) % themes.length;
    document.body.className = themes[themeIdx];
});

// Feature Functions
function handleAiImage() {
    const prompt = document.getElementById('ai-input').value;
    if (!prompt) return alert('অনুগ্রহ করে ছবি বানানোর প্রম্পট লিখুন!');
    alert(`siyam.xx0 AI: "${prompt}" অনুযায়ী সুন্দর ছবি তৈরির কাজ চলছে...`);
}

function handleAiChat() {
    const prompt = document.getElementById('ai-input').value;
    if (!prompt) return alert('অনুগ্রহ করে আপনার প্রশ্নটি লিখুন!');
    alert(`siyam.xx0 AI উত্তর: "আপনার মেসেজটি প্রসেস করা হয়েছে।"`);
}

function handleVideoDownload() {
    const url = document.getElementById('downloader-url').value;
    if (!url) return alert('অনুগ্রহ করে সঠিক ভিডিও লিংক প্রদান করুন!');
    alert(`লিংক প্রসেস হচ্ছে... ভিডিও ডাউনলোড কিছুক্ষণের মধ্যে শুরু হবে!`);
}

function handleMediaSearch() {
    const query = document.getElementById('media-query').value;
    if (!query) return alert('ইউটিউব ভিডিও বা গানের নাম লিখুন!');
    alert(`siyam.xx0: "${query}" মিডিয়া ফাইল সার্চ করা হচ্ছে...`);
                         }
