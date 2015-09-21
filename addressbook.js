var inquirer = require("inquirer");
var Table = require('cli-table');
var addressBook = {entries: []};

function mainMenu(answer){

    inquirer.prompt( [{ type: "list", 
                        name: "firstAction", 
                        message: "What do you want to do?", 
                        choices: ["Create new entry","Search","Exit"], 
                    }], function(answer){ firstChoiceMenu(answer) });}

function firstChoiceMenu(answer){

    
      if(answer.firstAction === "Create new entry"){
        
        entryQuestions();
        
      } else if(answer.firstAction === "Search" || answer === 1){
        
        inquirer.prompt( [{ type: "input",
                            name: "searchInput",
                            message: "Who are you looking for?"
            
        }], function(answer){ searchChoiceMenu(answer) });
      } else {
        return;
    }
  }


function showTable(j){
    
    var table = new Table({
                        
                    chars: {'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' ,
                            'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'right': '║' ,
                            'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼',
                            'right-mid': '╢' , 'middle': '│' }
    });
                        
    table.push(
        ["First Name", addressBook.entries[j].newEntryFirstName],
        ["Last Name", addressBook.entries[j].newEntryLastName],
        ["Birthday", addressBook.entries[j].newEntryBirthday],
        ["Addresses", 
        "home:\n"+addressBook.entries[j].newHomeAddNumber+" "+addressBook.entries[j].newHomeAddStr+"\n"+addressBook.entries[j].newHomeAdd2+"\n"+addressBook.entries[j].newHomeCity+", "+addressBook.entries[j].newHomeProvince+" "+addressBook.entries[j].newHomePostal+"\n"+addressBook.entries[j].newHomeCountry+
        "\nwork:\n"+addressBook.entries[j].newWorkAddNumber+" "+addressBook.entries[j].newWorkAddStr+"\n"+addressBook.entries[j].newWorkAdd2+"\n"+addressBook.entries[j].newWorkCity+", "+addressBook.entries[j].newWorkProvince+" "+addressBook.entries[j].newWorkPostal+"\n"+addressBook.entries[j].newWorkCountry+
        "\nother:\n"+addressBook.entries[j].newOtherAddNumber+" "+addressBook.entries[j].newOtherAddStr+"\n"+addressBook.entries[j].newOtherAdd2+"\n"+addressBook.entries[j].newOtherCity+", "+addressBook.entries[j].newOtherProvince+" "+addressBook.entries[j].newOtherPostal+"\n"+addressBook.entries[j].newOtherCountry
        ],
        ["Phones", "home: "+addressBook.entries[j].newHomePhone+" ("+addressBook.entries[j].newHomePhoneType+")\nwork: "+addressBook.entries[j].newWorkPhone+" ("+addressBook.entries[j].newWorkPhoneType+")\nother: "+addressBook.entries[j].newOtherPhone+" ("+addressBook.entries[j].newOtherPhoneType+")"],
        ["Emails", "home: "+addressBook.entries[j].newHomeEmail+"\nwork: "+addressBook.entries[j].newWorkEmail+"\nother: "+addressBook.entries[j].newOtherEmail]
    );
 
    console.log(table.toString());
                
    inquirer.prompt( [{ type: "list", 
                        name: "afterSearchAction", 
                        message: "What do you want to do?", 
                        choices: ["Edit entry", "Delete entry", "Back to main menu"], 
    }], function(answer){ afterSearchMenu(answer,j) });
}

function afterSearchMenu(value,currentItem){
    
    if(value.afterSearchAction === "Edit entry"){
        
        /////////EDIT EDIT EDIT EDIT
        
    } else if(value.afterSearchAction === "Delete entry"){
        
        deleteMenu(value,currentItem);
    }else{
        mainMenu();
    }
}  
        
function deleteMenu(value,toDelete){
  
  inquirer.prompt( [{ type: "confirm", 
                      name: "wantToDelete", 
                      message: "Are you sure?", 
                      default: false, 
  }], function(answer){ 
            
    if(answer.wantToDelete ){
      
      addressBook.entries.splice(toDelete-1,1);
      mainMenu();
                
    } else{
      showTable(toDelete);
    } 
  });
}

function searchChoiceMenu(value){
                
    var amountFound = 0;
    var entriesFound = [];
    var entriesFoundMenu = ["Do another search","Back to main menu"];
    
    for(var x = 0 ; x < addressBook.entries.length ; x++){
                    
        if(addressBook.entries[x].newEntryFirstName === value.searchInput ){
            amountFound++;
            entriesFound.push(addressBook.entries[x].ticket);
        }
    }
            
    if(amountFound === 0 && value){
        console.log("There is no one under this name.");
    
    } else {
        var entriesFoundSort = entriesFound.sort();
            
        for(var i = entriesFound.length -1 ; i >= 0 ; i--){
            
            entriesFoundMenu.unshift(entriesFoundSort[i]);
        }
        
        inquirer.prompt( [{ type: "list",
                            name: "nameFound", 
                            message: "Matching entries:",
                            choices: entriesFoundMenu, 
        }], function(answer){ 
            
          if(answer.nameFound === "Back to main menu"){
                
            mainMenu();
          } else if(answer.nameFound === "Do another search"){
                
            firstChoiceMenu(1);
          } else{
        
            for(var j = 0 ; j < entriesFound.length ; j++){
                
              if(answer.nameFound === addressBook.entries[j].ticket){
        
                showTable(j);
              }
            }
          }
        });
    }
}

function entryQuestions(){

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

createNewEntry(questions);
}

function createNewEntry(questions,answers){

inquirer.prompt( questions, function( answers ) {
  
  var numAt = addressBook.entries.length;
  
  addressBook.entries[numAt] = answers;
  addressBook.entries[numAt].ticket = "["+answers.newEntryLastName+"], ["+answers.newEntryFirstName+"]";
  showTable(numAt);
  //console.log( JSON.stringify(answers, null, "  ") );
});
    
}

mainMenu();
