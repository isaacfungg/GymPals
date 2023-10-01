const fs = require('fs');
const readlineSync = require('readline-sync');

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
    this.readFromFile('accountInfo.txt'); 
  }

  readFromFile(filePath) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = fileContents.split('\n');

      for (const line of data) {
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

  createAccount() {
    let username;
    let password;

    do {
      username = readlineSync.question('Enter a username: ');

    if (this.isUsernameTaken(username)) {
      console.log('Username is already taken. Please choose another.');
      }
    } while (this.isUsernameTaken(username));

    do {
      password = readlineSync.question('Enter a password (at least 8 characters): ', {
        hideEchoBack: true,
      });

      if (password.length < 8) {
        console.log('Password must be at least 8 characters long.');
      }
    } while (password.length < 8);

    const account = new Account(username, password);
    this.accounts.push(account);
    console.log('Account created successfully.');
  }

  isUsernameTaken(username) {
    return this.accounts.some((account) => account.getUsername() === username);
  }

  login(username, password) {
    return this.accounts.find((acc) => acc.getUsername() === username && acc.getPassword() === password);
  }

  // List all accounts
  listAccounts() {
    console.log('Account List:');
    this.accounts.forEach((account) => {
      console.log(`Username: ${account.getUsername()}`);
    });
  }
}
