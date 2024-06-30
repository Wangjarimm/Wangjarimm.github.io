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

        fetch('https://130.162.195.228/mhs714220011/login', {
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
            localStorage.setItem('token', result.token);
            console.log(result);
            alert('Login successful!');
            window.location.href = 'index_doktor.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed. Check your username and password.');
        });
    });
});
