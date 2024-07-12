
const layer1 = document.querySelector('.layer1')
const layer2 = document.querySelector('.layer2')
const layer3 = document.querySelector('.layer3')
const outer = document.querySelector('._outer')
const inner = document.querySelector('._inner')
const percentage = document.querySelector('span')
const processing = document.querySelector('.processing')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')
const p3 = document.querySelector('.p3')

let [score, points] = [...document.querySelectorAll(".scoreNm")]
const countdownEl = document.querySelector('#countdown');
let board = document.querySelector(".outer");
let table = document.querySelector(".table");


let Game0N = false
let TIME =  5 * 60
let onTable = 0




//this function triggers when you click play
function StartGame() {
    if (parseInt(points.innerHTML) <= 0) { // if no spades left
        score.innerHTML = 'No spades left '
        board.style.display = "flex";
        clearInterval(idItr);
    } else if (onTable == 0) { // if no spades on table
        // blinking border
        table.style.border = '5px dashed red'

        setTimeout(() => {
            table.style.border = '5px dashed transparent'
        }, 500)

        setTimeout(() => {
            table.style.border = '5px dashed red'
        }, 1000)

        setTimeout(() => {
            table.style.border = '5px dashed transparent'
        }, 1500)
    } else {
        Game0N = true
        Showball();
        // setTimeout(Showball,);
        setTimeout(shuffling, 7000);
    }
}


//this function lifts the thimbles
function thimbleup(x) {
    x.classList.add("thimbleup");
}
//this function puts the thimble down
function thimbledown(x) {
    x.classList.remove("thimbleup");
}
//this function selects one thimble at random and positions the ball
// under it and lifts it at the beginning
let idItr
let timeLeft = TIME ; // 5 minutes in seconds
function Showball() {
    document.getElementById("Playbutton").style.pointerEvents = "none";
    let rand = getRandNum();
    let thimb = document.getElementById(`Cup${rand}`);

    document
        .getElementById("thimble_ball")
        .setAttribute("Class", `thimble_ball_position-${rand}`);

    thimb.classList.add("thimbleup");

    setTimeout(function () {
        thimb.classList.remove("thimbleup");
    }, 4000);

    setTimeout(function () {
        document
            .getElementById("thimble_ball")
            .classList.remove(`thimble_ball_position-${rand}`);
    }, 4500);

    // Start Timer
    if (countdownEl.innerHTML == '05:00') {
        idItr = setInterval(() => {
            if (timeLeft <= 0 && !Game0N) {
                if (!Game0N) {
                    setTimeout(() => {
                        clearInterval(idItr);
                        board.style.display = "flex";
                        score.innerHTML = 'Time\'s up!  You Won ' + points.innerHTML + ' '
                        clearInterval(idItr);
                    }, 2000)
                }
            } else {
                if (timeLeft >= 0) {
                    let minutes = Math.floor(timeLeft / 60);
                    let seconds = timeLeft % 60;

                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    seconds = seconds < 10 ? '0' + seconds : seconds;

                    countdownEl.innerHTML = `${minutes}:${seconds}`;
                    timeLeft--;
                }
            }
        }, 1000);
    }
}

// This function resets the class of all the thimbles to default
function resetthimbclass() {
document
    .getElementById("Cup0")
    .setAttribute("Class", "sewing_thimble thimble-0");
document
    .getElementById("Cup1")
    .setAttribute("Class", "sewing_thimble thimble-1");
document
    .getElementById("Cup2")
    .setAttribute("Class", "sewing_thimble thimble-2");
}

//this functions picks a random integer from 0-2
function getRandNum() {
    let random = Math.floor(Math.random() * 3);
    return random;
}

//this functions runs pickrandcups function after every 0.5secons
function shuffling() {
    mix = setInterval(PickRandCups, 500);
}

let mix;

let shufflecounter = 0;

//this function interchanges the classes of two thimbles
function PickRandCups() {
    let Cone = getRandNum();
    let Ctwo = getRandNum();

    if (Cone != Ctwo) {
        let Cupone = document.getElementById(`Cup${Cone}`);
        let Cuptwo = document.getElementById(`Cup${Ctwo}`);

        let CuponeClass = Cupone.getAttribute("class");
        let CuptwoClass = Cuptwo.getAttribute("class");

        Cupone.setAttribute("Class", CuptwoClass);
        Cuptwo.setAttribute("Class", CuponeClass);

        shufflecounter = shufflecounter + 1;

        if (shufflecounter > 15) {
        clearInterval(mix);
        resetthimbclass();
        removedisabled();
        shufflecounter = 0;
        //  setTimeout(resetthimbclass,7500);
    }
} else {
    PickRandCups();
}
}

//this function removes the disabled attribute from all thimbles
function removedisabled() {
    let removedis = document.getElementsByClassName("sewing_thimble");
    for (var i = 0; i < removedis.length; i++) {
        removedis[i].removeAttribute("disabled");
    }
}

// this function adds the disabled attribute from all thimbles
function adddisabled() {
    let addis = document.getElementsByClassName("sewing_thimble");
    for (var i = 0; i < addis.length; i++) {
        addis[i].setAttribute("disabled", "disabled");
    }
}

