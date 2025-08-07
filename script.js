document.getElementById('briefingForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusDiv = document.getElementById('status');
    const resultsDiv = document.getElementById('results');

    // **IMPORTANT:** Replace this URL with your PythonAnywhere API endpoint
    const API_URL = 'https://brandzlank.pythonanywhere.com'; 

    statusDiv.textContent = 'Requesting briefing... This may take a moment.';
    resultsDiv.style.display = 'none';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            statusDiv.textContent = '';
            
            document.getElementById('sfrCode').textContent = data.sfr_code;
            document.getElementById('localTime').textContent = data.local_time;
            document.getElementById('pdfLink').href = data.pdf_download_url;

            resultsDiv.style.display = 'block';

        } else {
            statusDiv.textContent = 'Error: ' + (data.error || 'Unknown error occurred.');
            console.error('API Error:', data.error_log || data.error);
        }
    } catch (error) {
        statusDiv.textContent = 'Network error. Please check the console for details.';
        console.error('Fetch error:', error);
    }
});