# SigmaTech Software

SigmaTech presents SigmaBank (name pending), an online banking website to manage your finances. SigmaBank provides a very simple and intuitive way to send money and view your financial history.

# Motivation

SigmaBank is a banking website with support for cross-country money transfers and detailed analytics. Managing money shouldn't be confusing, this app exists to help people get on top of their spending.

# Installation and Setup:

This project runs on a NODE.js w/ express backend and react frontend.

- Download libraries by running `npm install`.

- Start the frontend by running `npm run start-client`,

- Start the backend by running `npm run start-server`.

- A window should open up in your browser that will allow you to use the frontend application.

- OR: use `./run.sh` located in the root folder.

You will need to install postgres for this app to work. Create a database with username "postgres" and password "password" with all default configurations to begin.

Perform backend tests by importing the Insomnia file into Insomnia and running the test suite.
Perform frontend tests by [... add stuff here later]

Should the need arise, this README file will be updated with relevant information.

# Folder Structure

`routes`: for storing page files (eg. one file per figma sketch).

`components`: smaller react components, such as navbar, footer and stuff, that are **aimed to be reusable**.

# Contribution:

The master branch is used for product versions, representing working versions of the application. Periodic merges from the develop branch are done, but nothing else. The develop branch is used for feature additions without cluttering the master. The only changes allowed in develop are the merges from feature branches and bug fixes. Feature branches are named based on the user story they are implementing. These branches are pull requested and reviewed by a peer before being merged into the develop branch. Jira is used for ticketing issues.
