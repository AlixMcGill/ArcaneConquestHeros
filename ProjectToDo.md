# Project To Do schema

- Init Setup Electron App ********** -- no longer using electron

- Init Setup dotnet backend -- ** 

- database schemas -- **
    - users
        - id
        - email
        - username
        - password

- Create account login on startup -- **
    - enter email
    - create username (must not already be in use)
    - create password (must be salted and hashed)
    - email a confimation number to user and have them input to authenticate their accout
    - after confrimation is completed save user information to database and allow a login attempt
    - after login return a jwt for auth

- Homepage / mainpage
    - Campaign
    - Ai battle
    - multiplayer
    - account
    - settings

- Account page what should all users have access to
    - Inventory
        - decks
        - Hero Cards
        - Item Cards

- ai battle

should be based on average card levels

    - easy
        - 2 lvl
    - meduim
        - same lvls
    - hard
        - +2 lvls

- campaign

- peer to peer Multiplayer (Look into websockets)


- under ai card generation update probabilities to have some randomness in the probability by 0.1 to 0.3 +- 
run checks to ensure that total probaliliies for card stats do not exceed 100% and subtract off any amound above that
