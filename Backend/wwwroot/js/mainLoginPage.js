import builder from './Modules/builder.js';
import hostAddress from './Modules/hostaddress.js';
import Cookies from './Modules/cookies.js';

const hostaddress = new hostAddress;
const cookies = new Cookies; 

const contentContainer = document.getElementById('content-container');

function createLoginElements() {
    const build = new builder('content-container');
    const wrapper = build.createDiv('login-wrapper');
    const title = build.createH1('Arcane Conquest Hero\'s', 'login-title');
    const emailInput = build.createTextInput('email-input', 'E-Mail');
    const passwordInput = build.createTextInput('password-input', 'Password');
    const submitWrapper = build.createDiv('submit-wrapper');
    const loginButton = build.createButton('Login', 'login-button');
    const createNewAccountLink = build.createA('./createAccount.html', 'create-account-link');
    const createNewAccountButton = build.createButton('Create Account', 'create-new-account-btn');

    wrapper.appendChild(title);
    wrapper.appendChild(emailInput);
    wrapper.appendChild(passwordInput);
    submitWrapper.appendChild(loginButton);
    createNewAccountLink.appendChild(createNewAccountButton);
    submitWrapper.appendChild(createNewAccountLink);
    wrapper.appendChild(submitWrapper);
    contentContainer.appendChild(wrapper);
}

createLoginElements();

async function postUserLogin() {
    const url = `${hostaddress.address}/Login/UserLogin`;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
 
        const info = await response.json();

        if (response.ok) {
            cookies.setCookie('LoginStatus', true, 10);
            console.log(info);
        }
    } catch (error) {
       console.error(error.message);
    }
}

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    postUserLogin();
});
