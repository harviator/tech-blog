document.querySelector('.form-signin').addEventListener('submit', function (event) {

    event.preventDefault();

    const username = document.querySelector('#username-login').value
    const password = document.querySelector('#password-login').value

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    console.log('This is the login!')
});