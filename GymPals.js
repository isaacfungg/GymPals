const AccountDatabase = require('./AccountDatabase.js');
const prompt = require("prompt-sync")();

const accountDatabase = new AccountDatabase();
//Signing in or Creating an Account
var loggedIn = false;
do {
    var answer = prompt("Would you like to create a new account(1) or login to an existing account(2)?");
    if (answer === '1') {
        accountDatabase.createAccount(); 
    } else if (answer === '2') {
        const username = prompt("Enter your username: ");
        const password = prompt("Enter your password: ");
        
        accountDatabase.login(username, password); 
    } else {
        console.log("Invalid choice.");
    }
} while(loggedIn)

function displayOptions() {
    var feature;

    console.log("--------------");
    console.log("   Story (1)  ");
    console.log("  Workout (2) ");
    console.log("   Meals (3)  ");
    console.log("--------------");
    var answer = prompt("Select one of the answers: ");
    switch(answer) {
        case '1': 
            feature = displayFeatures();
            break;
        case '2':
            feature = displayFeatures();
            break;
        case '3':
            feature = displayFeatures();
            break;
        default:
            console.log("That was not a valid option. ");
            break;
    }
} 

function displayFeatures() {
    console.log("--------------");
    console.log("    View (1)  ");
    console.log("    Post (2)  ");
    console.log("  Go Back (3) ");
    console.log("--------------");
    var answer = prompt("Enter which feature you would like to go to:");
    return answer
}





