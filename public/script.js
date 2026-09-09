document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const appScreen = document.getElementById('app-screen');

    // UI Navigation
    if(enterBtn) {
        enterBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
            appScreen.classList.remove('hidden');
        });
    }
});

// AI Video Generation Handler
async function handleAiVideo() {
    const prompt = document.getElementById('video-prompt')?.value;
    if (!prompt) return alert('ভিডিও বানানোর জন্য বিবরণ লিখুন!');

    alert('ভিডিও প্রসেসিং শুরু হয়েছে... অনুগ্রহ করে ১০-১৫ সেকেন্ড অপেক্ষা করুন।');

    try {
        const response = await fetch('/api/generate-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt, style: 'romantic dynamic characters' })
        });
        const data = await response.json();

        if (data.success) {
            window.open(data.videoUrl, '_blank');
        } else {
            alert('ভিডিও তৈরি করতে সমস্যা হয়েছে!');
        }
    } catch (err) {
        alert('সার্ভারে যোগাযোগ করা যাচ্ছে না!');
    }
}

// Universal Downloader Handler
async function handleVideoDownload() {
    const url = document.getElementById('downloader-url').value;
    if (!url) return alert('ভিডিওর সঠিক লিংক প্রদান করুন!');

    try {
        const response = await fetch('/api/download-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();

        if (data.success && data.downloadUrl) {
            window.location.href = data.downloadUrl;
        } else {
            alert('লিংক প্রসেস করা সম্ভব হয়নি!');
        }
    } catch (err) {
        alert('ডাউনলোড ফাইল পেতে ব্যর্থ হয়েছে!');
    }
}
