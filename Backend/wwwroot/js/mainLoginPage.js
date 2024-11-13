"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_js_1 = __importDefault(require("./Modules/builder.js"));
const hostaddress_js_1 = __importDefault(require("./Modules/hostaddress.js"));
const cookies_js_1 = __importDefault(require("./Modules/cookies.js"));
const hostaddress = new hostaddress_js_1.default;
const cookies = new cookies_js_1.default;
const contentContainer = document.getElementById('content-container');
function createLoginElements() {
    const build = new builder_js_1.default('content-container');
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
        if (response.ok) {
            cookies.setCookie('LoginStatus', true, 10);
            window.location.href = '/homePage.html';
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    postUserLogin();
});
window.onload = () => {
    console.log(document.cookie);
    if (cookies.getCookie('AuthToken', 1)) {
        window.location.href = '/homePage.html';
    }
};
//# sourceMappingURL=mainLoginPage.js.map