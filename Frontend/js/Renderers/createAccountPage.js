import builder from '../Modules/builder.js';

function returnToPreviousPage() {
    const contentContainer = document.getElementById('content-container');
    const build = new builder('content-container');

    const returnWrapper = build.createDiv('return-wrapper');
    const backButton = build.createA('../html/index.html');
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

createAccountSection();
