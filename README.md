# TRACK UR TAB
a smart way to track your expenses

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
 - Takes required minimal amount of data like date of transaction, product name and value
 - Each user needs to create/sign up to access the application, MongoDB is used to achieve authorization, authentication and accounting
 - The application keeps track of user data and stores it in the MongoDB realtime database
 - Profile set up module is where user can update their details 
 - Account Settings are available to change passwords, send password reset email
 
 ## Project1 Enhancement Features
 
 - Ability to create Groups and track Group expenses
 - Analytics for Users and Groups
 - Push Notifications when Group Transactions are created
 - Sorting Transactions by Date, Amount, Category and Memo
 - Ability to view past transactions of previous months
 - Ability to create custom categories
 - UI refresh
 
## Track-Ur-Tab Features 

 - Ability to split expenses in group propotionally
 - Ability to calculate credit-debit of group expenses ( Who owes what )
 - Ability to assign the things identified from the previous step to the respective owners in group calculations

## Demo


## Scalability
Currently the application stores User and Group data on MongoDB Real-Time Database. Every smartphone with the app running needs to establish a connection to the database in order to sync data with the cloud. The app will run even without an internet connection, but in order to view the latest transactions of a group, you will need to query data from the database. T

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

