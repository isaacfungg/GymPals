class WorkoutPlan {
    constructor(title, exerciseType, exercises) {
      this.title = title;
      this.exerciseType = exerciseType;
      this.exercises = exercises;
      
    }
  
    get getTitle() {
      return this.title;
    }
  
    set setTitle(newTitle) {
      this.title = newTitle;
    }
  
    get getExercises() {
      return this.exercises;
    }
  
    set setExercises(newExercises) {
      this.exercises = newExercises;
    }
  
    get getExerciseType() {
      return this.exerciseType;
    }
  
    set setExerciseType(newExerciseType) {
      this.exerciseType = newExerciseType;
    }

    toLine() {
        return `${this.title},${this.exerciseType},${this.exercises.join(";")}`;
      }
  
  }
  
  class WorkoutPlanDatabase {
    constructor() {
      this.workouts = [];
      this.filePath = "workoutInfo.txt"; 
      this.readFromFile();
    }
  
    readFromFile() {
      try {
        const fileContents = fs.readFileSync(this.filePath, "utf8");
        const data = fileContents.split("\n");
  
        for (const line of data) {
          const [title, exerciseType, exercisesLine] = line.split(",");
          if (title && exerciseType && exercisesLine) {
            const exercises = exercisesLine.split(";");
            const workout = new WorkoutPlan(title, exerciseType, exercises);
            this.workouts.push(workout);
          }
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  
    createWorkout() {
      const title = readlineSync.question("Enter the workout title: ");
      const exerciseType = readlineSync.question("Enter the exercise type: ");
      const exercisesStr = readlineSync.question("Enter exercises (separated by semicolons): ");
  
      const exercises = exercisesStr.split(";").map((exercise) => exercise.trim());
  
      const workout = new WorkoutPlan(title, exerciseType, exercises);
      this.workouts.push(workout);
      this.writeToFile(workout.toLine());
      console.log("Workout plan created successfully.");
    }
  
    writeToFile(formattedLine) {
      try {
        fs.appendFileSync(this.filePath, formattedLine + "\n", "utf8");
        console.log("Workout plan saved to file successfully.");
      } catch (error) {
        console.error("Error writing to file:", error);
      }
    }
  }