const goal = 25;
let entries = []

const entriesWrapper = document.querySelector("#entries")

function addNewEntry(newEntry) {
    entriesWrapper.removeChild(entriesWrapper.firstElementChild)
    const listItem = document.createElement("li");
    const listValue = document.createTextNode(newEntry.toFixed(1));
    listItem.appendChild(listValue);

    entriesWrapper.appendChild(listItem);
}

function roundMiles(value) {
    return value.toFixed(1) + " Miles"
}


function reducer(total, currentValue){
    return total + currentValue
}

function calcTotal() {
    const totalValue = entries.reduce(reducer);
    
    document.getElementById("totaldistance").innerHTML = roundMiles(totalValue)
    document.getElementById("progressTotal").innerHTML = totalValue.toFixed(1)
}

function calcAverage(){
    const average = entries.reduce(reducer) / entries.length
    document.getElementById("avgDistance").innerHTML = roundMiles(average)
}

function weeklyHigh() {
    const high = Math.max(...entries)
    document.getElementById("high").innerHTML = roundMiles(high)
    document.getElementById("target").innerHTML = roundMiles(goal)
}

function calcGoal() {
    const totalValue = entries.reduce(reducer);
    const compPercent = totalValue / (goal / 100)
    const progressCircle = document.getElementById("progressCircle")
    if (compPercent > 100) compPercent === 100
    progressCircle.style.background = `conic-gradient(green ${compPercent}%, grey ${compPercent}% 100%)`;
    
}

function handSubmit(event) {
    event.preventDefault();
    const entry =  Number(document.querySelector("#entry").value);
    if (!entry) return;
    document.querySelector("form").reset();
    entries.push(entry);
    addNewEntry(entry)
    calcTotal()
    calcAverage()
    weeklyHigh()
    calcGoal()
}


const form = document
        .querySelector("form")
        .addEventListener("submit", handSubmit)