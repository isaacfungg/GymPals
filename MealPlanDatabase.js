class MealPlan {
    constructor(title, recipe, calories, protein) {
      this.title = title;
      this.recipe = recipe; 
      this.calories = calories;
      this.protein = protein;
    }
  
    get getTitle() {
      return this.title;
    }
  
    set setTitle(newTitle) {
      this.title = newTitle;
    }
  
    get getRecipe() { 
      return this.recipe;
    }
  
    set setRecipe(newRecipe) { 
      this.recipe = newRecipe;
    }
  
    get getCalories() {
      return this.calories;
    }
  
    set setCalories(newCalories) {
      this.calories = newCalories;
    }
  
    get getProtein() {
      return this.protein;
    }
  
    set setProtein(newProtein) {
      this.protein = newProtein;
    }
}
  
class MealPlanDatabase {
    constructor() {
      this.mealPlans = [];
      this.filePath = 'mealInfo.txt'; 
      this.readFromFile();
    }
  
    readFromFile() {
      try {
        const fileContents = fs.readFileSync(this.filePath, 'utf8');
        const data = fileContents.split('\n');
  
        for (const line of data) {
          const [title, recipesLine, calories, protein] = line.split(',');
          if (title && recipesLine && calories && protein) {
            const recipes = recipesLine.split(';').map((recipe) => recipe.trim());
            const mealPlan = new MealPlan(title, recipes, calories, protein);
            this.mealPlans.push(mealPlan);
          }
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  
    createMealPlan() {
      const title = readlineSync.question('Enter the meal plan title: ');
      const recipesStr = readlineSync.question('Enter recipes (separated by semicolons): ');
      const calories = readlineSync.question('Enter total calories: ');
      const protein = readlineSync.question('Enter total protein (grams): ');
  
      const recipes = recipesStr.split(';').map((recipe) => recipe.trim());
  
      const mealPlan = new MealPlan(title, recipes, calories, protein);
      this.mealPlans.push(mealPlan);
      this.writeToFile(mealPlan.toLine());
      console.log('Meal plan created successfully.');
    }
  
    writeToFile(formattedLine) {
      try {
        fs.appendFileSync(this.filePath, formattedLine + '\n', 'utf8');
      } catch (error) {
        console.error('Error writing to file:', error);
      }
    }
  }
  