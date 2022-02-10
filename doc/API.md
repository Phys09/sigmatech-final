
test.md

# API Overview
| METHOD | ENDPOINT | DESCRIPTION | NOTES
| --- | --- | --: |--- |
| **GET** |  /get_accounts | Get a list of all accounts from the backend | Will be deprecated |
| **POST** |  /create_account | Create an account with form data | |

<br>
<br>

## GET /list_accounts
### Return Model
```
[
    [user1_email, user1_password, user1_phonenum],
    [user2_email, user2_password, user2_phonenum],
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