// ===== CONFIG =====
let donors = 0;
const targetDonors = 50;
const livesPerDonor = 3;

// ===== START CAMP =====
function startCamp() {
    document.getElementById("inauguration").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

// ===== ADD DONOR =====
function addDonor() {
    donors++;

    animateCounter("donors", donors);
    animateCounter("lives", donors * livesPerDonor);

    updateBloodLevel();
}

// ===== UPDATE BLOOD LEVEL =====
function updateBloodLevel(){

let fillPercent=(donors/targetDonors)*100;

if(fillPercent>100) fillPercent=100;

document.getElementById("blood").style.height=fillPercent+"%";

}


// ===== SMOOTH NUMBER ANIMATION =====
function animateCounter(id, newValue) {

    let element = document.getElementById(id);
    let current = parseInt(element.innerText) || 0;

    let increment = newValue > current ? 1 : -1;

    let interval = setInterval(() => {

        current += increment;
        element.innerText = current;

        if (current === newValue) {
            clearInterval(interval);
        }

    }, 20);
}


// ===== RESET FUNCTION =====
function resetCamp() {

    donors = 0;

    animateCounter("donors", 0);
    animateCounter("lives", 0);

    document.getElementById("blood").style.height = "0%";
}


// ===== BLOOD TYPE COUNTS =====

let bloodTypes = {
Aplus:0,
Aminus:0,
Bplus:0,
Bminus:0,
ABplus:0,
ABminus:0,
Oplus:0,
Ominus:0
};


// ===== BLOOD FLOW FUNCTION =====

function addBlood(type, event){

let id;

if(type=="A+") id="Aplus";
if(type=="B+") id="Bplus";
if(type=="AB+") id="ABplus";
if(type=="O+") id="Oplus";
if(type=="A-") id="Aminus";
if(type=="B-") id="Bminus";
if(type=="AB-") id="ABminus";
if(type=="O-") id="Ominus";

bloodTypes[id]++;

document.getElementById(id).innerText=bloodTypes[id];

donors++;

animateCounter("donors",donors);
animateCounter("lives",donors*livesPerDonor);

updateBloodLevel();

triggerBloodFlow(event);   /* important */

}

// ===== FLOW ANIMATION =====
function triggerBloodFlow(event){

const button = event.target;

const rect = button.getBoundingClientRect();
const bag = document.querySelector(".bag").getBoundingClientRect();

const startX = rect.left + rect.width/2;
const startY = rect.top + rect.height/2;

const endX = bag.left + bag.width/2;
const endY = bag.top + bag.height/2;

const dx = endX - startX;
const dy = endY - startY;

const length = Math.sqrt(dx*dx + dy*dy);
const angle = Math.atan2(dy, dx) * 180 / Math.PI;

const line = document.createElement("div");
line.className="blood-flow-line";

line.style.width = length + "px";
line.style.left = startX + "px";
line.style.top = startY + "px";
line.style.transform = `rotate(${angle}deg)`;

document.body.appendChild(line);

setTimeout(()=>{
line.remove();
},1500);

}

function removeBlood(type){

let id="";

if(type=="A+") id="Aplus";
if(type=="B+") id="Bplus";
if(type=="AB+") id="ABplus";
if(type=="O+") id="Oplus";
if(type=="A-") id="Aminus";
if(type=="B-") id="Bminus";
if(type=="AB-") id="ABminus";
if(type=="O-") id="Ominus";

if(bloodTypes[id] > 0){

bloodTypes[id]--;

document.getElementById(id).innerText=bloodTypes[id];

if(donors>0){
donors--;

animateCounter("donors",donors);
animateCounter("lives",donors*livesPerDonor);

updateBloodLevel();
}

}

}