import builder from '../Modules/builder.js';

const contentContainer = document.getElementById('content-container');

function createLoginElements() {
    const build = new builder(contentContainer);
    const wrapper = build.createDiv('login-wrapper');
    const title = build.createH1('Arcane Conquest Heros', 'login-title');
    const emailInput = build.createTextInput('email-input', 'E-Mail');
    const passwordInput = build.createTextInput('password-input', 'Password');
    const submitWrapper = build.createDiv('submit-wrapper');
    const loginButton = build.createButton('Login', 'login-button');
    const createNewAccountLink = build.createA('../html/createAccount.html', 'create-account-link');
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

