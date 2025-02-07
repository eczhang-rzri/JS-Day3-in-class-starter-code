//Challenge 1

const members = [
    {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
    {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
];

//OLD WAY DEMO - CONSTRUCTOR FUNCTION
/*
function Employee(firstName, lastName, email, birthdate, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.salary = salary;
  }

  Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
    return new Employee(firstName, lastName, email, birthdate, salary);
  };

  Employee.prototype.editEmployee = function(updates) {
    Object.assign(this, updates);
  };

  // Usage example:
  const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
  console.log(bill);

  bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
  console.log(bill);
*/

//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
// 3. After step 2, console log your const and then try to console.log parts of the object
// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object

class Employee {
  constructor(firstName, lastName, email, birthdate, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.salary = salary;
  }
}

const emily = new Employee("Emily", "Zhang", "emily.zhang@utexas.edu", "2004-05-13", 50000);
console.log(emily.email);

const employees = [emily, new Employee("Vera", "Hong", "verahong@email.com", "2002-12-12", 80000), new Employee("Steven", "Liggy", "sliggy@email.com", "1989-08-23", 100000)]

//Try to output 3 instances of your class object into the table

//get the table from the dom
const table = document.getElementById("employeeTable");
const tableBody = table.querySelector("tbody");;
// Clear existing rows in the table
tableBody.innerHTML = "";
// Populate the table
employees.forEach(employee => {
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${employee.firstName}</td>
  <td>${employee.lastName}</td>
  <td>${employee.email}</td>
  <td>${employee.birthdate}</td>
`;
// Append the row to the table
tableBody.appendChild(row);

});



//Challenge 2 - Callbacks
/*
//DEMO
function processOrder(orderId, callback) {
  console.log(`Processing order #${orderId}...`);
  setTimeout(() => {
    callback(`Order #${orderId} processed successfully`);
  }, 2000); // Simulate 2-sec processing time
}

// Usage
processOrder(101, (confirmation) => {
  console.log('Email sent:', confirmation); 
});
*/
/*
function confirmation(message) {
  console.log(message);
}
*/

function sendInvoice(clientName, callback) {
  console.log(`Sending invoice to ${clientName}...`);
  setTimeout(() => {
    callback(`Invoice sent to ${clientName}`);
  }, 1500)
}

sendInvoice("Joe", (confirmation) => {
  console.log("Email sent: ", confirmation);
});



//Challenge 3 - Promises
/* DEMO
function checkInventory(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const inStock = Math.random() > 0.2; // 80% chance in stock
      inStock ? resolve(`${productId} available`) : 
                reject(`${productId} out of stock`);
    }, 1500);
  });
}

// Usage
checkInventory('WF-100')
  .then(console.log)
  .catch(console.error);
*/

function verifyPayment(orderTotal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderUnder5K = (orderTotal < 5000);
      orderUnder5K ? resolve(`$${orderTotal} payment accepted`) : reject(`$${orderTotal} payment rejected, requires manager approval`);
    }, 3000)
  })
}

verifyPayment(3000).then(console.log).catch(console.error);
verifyPayment(5000).then(console.log).catch(console.error);


//Challenge 4 - Async/Await
/* DEMO
// Mock async functions  
async function verifyIdentity(customerId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      Math.random() < 0.9 
        ? resolve() 
        : reject("Identity verification failed");
    }, 1000);
  });
}

async function createAccount(customerId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ accountNumber: "ACC-" + Date.now() });
    }, 1500);
  });
}

async function sendWelcomeKit(customerId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Welcome email sent to ${customerId}@company.com`);
    }, 500);
  });
}

// Your onboarding function (unchanged)
async function onboardCustomer(customerId) {
  try {
    await verifyIdentity(customerId);
    const account = await createAccount(customerId);
    const welcomeEmail = await sendWelcomeKit(customerId);
    console.log("Account created:", account);
    console.log(welcomeEmail);
    return { success: true, account };
  } catch (error) {
    console.error('Onboarding failed:', error);
    return { success: false, error };
  }
}

// Test call of the function
onboardCustomer("CUST-12345");
*/
async function verifyRefund(requestId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Refund successfully verified for request #${requestId}`);
    }, 1000);
  })
}

async function reversePayment(requestId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Payment successfully reversed for request #${requestId}`);
    }, 2000);
  })
}

async function processRefund(requestId) {
  try {
    const refundVerified = await verifyRefund(requestId);
    const paymentReversed = await reversePayment(requestId);
    console.log(refundVerified);
    console.log(paymentReversed);
    console.log(`Refund complete for request #${requestId}`);
  } catch (err) {
    console.error(`Refund failed: `, err);
  }
}

processRefund("RQ-72");