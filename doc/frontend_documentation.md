# Frontend documentation


The front end is a react app utilizing react routers to navigate to different parts of the page, and CSS to stylize the page. Below, a high level overview will be given roughly describing the architecture of the code, and how files are organized.

The frontend is implemented with react and javascript, partially incorporated with bootstrap.css and flexbox:


## Folder Structure
`public`: public resources that should be commonly re-usable

`src`: Inside the app's src file, there are 3 main folders, css, routes, and components

`src/routes`: This folder stores the formatting/jsx of the entire page. It uses components stored in the components folder to generate the formatting of the page.
- `CreateAccountForm.js`: SIG18  creating account for users
- `EditAccountDetails.js`: SIG16 edit/delete user details
- `LoginForm.js`: SIG15 user log in 
- `Transactionhistory.js`: SIG19 transaction history


`src/components`: This holds small parts, 'proper subsets' of code of sorts, that are called and used by the routes. They can be hotswapped out by the page as necessary. The smaller react components, such as navbar, footer and stuff, that are **aimed to be reusable**.

`src/css`: css files for different components & routes. This folder holds css styling for each of the pages. Every page has a dedicated css file for that one page, and the App.css file is used for 'global' styling

`app.js`: homepage

`index.js`: routing other pages


## Adding Component onto existing page

use `src/components/blank-component` for examples.