// This function triggers when you click on a thimble
function selectthimble(x) {
    adddisabled();
    let rand = getRandNum();
    let winningthimble = document.getElementById(`Cup${rand}`);
    let selectedthimble = document.getElementById(`${x}`);
    let ballpos = document.getElementById("thimble_ball");
    ballpos.setAttribute("Class", `thimble_ball_position-${rand}`); //set the ball position tunder the selected thimble
    selectedthimble.classList.add("thimbleup"); //lift the selected thimble up

    setTimeout(function () {

        if (winningthimble != selectedthimble) {
            setTimeout(function () {
                selectedthimble.classList.remove("thimbleup");
            }, 2000); //bring the selected thimble down after 2 secs
            setTimeout(function () {
                winningthimble.classList.add("thimbleup");
            }, 2500); //bring the winning thimble down after 2.5secs

            setTimeout(function () {
                winningthimble.classList.remove("thimbleup");
            }, 4000); //bring the winning thimble down after 5secs

            // subtract points
            points.innerHTML = parseInt(points.innerHTML) - onTable;
            points.style.color = "crimson";
            setTimeout(function () {
                points.style.color = "white";
            }, 1000)

            onTable = 0;
            let sum = document.querySelector(".sumNm");
            sum.innerHTML = 0

            document.getElementById("Playbutton").style.pointerEvents = "all"; //make the play button clickable again
        } else if ((winningthimble = selectedthimble)) {

            // add points
            points.innerHTML = parseInt(points.innerHTML) + onTable;
            points.style.color = "#63d673";
            setTimeout(function () {
                points.style.color = "white";
            }, 1000)

            if (points.innerHTML <= 0) {
                board.style.display = "flex";
                score.innerHTML = 'No spades left '
                clearInterval(idItr);
            }
            onTable = 0;
            let sum = document.querySelector(".sumNm");
            sum.innerHTML = 0

            setTimeout(function () {
                selectedthimble.classList.remove("thimbleup");
            }, 2000); //bring the selected thimble down after 2 secs
            setTimeout(function () {
                winningthimble.classList.remove("thimbleup");
            }, 2500); //bring the winning thimble down after 2.5secs
            document.getElementById("Playbutton").style.pointerEvents = "all"; //make the play button clickable again
        }
        Game0N = false
    }, 2000);
}


function setCup(id) {
    let elements = document.querySelectorAll(".sewing_thimble");
    for (let element of elements) {
        element.style.background = `url("Img/c${id}.png") no-repeat fixed center`;
        element.style.backgroundSize = `contain`;
    }
}

function setBall(id) {
    let element = document.querySelector("#thimble_ball");
    element.style.background = `url("Img/b${id}.png") no-repeat center`;
    element.style.backgroundSize = '2em 2em';
}

function setOnTable(prst) {

    if (parseInt(points.innerHTML) > 0) {
        let sum = document.querySelector(".sumNm");
        onTable = Math.round(points.innerHTML * prst);
        sum.innerHTML = onTable;
    } else {
        board.style.display = "flex";
        score.innerHTML = 'No spades left '
        clearInterval(idItr);
    }
}


function init() {
    setOnTable(0);
    points.innerHTML = 200;
    board.style.display = "none";
    countdownEl.innerHTML = '05:00'
    // Clear all intervals and timeouts
    InID = setInterval(() => {}, 10)
    TiID = setTimeout(() => {}, 10)
    while (InID--) clearInterval(InID)
    while (TiID--) clearTimeout(TiID)
    timeLeft = TIME

}


///\ LOAD GAME /\\\
let count = 0;
let GAME0N = false
// Event listener for loading the game
inner.addEventListener('click', loader = () => {
    // Remove event listener to ensure only one click is processed
    inner.removeEventListener('click', loader)
    GAME0N = true

    /* Process board smooth appearance */
    percentage.textContent = '0%'

    // Smooth appearance animation of loading elements
    gsap.to(p1, { opacity: 0.5, duration: 1 });
    gsap.to(p2, { opacity: 0.5, duration: 2 });
    gsap.to(p3, { opacity: 0.5, duration: 3 });

    // Start loading animation and transition when loading
    setTimeout(() => {
        /* Percent Loader */
        const id = setInterval(() => {
            if (GAME0N) {
                if (count == 99) {
                    // Load reaches 100%, animate out the loading screen
                    setTimeout(() => {
                        percentage.textContent = '100%'
                        outer.classList.remove('active-loader')
                        outer.classList.add('active-loader2')
                        layer3.style.top = '-100%'
                        layer2.style.top = '-100%'
                        layer1.style.top = '-100%'
                    }, 1500)

                    // Hide loading elements and clear interval
                    setTimeout(() => {
                        layer3.style.display = 'none'
                        layer2.style.display = 'none'
                        layer1.style.display = 'none'
                        clearInterval(id)
                        
                        if (window.screen.width < 1200 || window.screen.height < 500) {
                            alert('This game is not supported on mobile devices')
                        }
                    }, 3000)

                }
                else {
                    count++
                    percentage.textContent = count + '%'
                    outer.classList.add('active-loader')
                }
            }
        }, 60) // Loading speed

         /* Process appear one by one */
        const ls = [p1, p2, p3];
        let i = 1;
        gsap.to(p1, { opacity: 1, scale: '1.5', duration: 0.5 });

        // Sequential animation for loading elements
        const _id = setInterval(() => {
            if (i < ls.length) {
                gsap.to(ls[i], { opacity: 1, scale: '1.5', duration: 0.5 });
                gsap.to(ls[i - 1], { opacity: 0.5, scale: '1', duration: 0.5 });
                i++;
            } else {
                clearInterval(_id);
            }
        }, 2500);
    }, 2000)
})

