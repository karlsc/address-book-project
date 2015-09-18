var inquirer = require("inquirer");
var addressBook = { entries : [ { name:"karl", lastname:"souliere", email:"k@gmail.com", ticket: "[souliere], [karl]" }, 
                                { name:"karl", lastname:"chapeleau", email:"k@gmail.com", ticket: "[chapeleay], [karl]"  }, 
                                { name:"karl", lastname:"beaudet", email:"k@gmail.com", ticket: "[beaudet], [karl]"  }, 
]};

// console.log(addressBook.entries[0].ticket);

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
        console.log("yes");
        
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
                    
        if(addressBook.entries[x].name === value.searchInput){
            amountFound++;
            // entriesFound.push("["+addressBook.entries[x].lastname+"], ["+addressBook.entries[x].name+"]");
            entriesFound.push(addressBook.entries[x].ticket);
        }
    }
            
    if(amountFound === 0){
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
            //searchSecondChoiceMenu(answer) 
            
            if(answer.nameFound === "Back to main menu"){
                
                mainMenu();
            } else if(answer.nameFound === "Do another search"){
                
                firstChoiceMenu(1);
            } else{
                for(var j = 0 ; j < entriesFound.length ; j++){
                    
                    if(answer.nameFound === addressBook.entries[j].ticket ){
                        
                        console.log(addressBook.entries[j]);
                    }
                    
                    
                }
                
                console.log("Each name action");
            }
            
            
            
        });
    }
}

mainMenu();