# API Overview
| METHOD | ENDPOINT | DESCRIPTION | NOTES
| --- | --- | --: |--- |
| **GET** |  / | Get a list of all accounts from the backend | Will be deprecated |
| **GET** |  /list_accounts | Get a list of all accounts from the backend | Will be deprecated |
| **POST** |  /create_account | Create an account with form data | |
| **POST** |  /login | Check if form data matches with database and sends security code to email | |
| **POST** |  /edit_account | Edit an account with form data if form data matches with database  | |
| **POST** |  /shutdown_account | Set an account to shutdown mode if form data matches with database | |
| **POST** |  /reactivate_account | Revert an account from shutdown mode | |
| **POST** |  /get_user | Get the details of the user profile | |
| **POST** |  /get_owner | Get the user account belonging to the given bank account id | |
| **POST** |  /get_bank_account | Get the bank account belonging to the given user id | |
| **POST** |  /get_transactions | Get a list of transactions belonging to the given account | |
| **GET** |  /get_timestamp | Get the current timestamp | |
| **POST** |  /make_transaction | Creates a transaction with form data | |
| **POST** |  /complete_transaction | Updates a transaction with the given id and password | |
| **POST** |  /get_stats | Get a list of all system-related historical stats (signup, login, transfer)  | |
| **POST** |  /setup_automatic_payment | Creates an automatic transaction with form data  | |
| **POST** |  /stop_automatic_payment | Deletes an automatic transaction  | |
| **GET** |  /currency | Get the names and values of all currencies | |
| **POST** |  /currency | Add new currency | |
| **POST** |  /verify_security_code | Verifies form data and security code | |

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
    "passwd": user_passwd
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user_password, user_phone_number]

or 400 Status or 404 Status
```

<br>
<br>

## POST /edit_account
### Form Model
```
{
    "aid": user_aid,
    "newUsername": user_username,
    "newEmail": user_email,
    "newPasswd": user_password,
    "newPhonenum": user_phone_number,
    "oldPasswd": user_old_password
}
```
### Return Model
```
200 Status or 400 Status or 404 Status
```

<br>
<br>

## POST /shutdown_account
### Form Model
```
{
    "aid": user_aid,
    "oldPasswd": user_password
}
```
### Return Model
```
200 Status or 400 Status or 404 Status
```

<br>
<br>

## POST /reactivate_account
### Form Model
```
{
    "aid": user_aid,
}
```
### Return Model
```
200 Status or 400 Status or 404 Status
```

<br>
<br>

## POST /get_user
### Form Model
```
{
    "username": user_username
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user_password, user_phone_number]

or 400 status or 404 Status
```

<br>
<br>

## POST /get_owner
### Form Model
```
{
    "bid": bankId
}
```
### Return Model
```
[user_Id, user_username, user_email, user_type, user_password, user_phone_number]

or 400 status or 404 Status
```

<br>
<br>

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

<br>
<br>

## POST /get_transactions
### Form Model
```
{
    "accountName": bank_account_name,
    "passwd": bank_account_owner_password
}
```
Note: passwd must match the password of the user who owns the bank account, or be the secret admin password

### Return Model
```
[transaction_Id, transaction_amount, transactionTime, to_account, form_account, processed_status]

or 400 status or 404 Status
```

<br>
<br>

## GET /get_timestamp
### Return Model
```
[current_timestamp]
```

<br>
<br>

## POST /make_transaction
### Form Model
```
{
    senderId: bank_account_id,
    receiverId: bank_account_id,
    amount: amount,
    timestamp: current_timestamp,
    ownerId: user_id
}
```
### Return Model
```
200 status or 404 Status
```

<br>
<br>

## POST /complete_transaction
### Form Model
```
{
    transactionId: transaction_id,
    passwd: transaction_password,
}
```
### Return Model
```
200 status or 400 status or 404 status
```

<br>
<br>

## POST /get_stats
### Form Model
```
{
    passwd: admin_password
}
```
### Return Model
```
[
    (stat1id, stat1description, stat1stamp),
    (stat2id, stat2description, stat2stamp)
]
```

<br>
<br>

## POST /setup_automatic_payment
### Form Model
```
{
    "ownerId": user_aid,
    "senderId": bankId (take from),
    "receiverId": bankId (give to),
    "amount": transfer_amount,
    "recurring": one-time (false) or monthly (true),
    "paymentDate": payment_date
}
```
### Return Model
```
200 Status or 400 Status or 404 Status
```

<br>
<br>

## POST /stop_automatic_payment
### Form Model
```
{
    "aid": automaticPaymentID
}
```
### Return Model
```
200 Status or 400 Status or 404 Status
```
<br>
<br>



## GET /currencies
### Return Model
```
[curencies] 
```

<br>
<br>

## POST /currencies
### Form Model
```
{
    value: value,
    name: name,
}
```
### Return Model
```
200 status or 404 Status
```

<br>
<br>

## POST /verify_security_code
### Form Model
```
{
    email: user_email,
    passwd: user_password,
    code: security_code
}
```
### Return Model
```
200 status or 400 status or 404 Status
```

<br>
<br>
