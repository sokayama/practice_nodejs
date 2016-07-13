var myName = "Shingo";

function greeting(something){
    console.log(myName + " : hello, " + something + "!");
}

greeting("world");

//exports.myName = myName;
exports.greeting = greeting;