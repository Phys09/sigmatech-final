# API Overview
| METHOD | ENDPOINT | DESCRIPTION | NOTES
| --- | --- | --: |--- |
| **GET** |  / | Get a list of all accounts from the backend | Will be deprecated |
| **GET** |  /list_accounts | Get a list of all accounts from the backend | Will be deprecated |
| **POST** |  /create_account | Create an account with form data | |
| **POST** |  /login | Check if form data matches with data from the backend | |
| **POST** |  /get_user | Get the details of the user profile | |
| **POST** |  /get_bank_account | Get the bank account belonging to the given user id | |
| **POST** |  /get_transactions | Get a list of transactions belonging to the given account | |

<br>
<br>

## GET /list_accounts
### Return Model
```
[
    [user1_aid, user1_username, user1_email, user1_password_hash, user1_phone_number],
    [user2_aid, user2_username, user2_email, user2_password_hash, user2_phone_number],
    ...
]
```

<br>
<br>

## POST /create_account
### Form Model
```
{
    "email": user_email,
    "password": user_password,
    "phonenum": user_phone_number,
    "username": user_username
}
```
### Return Model
```
200 Status or 400 Status
```
<br>
<br>

## POST /login
### Form Model
```
{
    "email": user_email,
    "passwd": user_passwd,
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user1_password, user1_phone_number]

or 400 status or 404 Status
```
## POST /get_user
### Form Model
```
{
    "username": user_username,
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user1_password, user1_phone_number]

or 400 status or 404 Status
```
## POST /get_bank_account
### Form Model
```
{
    "userId": user_Id 
}
```
### Return Model
```
[bankId, bank_type, bank_balance, bank_owner]

or 400 status or 404 Status
```
## POST /get_transactions
### Form Model
```
{
    "accountName": bank_account_name,
    "passwd": bank_account_owner_password
}
```
note: passwd must match the password of the user who owns the bank account, or be the secret admin password

### Return Model
```
[transaction_Id, transaction_amount, transactionTime, to_account, fomr_account, processed_status]

or 400 status or 404 Status
```
