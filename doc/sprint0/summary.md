# Summary

## Project objectives

This project creates a bank management application where users can make an account to do things such as
storing money, making payments, and applying for a loan.

This piece of software will have all the usual functions that one would expect from online banking such as
applying for a loan, the ability to store money in accounts, as well as transfer money in general.

In addition, employees/employers can use this application to manage accounts, help customers, and see
banking statistics (total spending in a year, money flow rate, number of users, etc...)

Bank managers can access employer information, and see manage/view their employee profile, as well as
potentially arrange meetings, hold events, etc...

## Key Users/Personas

The personas are likely to be of one of the following types below.
The customer (can transfer money, make account, etc...)
The employees (data scientists, customer support...)

A specific instance could be the customer, Karen.
Karen is a 34-year-old mother of 2 children. She, like many others, has bills to pay, and would like to easily
do her banking in the comforts of her own home, with her husband, as they create a financial plan together.
They are also in need of a new house. A bigger one in which their family can live and grow up. In addition,
they both wish to financially plan for the future, and would like to have the option to invest later on in life.

Liam is a manager at a bank. He wants to be able to easily assign tasks to his employees in various parts of the bank.
Additionally, he wishes for every employee to be able to easily get their work done in a timely and efficient manner.
The customer support team needs to be able to easily get their tickets while respond quickly, the data analysis team
needs easy access to data from the bank for analysis purposes, the IT department would like to easily be able to diagnose
issues with the software should parts of it go down. Finally, as an extension of the previous sentence, advisor-like employees
should be able to easily meet with customers to give advice, and information.
The manager would also like to benefit from the ability to alloy customers to visit an FAQ/pre-recorded/live video to convey
information to the customers.

## Key Usage Scenarios

The first scenario is one that the IT department would have.
Noah works in IT at the bank. One day, he's called in because the bank application isn't working as intended.
A customer had an issue with accessing one of the video information sessions. Using the bank application's diagnostics
capabilities, he is able to easily realize that a video hosting platform has changed their API, breaking access to the video embedded.

The second scenario is one that the data analysis team would have.
In order to judge customer satisfaction, the users of the application need to be surveyed. This requires the creation, deployment, and storage of
data from surveyed individuals. After the survey is created, they would be able to be sent out to the users of the application. (employee, or customer)
Then the data can be analyzed, summarized, and then presented.

The last scenario is for a typical user.
A student is trying to use the banking application in order to manage money, and plan for the future. However, he is well aware that
he has a bit of a spending problem, especially on food. The banking application can analyze spending habits, and inform/notify him of his
higher-than-normal spending, should he end up doing so.

## Key Principles

This software must be practical, intuitive, and fast (enough) to serve customer needs.
In addition, the code must be well kept/maintained/readable, even if it may end up being a little bit slower. (Example: O(n) instead of O(logn) can be fine)

The software should be separated into different parts that make up the entire banking application. Each part is responsible for a small
portion of the software, allowing the managers to disable certain parts of the application in case it goes down, or certain users need to be restricted.
In addition, it will be easier to implement/code/debug this parts if they stay as 'modules.'
