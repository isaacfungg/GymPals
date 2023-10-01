class Story {

    constructor(title, text) {
      this._title = title;
      this._text = text;
    }
    
    get getTitle() {
      return this._title;
    }
    
    set setTitle(newTitle) {
      this._title = newTitle;
    }
    
    get getText() {
      return this._text;
    }
    
    set setText(newText) {
      this._text = newText;
    }

    toLine() {
        return `${this._title},${this._text}`;
      }

  }

  class StoryDatabase {
    constructor() {
      this.stories = [];
      this.filePath = "storyInfo.txt"; // Define the file path here
      this.readFromFile();
    }
  
    readFromFile() {
      try {
        const fileContents = fs.readFileSync(this.filePath, "utf8");
        const data = fileContents.split("\n");
  
        for (const line of data) {
          const [title, text] = line.split(",");
          if (title && text) {
            const story = new Story(title, text);
            this.stories.push(story);
          }
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  
    createStory() {
      const title = readlineSync.question("Enter the story title: ");
      const text = readlineSync.question("Enter the story text: ");
  
      const story = new Story(title, text);
      this.stories.push(story);
      this.writeToFile(story.toLine());
      console.log("Story created successfully.");
    }
  
    writeToFile(formattedLine) {
      try {
        fs.appendFileSync(this.filePath, formattedLine + "\n", "utf8");
      } catch (error) {
        console.error("Error writing to file:", error);
      }
    }
  }
  