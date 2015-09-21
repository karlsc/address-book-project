var inquirer = require("inquirer");
var Table = require('cli-table');
var addQuestion = require('./addquestion.js');


var addressBook = {entries: [ {ticket: "" }]};

// var addressBook = { entries : [ { 
    
//     ticket: "[souliere], [karl]",
//     name:"karl", 
//     lastname:"souliere",
   
//     birthday: {     month:"",
//                     day: "25",
//                     year: "1987" 
//     },
    
//     home: {         number: "2163",
//                     street: "darling",
//                     add2: "add2",
//                     city: "montreal",
//                     province: "qc",
//                     postal: "h1w 2w9",
//                     country: "canada",
//                     phone: "83838383",
//                     phoneType: "cellulare",
//                     email: "asd@asd.asd"
//     },
    
//     work: {         number: "2163",
//                     street: "darling",
//                     add2: "add2",
//                     city: "montreal",
//                     province: "qc",
//                     postal: "h1w 2w9",
//                     country: "canada",
//                     phone: "83838383",
//                     phoneType: "cellulare",
//                     email: "asd@asd.asd"
//     },
    
//     other: {        number: "2163",
//                     street: "darling",
//                     add2: "add2",
//                     city: "montreal",
//                     province: "qc",
//                     postal: "h1w 2w9",
//                     country: "canada",
//                     phone: "83838383",
//                     phoneType: "cellulare",
//                     email: "asd@asd.asd"
//     }
// }]};

function mainMenu(){
    inquirer.prompt( [{ type: "list", 
                        name: "firstAction", 
                        message: "What do you want to do?", 
                        choices: ["Create new entry","Search","Exit"], 
                    }], function(answer){ firstChoiceMenu(answer) }
    );
}
 
function firstChoiceMenu(value){
   
    if(value.firstAction === "Create new entry"){
        
        
        addQuestion.addQuestion();
        //console.log(addQuestion.collection);
        
        
        
        
        
        
        
        
        
        
    } else if(value.firstAction === "Search" || value === 1){
        
        inquirer.prompt( [{ type: "input",
                            name: "searchInput",
                            message: "Who are you looking for?"
            
                        }], function(answer){ searchChoiceMenu(answer) });
    } else {
        return;
    }
}

function searchChoiceMenu(value){
                
    var amountFound = 0;
    var entriesFound = [];
    var entriesFoundMenu = ["Do another search","Back to main menu"];
                
    for(var x = 0 ; x < addressBook.entries.length ; x++){
                    
        if(addressBook.entries[x].name === value.searchInput || value === 1){
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
        }], function(answer){ searchSecondChoiceMenu(answer,entriesFound.length) });
    }
}
            
function searchSecondChoiceMenu(value,entriesLength){
            
    if(value.nameFound === "Back to main menu"){
                
        mainMenu();
    } else if(value.nameFound === "Do another search"){
                
        firstChoiceMenu(1);
    } else{
        for(var j = 0 ; j < entriesLength ; j++){
                
            if(value.nameFound === addressBook.entries[j].ticket){
                
                var table = new Table({
                        
                    chars: {'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' ,
                            'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'right': '║' ,
                            'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼',
                            'right-mid': '╢' , 'middle': '│' }
                });
                        
                table.push(
                            ["First Name", addressBook.entries[j].name],
                            ["Last Name", addressBook.entries[j].lastname],
                            ["Birthday", addressBook.entries[j].birthday.month+" "+addressBook.entries[j].birthday.day+", "+addressBook.entries[j].birthday.year],
                            ["Addresses", 
                            "home:\n"+addressBook.entries[j].home.number+" "+addressBook.entries[j].home.street+"\n"+addressBook.entries[j].home.add2+"\n"+addressBook.entries[j].home.city+", "+addressBook.entries[j].home.province+" "+addressBook.entries[j].home.postal+"\n"+addressBook.entries[j].home.country+
                            "\nwork:\n"+addressBook.entries[j].work.number+" "+addressBook.entries[j].work.street+"\n"+addressBook.entries[j].work.add2+"\n"+addressBook.entries[j].work.city+", "+addressBook.entries[j].work.province+" "+addressBook.entries[j].work.postal+"\n"+addressBook.entries[j].work.country+
                            "\nother:\n"+addressBook.entries[j].other.number+" "+addressBook.entries[j].other.street+"\n"+addressBook.entries[j].other.add2+"\n"+addressBook.entries[j].other.city+", "+addressBook.entries[j].other.province+" "+addressBook.entries[j].other.postal+"\n"+addressBook.entries[j].other.country
                            ],
                            ["Phones", "home: "+addressBook.entries[j].home.phone+"\nwork: "+addressBook.entries[j].work.phone+"\nother: "+addressBook.entries[j].other.phone],
                            ["Emails", "home: "+addressBook.entries[j].home.email+"\nwork: "+addressBook.entries[j].work.email+"\nother: "+addressBook.entries[j].other.email]
                );
 
                console.log(table.toString());
            }
        }
                
        inquirer.prompt( [{ type: "list", 
                            name: "afterSearchAction", 
                            message: "What do you want to do?", 
                            choices: ["Edit entry", "Delete entry", "Back to main menu"], 
        }], function(answer){ afterSearchMenu(answer,j) });
    }
}

function afterSearchMenu(value,toDelete){
    
    if(value.afterSearchAction === "Edit entry"){
        
    } else if(value.afterSearchAction === "Delete entry"){
        
        inquirer.prompt( [{ type: "confirm", 
                            name: "wantToDelete", 
                            message: "Are you sure?", 
                            default: false, 
        }], function(answer){ 
            
            if(answer.wantToDelete){
                addressBook.entries.splice(toDelete-1,1);
                mainMenu();
                
            } else{
                searchChoiceMenu(1);
            } 
            
        });
    } else{
        mainMenu();
    }
    
}

mainMenu();