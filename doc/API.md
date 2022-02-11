# API Overview
| METHOD | ENDPOINT | DESCRIPTION | NOTES
| --- | --- | --: |--- |
| **GET** |  / | Get a list of all accounts from the backend | Will be deprecated |
| **GET** |  /list_accounts | Get a list of all accounts from the backend | Will be deprecated |
| **POST** |  /create_account | Create an account with form data | |
| **POST** |  /login | Login to an account with form data | |
| **POST** |  /get_user | Obtains a specific user's information | |
| **POST** |  /get_bank_account | Obtains user's bank account information | |
| **POST** |  /get_transactions | Obtains transaction information for a bank account | |

<br>
<br>

## GET /list_accounts
### Return Model
```
[
    [user1_id, user1_username, user1_email, user1_type, user1_password_hash, user1_phone_number],
    [user2_id, user2_username, user2_email, user2_type, user2_password_hash, user2_phone_number],
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
## POST /login
### Form Model
```
{
    "email": user_email,
    "passwd": user_password,
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
    "userId": user_user_Id 
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user1_password, user1_phone_number]

or 400 status or 404 Status
```
## POST /get_transactions
### Form Model
```
{
    "email": user_email,
    "passwd": user_password,
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user1_password, user1_phone_number]

or 400 status or 404 Status
```