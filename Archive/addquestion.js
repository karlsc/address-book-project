var inquirer = require("inquirer");
var indexPage = require('./index.js');

function addQuestion(){
  
var collection = {entries: [ {ticket: "" }]};

var questions = [
  {
    type: "input",
    name: "newEntryFirstName",
    message: "First name:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,15}?[a-zÜ-ü\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid first name.";
        }
    }
  },
  {
    type: "input",
    name: "newEntryLastName",
    message: "Last name:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,20}?[a-zÜ-ü\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid first name.";
        }
    }
  },
  {
    type: "input",
    name: "newEntryBirthday",
    message: "Birthday:"
  },
  { 
    type: "confirm", 
    name: "needHomeAddress",
    message: "Input home address?",
    default: false,
  },
  {
    type: "input",
    name: "home.newHomeAddNumber",
    message: "Home address #:",
    validate: function(value) {
        var pass = value.match(/^[0-9]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid number.";
        }
    },
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  {
    type: "input",
    name: "newHomeAddStr",
    message: "Home address street:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{2,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid street name.";
        }
    },
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  {
    type: "input",
    name: "newHomeAdd2",
    message: "Home address line 2:",
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  {
    type: "input",
    name: "newHomeCity",
    message: "Home city:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,15}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid city name.";
        }
    },
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  {
    type: "input",
    name: "newHomeProvince",
    message: "Home province:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid province name.";
        }
    },
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  {
    type: "input",
    name: "newHomePostal",
    message: "Home postal code:",
    validate: function(value) {
        var pass = value.match(/^([a-z0-9\s]{6,7})+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid postal code.";
        }
    },
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  {
    type: "input",
    name: "newHomeCountry",
    message: "Home country:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid country name.";
        }
    },
    when: function(answers) {
      return answers.needHomeAddress;
    }
  },
  { 
    type: "confirm", 
    name: "needWorkAddress",
    message: "Input work address?",
    default: false,
  },
  {
    type: "input",
    name: "newWorkAddNumber",
    message: "Work address #:",
    validate: function(value) {
        var pass = value.match(/^[0-9]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid number.";
        }
    },
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  {
    type: "input",
    name: "newWorkAddStr",
    message: "Work address street:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{2,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid street name.";
        }
    },
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  {
    type: "input",
    name: "newWorkAdd2",
    message: "Work address line 2:",
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  {
    type: "input",
    name: "newWorkCity",
    message: "Work city:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,15}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid city name.";
        }
    },
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  {
    type: "input",
    name: "newWorkProvince",
    message: "Work province:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid province name.";
        }
    },
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  {
    type: "input",
    name: "newWorkPostal",
    message: "Work postal code:",
    validate: function(value) {
        var pass = value.match(/^([a-z0-9\s]{6,7})+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid postal code.";
        }
    },
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  {
    type: "input",
    name: "newWorkCountry",
    message: "Work country:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid country name.";
        }
    },
    when: function(answers) {
      return answers.needWorkAddress;
    }
  },
  { 
    type: "confirm", 
    name: "needOtherAddress",
    message: "Input other address?",
    default: false,
  },
  {
    type: "input",
    name: "newOtherAddNumber",
    message: "Other address #:",
    validate: function(value) {
        var pass = value.match(/^[0-9]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid number.";
        }
    },
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  {
    type: "input",
    name: "newOtherAddStr",
    message: "Other address street:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{2,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid street name.";
        }
    },
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  {
    type: "input",
    name: "newOtherAdd2",
    message: "Other address line 2:",
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  {
    type: "input",
    name: "newOtherCity",
    message: "Other city:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,15}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid city name.";
        }
    },
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  {
    type: "input",
    name: "newOtherProvince",
    message: "Other province:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid province name.";
        }
    },
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  {
    type: "input",
    name: "newOtherPostal",
    message: "Other postal code:",
    validate: function(value) {
        var pass = value.match(/^([a-z0-9\s]{6,7})+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid postal code.";
        }
    },
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  {
    type: "input",
    name: "newOtherCountry",
    message: "Other country:",
    validate: function(value) {
        var pass = value.match(/^[a-zÜ-ü]{1,10}?[a-zÜ-ü\.\-\s]+$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid country name.";
        }
    },
    when: function(answers) {
      return answers.needOtherAddress;
    }
  },
  
  { 
    type: "confirm", 
    name: "needHomePhone",
    message: "Input home phone number?",
    default: false,
  },
  {
    type: "input",
    name: "newHomePhone",
    message: "Home phone number:",
    validate: function(value) {
        var pass = value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
        if(pass){
            return true;
        } else{
            return "Please enter a valid phone number.";
        }
    },
    when: function(answers) {
      return answers.needHomePhone;
    }
  },
  {
    type: "list",
    name: "newHomePhoneType",
    message: "Type of phone number?",
    choices: [ "Landline", "Cellular", "Fax"],
    when: function(answers) {
      return answers.needHomePhone;
    }
  },
  { 
    type: "confirm", 
    name: "needWorkPhone",
    message: "Input work phone number?",
    default: false,
  },
  {
    type: "input",
    name: "newWorkPhone",
    message: "Work phone number:",
    validate: function(value) {
        var pass = value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
        if(pass){
            return true;
        } else{
            return "Please enter a valid phone number.";
        }
    },
    when: function(answers) {
      return answers.needWorkPhone;
    }
  },
  {
    type: "list",
    name: "newWorkPhoneType",
    message: "Type of phone number?",
    choices: [ "Landline", "Cellular", "Fax"],
    when: function(answers) {
      return answers.needWorkPhone;
    }
  },
  { 
    type: "confirm", 
    name: "needOtherPhone",
    message: "Input other phone number?",
    default: false,
  },
  {
    type: "input",
    name: "newOtherPhone",
    message: "Other phone number:",
    validate: function(value) {
        var pass = value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
        if(pass){
            return true;
        } else{
            return "Please enter a valid phone number.";
        }
    },
    when: function(answers) {
      return answers.needOtherPhone;
    }
  },
  {
    type: "list",
    name: "newOtherPhoneType",
    message: "Type of phone number?",
    choices: [ "Landline", "Cellular", "Fax"],
    when: function(answers) {
      return answers.needOtherPhone;
    }
  },
  { 
    type: "confirm", 
    name: "needHomeEmail",
    message: "Input home email?",
    default: false,
  },
  {
    type: "input",
    name: "newHomeEmail",
    message: "Home email:",
    validate: function(value) {
        var pass = value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid email.";
        }
    },
    when: function(answers) {
      return answers.needHomeEmail;
    }
  },
  { 
    type: "confirm", 
    name: "needWorkEmail",
    message: "Input work email?",
    default: false,
  },
  {
    type: "input",
    name: "newWorkEmail",
    message: "Work email:",
    validate: function(value) {
        var pass = value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid email.";
        }
    },
    when: function(answers) {
      return answers.needWorkEmail;
    }
  },
  { 
    type: "confirm", 
    name: "needOtherEmail",
    message: "Input other email?",
    default: false,
  },
  {
    type: "input",
    name: "newOtherEmail",
    message: "Other email:",
    validate: function(value) {
        var pass = value.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
        if(pass){
            return true;
        } else{
            return "Please enter a valid email.";
        }
    },
    when: function(answers) {
      return answers.needOtherEmail;
    }
  }
];

