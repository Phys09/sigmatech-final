# API Overview
| METHOD | ENDPOINT | DESCRIPTION | NOTES
| --- | --- | --: |--- |
| **GET** |  /list_accounts | Get a list of all accounts from the backend | Will be deprecated |
| **POST** |  /create_account | Create an account with form data | |
| **POST** |  /login | Check if form data matches with data from the backend | |

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
    "passwd": user_passwd,
    "phonenum": user_phonenum
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
[user_aid, user_username, user_email, user_password_hash, user_phone_number], 400 Status, or 404 Status
```
