// sse.js

const eventSource = new EventSource('/progress');
eventSource.onmessage = (event) => {
    const progressData = JSON.parse(event.data);
    if (progressData.complete) {
        window.location.href = '/confirmation';
    }
};
