import builder from './Modules/builder.js';
import Hostaddress from './Modules/hostaddress.js';

const hostaddress = new Hostaddress;

window.onload = () => {
    createAccountSection();
    PostCreateNewAccount();
};

function returnToPreviousPage() {
    const contentContainer = document.getElementById('content-container');
    const build = new builder('content-container');

    const returnWrapper = build.createDiv('return-wrapper');
    const backButton = build.createA('./login.html');
    backButton.innerText = 'Back';

    returnWrapper.appendChild(backButton);
    contentContainer.appendChild(returnWrapper);
}

function createAccountSection() {
    returnToPreviousPage();

    const contentContainer = document.getElementById('content-container');
    const build = new builder('content-container');

    const inputClasses = 'input-feild'

    const createAccountWrapper = build.createDiv('create-account-wrapper');
    const createUsername = build.withClassCreateTextInput('create-username', 'Username', inputClasses);
    const emailInput = build.withClassCreateTextInput('email-input', 'E-Mail', inputClasses);
    const passwordOne = build.withClassCreateTextInput('password-one', 'Password', inputClasses);
    const passwordTwo = build.withClassCreateTextInput('password-two', 'Re-enter Password', inputClasses);
    const submitButton = build.createButton('Create Account', 'create-account-button');

    createAccountWrapper.appendChild(createUsername);
    createAccountWrapper.appendChild(emailInput);
    createAccountWrapper.appendChild(passwordOne);
    createAccountWrapper.appendChild(passwordTwo);
    createAccountWrapper.appendChild(submitButton);
    contentContainer.appendChild(createAccountWrapper);
}

function PostCreateNewAccount() {
    const url = `${hostaddress.address}/Login`;
    const createAccountButton = document.getElementById('create-account-button');

    createAccountButton.addEventListener('click', () => {    
        const username = document.getElementById('create-username').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-one').value;
        const passwordtwo = document.getElementById('password-two').value;

        if (password === passwordtwo) {
            newAccountPost(url, username, email, password);
        }
    });
}

async function newAccountPost(url, username, email, password) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": password
            })
        });

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        if (response.ok) {
            window.location.href = `${hostaddress.address}/login.html`
        }

    } catch (error) {
       console.error(error.message);
    }
}
