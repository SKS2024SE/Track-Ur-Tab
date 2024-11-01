# TRACK UR TAB
A smart way to track your expenses

The user base for expense tracker software includes young professionals, students, families, and freelancers, all seeking better budget management and spending insights. From debt managers and savers to corporate teams and retirees, it cater to diverse needs by enabling shared expense tracking, goal setting, helping users make informed financial decisions.

Expense tracker software helps users improve financial awareness, manage budgets, track goals, reduce debt, and streamline shared expenses.For shared expenses, the app automatically adjusts balances to minimize the number of transactions needed, ensuring that everyone’s debts are settled efficiently.


[![Code Coverage](https://codecov.io/gh/AtharvaGole/XpensAuditor/branch/main/graphs/badge.svg)](https://codecov.io/gh/SKS2024SE/XpensAuditor/branch/main)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7402784.svg)](https://doi.org/10.5281/zenodo.7402784)
[![Collaborators](https://img.shields.io/badge/Collaborators-3-orange.svg?style=flat)](https://github.com/SKS2024SE/Track-Ur-Tab/graphs/contributors)
[![License](https://img.shields.io/badge/License-MIT-purple.svg?style=flat)](https://github.com/SKS2024SE/XpensAuditor/blob/main/LICENSE)
[![Language](https://img.shields.io/badge/Language-Java-blue.svg?style=flat)](https://github.com/SKS2024SE/XpensAuditor/search?l=java)
[![Documentation Status](https://readthedocs.org/projects/ansicolortags/badge/?version=latest)](https://github.com/SKS2024SE/XpensAuditor/blob/main/README.md)
[![GitHub Release](https://img.shields.io/github/release/AtharvaGole/XpensAuditor.svg)](https://github.com/SKS2024SE/XpensAuditor/releases)
[![Open Issues](https://img.shields.io/github/issues/AtharvaGole/XpensAuditor)](https://github.com/SKS2024SE/XpensAuditor/issues)
[![Build-And-Test](https://github.com/AtharvaGole/XpensAuditor/actions/workflows/android.yml/badge.svg)](https://github.com/SKS2024SE/XpensAuditor/actions/workflows/android.yml)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/AtharvaGole/XpensAuditor.svg)](https://img.shields.io/github/repo-size/SKS2024SE/XpensAuditor.svg)

#

 ## Project1 Features
 
 - This mobile application allows customers to add their expenses and keep track of them. 
 - Takes required minimal amount of data like the value of transaction, category of expenditure.
 - Each user needs to create/sign up to access the application, MongoDB is used to achieve authorization, authentication and accounting
 - The application keeps track of user data and stores it in the MongoDB realtime database
 - Register module is where user can update their details.
 
 ## Project1 Enhancement Features
 
 - Ability to create Groups and track group expenses. Split expenses proportionally, while reducing the total number of Transactions.
 - Expenditure Analytics for both Personal and Group expenditures.
 - Ability to create custom categories
 - A fresh cross platform compatible UI
 
## Track-Ur-Tab Features 

 - Ability to split expenses in group propotionally
 - Ability to calculate credit-debit of group expenses ( Who owes what )
 - Ability to assign the things identified from the previous step to the respective owners in group calculations

## Demo


## Scalability
Currently the application stores User and Group data on MongoDB Real-Time Database. Every smartphone with the app running needs to establish a connection to the database in order to sync data with the cloud. The app will run even without an internet connection, but in order to view the latest transactions of a group, you will need to query data from the database.

## License

 This project is licensed under the MIT License. See the [LICENSE](https://github.com/AtharvaGole/XpensAuditor/blob/main/LICENSE) file for details
 
## Tools used

- ReactNative
- Embedded Emulator/ USB debugging on android device

 
### Installation Instructions for React Native

### Step 1: Install Node.js  
Ensure you have [Node.js](https://nodejs.org/) installed on your machine. *(I used a Node.js pre-installer)*

### Step 2: Verify Node.js and npm Installation  
After installing Node.js, verify the installation by running the following commands in your terminal:

```cmd
node --version
npm --version
```

### Step 3: Install Expo CLI  
Expo CLI is required to run the React Native project. To install it globally, use:

```cmd
npm install -g expo-cli
```

### Step 4: Clone the Repository  
Clone the project repository to your local machine:

```cmd
git clone <repo-url>
```

### Step 5: Start the Project  
To start the project, navigate to the project folder and run:

```cmd
npx expo start
```
## Viewing the Application  
You have two options for viewing the application:

1. **Android Emulator:** Create an Android emulator using Android Studio's SDK.
2. **Expo Go App:** Download the [Expo Go app](https://expo.dev/client) from the Play Store or App Store.

Once you start the project, a QR code will be displayed in the terminal. Scan the QR code using the Expo Go app, and the project will run on your device.
 
## Test the application

 - Application has an existing test suite
 - Navigate to the folder of Android Test and right click and select "Run tests in ...."
 - It runs all the test cases in the package and provides the result and code coverage
 
## Team Members:

This repository is made for CSC 510 Software Engineering Course:

Members
 - Krithika Swaminathan ( kswamin3@ncsu.edu )
 - Sandhiya Shunmugavel ( sshunmu2@ncsu.edu )
 - Sanjaey Shunmuga Sundaram ( sshunmu@ncsu.edu )

Project Funding:
This project thrives on the passion and curiosity of its contributors. If you’re interested in supporting us, whether through financial contributions or by offering your skills and time, we’d love to hear from you! Please feel free to reach out and join us on this journey.

We promise technical support to anyone willing to contribute to the project.