inquirer.prompt( questions, function( answers ) {
  
  indexPage.showNewEntry();
  
  //var numAt = collection.entries.length-1;
  
  //collection.entries[numAt] = answers;
  //collection.entries[numAt].ticket = "["+answers.newEntryLastName+"], ["+answers.newEntryFirstName+"]";
  
  // collection.entries[0].ticket = "["+answers.newEntryLastName+"], ["+answers.newEntryFirstName+"]";
  // collection.entries[0].name = answers.newEntryFirstName;
  // collection.entries[0].lastName = answers.newEntryLastName;
  // collection.entries[0].birthday = answers.newEntryBirthday;
  // collection.entries[0].home.addNum = answers.newHomeAddNumber;
  // collection.entries[0].home.addStr = answers.newHomeAddStr;
  // collection.entries[0].home.addAdd2 = answers.newHomeAdd2;
  // collection.entries[0].home.city = answers.newHomeCity;
  // collection.entries[0].home.province = answers.newHomeProvince;
  // collection.entries[0].home.postal = answers.newHomePostal;
  // collection.entries[0].home.country = answers.newHomeCountry;
  
  // collection.entries[0].work.addNum = answers.newAddNumber;
  // collection.entries[0].work.addStr = answers.newHomeAddStr;
  // collection.entries[0].work.addAdd2 = answers.newHomeAdd2;
  // collection.entries[0].work.city = answers.newHomeCity;
  // collection.entries[0].work.province = answers.newHomeProvince;
  // collection.entries[0].work.postal = answers.newHomePostal;
  // collection.entries[0].work.country = answers.newHomeCountry;
  
  
  // "needHomeAddress": true,
  // answers.newHomeAddNumber
  // "newHomeAddStr": "sfsd",
  // "newHomeAdd2": "sdfsdf",
  // "newHomeCity": "dfdfsddfs",
  // "newHomeProvince": "sfsdfsdf",
  // "newHomePostal": "h2a 2a4",
  // "newHomeCountry": "sfsdfsdf",
  // "needWorkAddress": false,
  // "needOtherAddress": false,
  // "needHomePhone": true,
  // "newHomePhone": "645 567 4567",
  // "newHomePhoneType": "Landline",
  // "needWorkPhone": false,
  // "needOtherPhone": false,
  // "needHomeEmail": true,
  // "newHomeEmail": "dfjfdj@fgsfjg.com",
  // "needWorkEmail": false,
  // "needOtherEmail": false
  
  
  
  
  
  //console.log(collection.entries);
  //console.log( JSON.stringify(answers, null, "  ") );
});
}



module.exports = {
    
    addQuestion: addQuestion
    
};