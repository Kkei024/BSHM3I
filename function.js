let date = new Date();
let currTimeH = date.getHours();
let currTimeM = date.getMinutes();


function time() {
    date = new Date();
    currTimeH = date.getHours();
    currTimeM = date.getMinutes();
    console.log("refreshed")
    subjProg();
} setInterval(time, 10000);

let startTimesH = [
    //sun
    //mon
    16, 17, 19,
    //tue
    '08',
    //wed
    '07', 12, 16, 17, 19,
    //thu
    16, 17, 19,
    //fri
    17,
    //sat
    12, 16, 17, 19,
]

let startTimesM = [
    //sun
    //mon
    '00', 30, '00',
    //tue
    '00',
    //wed
    '00', '00', '00', 30, '00',
    //thu
    '00', 30, '00',
    //fri
    '00',
    //sat
    '00', '00', 30, '00',
]

let endTimesH = [
    //sun
    //mon
    17, 19, 20, 
    //tue
    11,
    //wed
    12, 16, 17, 19, 20,
    //thu
    17, 19, 20, 
    //fri
    19,
    //sat
    16, 17, 19, 20,
]

let endTimesM = [
    //sun
    //mon
    30, '00', 30,
    //tue
    '00',
    //wed
    '00', '00', 30, '00',  30,
    //thu
    30, '00', 30,
    //fri
    '00',
    //sat
    '00', 30, '00', 30,
]

let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]

let day;
let dayRefr;
function viewSched(view) {
    switch(view) {
        case 0:
            day = "Sun";
            break;
        
        case 1:
            day = "Mon";
            break;
        
        case 2:
            day = "Tue";
            break;
        
        case 3:
            day = "Wed";
            break;
        
        case 4:
            day = "Thu";
            break;
        
        case 5:
            day = "Fri";
            break;
        
        case 6:
            day = "Sat";
            break;
    }
} viewSched(date.getDay());

console.log(day);

document.querySelectorAll(".daysSelect *").forEach((element, index) => {
    element.addEventListener("click", () => {
        console.log("clicked");
        console.log(day);
        showSched(index);
    })
})

function showSched(ind) {
    if (document.querySelector(".daysSelect .active") !== null) {
        document.querySelector(".daysSelect .active").classList.remove("active")
    }

    document.querySelector(`.daysSelect .${days[ind]}`).classList.add("active");

    document.querySelectorAll(`.sched:not(.${days[ind]})`).forEach((element) => {
        element.style.display = "none"
    })

    document.querySelectorAll(`.sched.${days[ind]}`).forEach((element) => {
        element.style.display = "block"
    })
} showSched(days.indexOf(day))

document.querySelectorAll('h4').forEach((element, index) => {
    if(startTimesH[index] > 12) {
        element.innerText = `${startTimesH[index] - 12}:${startTimesM[index]}PM -`
    } else if(startTimesH[index] == 12) {
        element.innerText = `${startTimesH[index]}:${startTimesM[index]}PM -`
    } else {
        element.innerText = `${startTimesH[index]}:${startTimesM[index]}AM -`
    }
    
    if(endTimesH[index] > 12) {
        element.innerText += ` ${endTimesH[index] - 12}:${endTimesM[index]}PM`
    } else if(endTimesH[index] == 12) {
        element.innerText += ` ${endTimesH[index]}:${endTimesM[index]}PM`
    } else {
        element.innerText += ` ${endTimesH[index]}:${endTimesM[index]}AM`
    }
})



function subjProg() {
    let subjects = document.querySelectorAll('.subj');

    subjects.forEach((element, i) => {
        let tempStr = element.classList[0];

        let subjTimer = currTimeH * 60 + currTimeM;
        let subjStart = Number(startTimesH[i]) * 60 + Number(startTimesM[i]);
        let subjEnd = Number(endTimesH[i]) * 60 + Number(endTimesM[i]);

        let perc = (subjTimer - subjStart) / (subjEnd - subjStart) * 100

        let parentsDay = element.parentElement.parentElement.classList[0];

        if(parentsDay == day) {
            element.querySelector('.right').style.backgroundImage = `linear-gradient(90deg,
            var(--${tempStr}BG) 0%,
            var(--${tempStr}BG) ${perc}%,
            white ${perc}%,
            white 100%
            )`
            console.log('changed')
        } else if (days.indexOf(parentsDay) < days.indexOf(day)) {
            element.querySelector('.right').style.backgroundColor = `var(--${tempStr}BG)`
        }


    })
} subjProg()