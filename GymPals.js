const AccountDatabase = require('./AccountDatabase.js');
const { WorkoutPlanDatabase } = require('./WorkoutPlanDatabase.js');
const { MealPlanDatabase } = require('./MealPlanDatabase.js');
const { StoryDatabase } = require('./StoryDatabase.js'); 
const prompt = require("prompt-sync")();

//Declaring and Initializing the Databases
const accountDatabase = new AccountDatabase();
const workoutPlanDatabase = new WorkoutPlanDatabase();
const mealPlanDatabase = new MealPlanDatabase();
const storyDatabase = new StoryDatabase();
var loggedIn = false;

//Code
loginOrCreateAccount(accountDatabase);
while(loggedIn) {
  displayOptions();
}



function loginOrCreateAccount(accountDatabase) {
  do {
    var answer = prompt("Would you like to create a new account(1) or login to an existing account(2)?");
    if (answer === '1') {
      accountDatabase.createAccount();
    } else if (answer === '2') {
      const username = prompt("Enter your username: ");
      const password = prompt("Enter your password: ");

      if (accountDatabase.login(username, password)) {
        console.log("Successfully logged in ");
        loggedIn = true;
        return; 
      } else {
        console.log("Wrong password or username. Please try again. ");
      }
    } else {
      console.log("Invalid choice. Please select 1 or 2.");
    }
  } while (!loggedIn);
}



  function displayOptions() {
    console.log("--------------");
    console.log("   Story (1)  ");
    console.log("  Workout (2) ");
    console.log("   Meals (3)  ");
    console.log("   Log Out(4) ");
    console.log("--------------");
    var answer = prompt("Select one of the options: ");
    var feature;

    switch(answer) {
        case '1': 
            displayStoryFeatures();
            break;
        case '2':
            displayWorkoutPlanFeatures();
            break;
        case '3':
            displayMealPlanFeatures();
            break;
        case '4':
            loggedIn = false;
            break;
        default:
            console.log("Invalid option. Please select 1, 2, or 3.");
            break;
    }
}

function displayStoryFeatures() {
  feature = displayFeatures();
            switch (feature) {
                case '1':
                    storyDatabase.displayStories();
                    break;
                case '2':
                    storyDatabase.createStory();
                    break;
                case '3':
                    break;
                default:
                    console.log("Invalid feature selection.");
                    break;
            }
}

function displayWorkoutPlanFeatures() {
  feature = displayFeatures();
            switch (feature) {
                case '1':
                  workoutPlanDatabase.displayWorkouts();
                    break;
                case '2':
                  workoutPlanDatabase.createWorkout();
                    break;
                case '3':
                    break;
                default:
                    console.log("Invalid feature selection.");
                    break;
            }
}

function displayMealPlanFeatures() {
  feature = displayFeatures();
            switch (feature) {
                case '1':
                  mealPlanDatabase.displayMealPlans();
                    break;
                case '2':
                  mealPlanDatabase.createMealPlan();
                    break;
                case '3':
                    break;
                default:
                    console.log("Invalid feature selection.");
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





