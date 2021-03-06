# Release Planning Meeting #

## How the meetings were held ##

The planning meeting for the first sprint was held on Feb 01 2022 at 7:30 pm with all group members to prioritize the backlog.
All members were present, and assigned a user story to complete.

## Release Goal ##

The goal of this first release is to get the initial website up and going.
The website must be initially structured in order to support new additions (pages, etc...)
later on down the line when features are added.

In particular, we need to setup the database, the ability to access the database, the website to have
new pages, and the ability to add webpage elements. From there, we get a foundational basis upon which
we can work, adding new features more easily.

## Which User Stories Should be Used? ##

In particular, we chose the following user stories to complete in order to accomplish the above release goal for sprint 1. Each task is broken down into subtasks

- SIG 46 [FRONT] All 3 personas want to be able to see and interact the main home screen
- SIG 45 [BACK] All 3 personas want to be able to see and interact the main home screen
  - Setup postgres to be used as DB
  - Setup convenient functions to call endpoints from frontend to backend
  - Setup demo endpoints to test connection
- SIG-18 [FRONT] As a customer, Destyn wants to create an account
  - Create a link back to the homepage, once routing and homepage are setup
  - Add css files for CreateAccountForm and modify existing CreateAccountForm.js file to remove warnings and display information better
  - Modify App.css to include logo formatting for entire website
- SIG-30 [BACK] As a customer, Destyn wants to create an account
  - "create_account" POST endpoint
  - "list_accounts" GET endpoint
  - Write tests for creating and listing accounts
- SIG-15 [FRONT] All 3 personas want to be able to login / logout to their accounts
  - Login page 
  - Logout page
  - CSS & bootstrap integration
- SIG-43 [BACK] All 3 personas want to be able to login / logout to their accounts
  - "login" POST endpoint
  - App remembers client info from login
  - Add functionality to logout button
- SIG-19 [FRONT] As a customer, Destyn wants to be able to view his transaction history
  - Basic frontend logic for transaction history
  - Add CSS to make transaction history look nice
  - Connect frontend [SIG-19] to backend [SIG-31]
- SIG-31 [BACK] As a customer, Destyn wants to be able to view his transaction history
  - Add endpoint to server.js for obtaining user information
  - Add endpoint to server.js for obtaining bank account information
  - Add endpoint to server.js for obtaining transaction information 
- SIG-16 [FRONT] All 3 personas want to be able to edit their account details (change password, delete account)
- SIG-44 [BACK] All 3 personas want to be able to edit their account details (change password, delete account)
  - "edit_account" PUT endpoint
  - "delete_account" DELETE endpoint
  - Connect backend to frontend
- SIG-47 [Database] Create user schema
  - Create user.ddl
  - update drop.ddl to drop user schema
- SIG-48 [Database] Create transaction schema
  - Create transaction.ddl
  - update drop.ddl to drop transaction schema
These all play a part in making the first initial website, and without them being completed, the rest of the work cannot be done.

## Participants ##

All members of the project have been assigned approximately 5-6 points for this sprint. As a result, all members
are participating in this first sprint to get the initial release completed.
