const fs = require("fs");
const readlineSync = require("readline-sync");

class Account {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

class AccountDatabase {
  constructor() {
    this.accounts = [];
    this.filePath = "accountInfo.txt";
    this.readFromFile(this.filePath); 
  }

  readFromFile(filePath) {
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = fileContents.split("\n");

      for (const line of data) {
        const [username, password] = line.split(",");
        if (username && password) {
          const account = new Account(username, password);
          this.accounts.push(account);
        }
      }

      console.log("Accounts loaded from file.");
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }

  createAccount() {
    let username;
    let password;

    do {
      username = readlineSync.question("Enter a username: ");

    if (this.isUsernameTaken(username)) {
      console.log("Username is already taken. Please choose another.");
      }
    } while (this.isUsernameTaken(username));

    do {
      password = readlineSync.question("Enter a password (at least 8 characters): ", {
        hideEchoBack: true,
      });

      if (password.length < 8) {
        console.log("Password must be at least 8 characters long.");
      }
    } while (password.length < 8);

    const account = new Account(username, password);
    this.accounts.push(account);
    console.log("Account created successfully.");
    this.writeToFile(account);
  }

  isUsernameTaken(username) {
    return this.accounts.some((account) => account.getUsername() === username);
  }

  login(username, password) {
    return this.accounts.find((acc) => acc.getUsername() === username && acc.getPassword() === password);
  }

  writeToFile(account) {
    try {
      const formattedLine = `${account.getUsername()},${account.getPassword()}`;
      fs.appendFileSync(this.filePath, formattedLine + "\n", "utf8");
      console.log("Account information saved to file successfully.");
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }

}
module.exports = AccountDatabase;