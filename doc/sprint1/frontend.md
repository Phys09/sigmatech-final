# Frontend documentation

The frontend is implemented with react and javascript, partially incorporated with bootstrap.css and flexbox:


## Folder Structure
`public`: public resources that should be commonly re-usable

`src/routes`: for storing page files (eg. one file per figma sketch).
- `CreateAccountForm.js`: SIG18  creating account for users
- `EditAccountDetails.js`: SIG16 edit/delete user details
- `LoginForm.js`: SIG15 user log in 
- `Transactionhistory.js`: SIG19 transaction history


`src/components`: smaller react components, such as navbar, footer and stuff, that are **aimed to be reusable**.

`src/css`: css files for different components & routes


`app.js`: homepage
`index.js`: routing other pages
