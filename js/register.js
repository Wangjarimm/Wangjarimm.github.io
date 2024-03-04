document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.querySelector('.btn-outline-light');
    const namalengkapInput = document.getElementById('nama_lengkap');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    signUpButton.addEventListener('click', function () {
        const nama_lengkap = namalengkapInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!nama_lengkap || !username || !password) {
            alert('Please complete all fields');
            return;
        }

        const data = {
            nama_lengkap: nama_lengkap,
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
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    });
});
