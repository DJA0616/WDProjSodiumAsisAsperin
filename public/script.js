const goalCardDisplay = document.querySelector(".goal-card-display");
const template = document.querySelector("#goal-card-template");

var goalCounter = 4;

for(var i = 0; i < goalCounter; i++){
    goalCardDisplay.append(template.content.cloneNode(true));
}