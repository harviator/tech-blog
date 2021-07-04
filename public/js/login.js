// const { response } = require("express");
const signinFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

// document.querySelector('.form-signin').addEventListener('submit', function (event) {

//     event.preventDefault();

//     const username = document.querySelector('#username-login').value
//     const password = document.querySelector('#password-login').value

//     fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             username: username,
//             password: password
//         })
//     });

//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }

//     console.log('This is the login!')
// });

document
    .querySelector('.form-signin')
    .addEventListener('submit', signinFormHandler);