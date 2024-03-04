document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.btn-outline-light');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username || !password) {
            alert('Please complete all fields');
            return;
        }

        const data = {
            username: username,
            password: password,
        };

        fetch('http://127.0.0.1:3000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            alert('Login successful!');
            window.location.href = 'jadwal.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed. Check your username and password.');
        });
    });
});
