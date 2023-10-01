const fs = require('fs');
const readlineSync = require('readline-sync');

class Account {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // Getter for username
  getUsername() {
    return this.username;
  }

  // Setter for username
  setUsername(username) {
    this.username = username;
  }

  // Getter for password
  getPassword() {
    return this.password;
  }

  // Setter for password
  setPassword(password) {
    this.password = password;
  }
}

class AccountDatabase {
  constructor() {
    this.accounts = [];
  }

  readFromFile(filePath) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const lines = fileContents.split('\n');

      for (const line of lines) {
        const [username, password] = line.split(',');
        if (username && password) {
          const account = new Account(username, password);
          this.accounts.push(account);
        }
      }

      console.log('Accounts loaded from file.');
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

  // Create a new account and add it to the database
  createAccount() {
    const username = readlineSync.question('Enter a username: ');

    if (this.isUsernameTaken(username)) {
      console.log('Username is already taken. Please choose another.');
      this.createAccount();
      return;
    }

    const password = readlineSync.question('Enter a password (at least 8 characters): ', {
      hideEchoBack: true,
    });

    if (password.length < 8) {
      console.log('Password must be at least 8 characters long.');
      this.createAccount();
      return;
    }

    const account = new Account(username, password);
    this.accounts.push(account);
    console.log('Account created successfully.');
  }

  // Check if a username is already taken
  isUsernameTaken(username) {
    return this.accounts.some((account) => account.getUsername() === username);
  }

  // List all accounts
  listAccounts() {
    console.log('Account List:');
    this.accounts.forEach((account) => {
      console.log(`Username: ${account.getUsername()}`);
    });
  }
}
