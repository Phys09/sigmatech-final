# Sprint 1

**Team Name:** [SigmaTech]  
**Github:** [https://github.com/UTSCCSCC01/finalprojectw22-sigmatech]

---

## Sprint 1 goals:

Complete an early working version of the app that includes several features, including:
- User and transaction schemas
- Signing up
- Logging in
- Checking transaction history for user bank accounts

## User Stories to be completed for this Sprint:

- All 3 personas want to be able to see and interact the main home screen
- As a customer, Destyn wants to create an account
- All 3 personas want to be able to login / logout to their accounts
- As a customer, Destyn wants to be able to view his transaction history
- All 3 personas want to be able to edit their account details (change password, delete account)
- As a customer, Kendall wants to be able to apply for a loan/mortgage

## Participants for this Sprint:

- Michael Kwan
- Abtin Ghajarieh Sepanlou
- Peter Albu
- Xinlei Xu
- Tommy Zhang
- Juan-Pablo Moreno
- Aaron Brendan Huang

## Team Capacity

After the assignment of user story points on Jira, the group decided that of the 39 points present, 33 of them could confidently be done this sprint.

## User story decisions

- Michael Kwan
  - SIG-46 tasked me with creating the website's main homepage. It was created using react routing to setup the navigation, while being stylized using CSS. The choice of making this form first was because it is a foundational basis for the entire website. That is, it sets up the code format and later on, access to all other parts of the page.

- Abtin Ghajarieh Sepanlou
  - SIG-18 required me to create an interactive page for the user to create their account, so I created a form element that takes all the necessary inputs and passes it to the backend through the back-end function designed by Peter.
  
  - SIG-31 tasked me with obtaining transactions from the database, so I created endpoints for obtaining the user by username to obtain their user_id, which will be used to obtain their bank account information from a similar endpoint, which will be used to obtain their transactions from a final endpoint, all designed by me. This process will be stream-lined in future sprints.

- Peter Albu

  - SIG-30 tasked me with creating an account, so I used a POST endpoint with a few input variables. This will probably be updated later to include more sign-up information.
  - SIG-45 served as a basic demo for the full stack, I decided to use the built-in fetch() command for requests to the backend, and express to handle these requests. This ticket served as a foundation for other tickets so nothing very specific was done.

- Xinlei Xu

  - SIG-15 tasked me with creating the login page. I updated the react form pages into react components, and edited the navbar subroutine so that it's more reusable.
  - SIG-16 task was to create a edit acount details page. I added bootstrap form and buttons, and added css flexbox infrastructure. The ticket also acts as the starting point to the AccountDetails page for SIG-23.

- Tommy Zhang

- Juan-Pablo Moreno

- Aaron Brendan Huang
