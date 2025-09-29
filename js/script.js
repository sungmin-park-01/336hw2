if (localStorage.getItem('points') === null) {
  localStorage.setItem('points', '100');
}

document.querySelector('#ruleBtn').addEventListener("click", displayRule);
document.querySelector('#rollBnt').addEventListener("click", displayResult);
document.querySelector('#resetBnt').addEventListener("click", reset);

const ol = document.getElementById("ol");
const span = document.getElementById("span");
const diceNumber = [1,2,3,4,5,6];

function displayRule(){
    if (ol.style.display === "none") {
    ol.style.display = "block";
  } else {
    ol.style.display = "none";
  }
  span.style.display = "none";
}

function displayResult(){
    let bet = document.querySelector("#betPoint").value;
    let choice = document.querySelector('input[name="userChoice"]:checked')
    console.log(choice)
    console.log(bet)

    // roll
    let shuffled = _.shuffle(Array.from(diceNumber));

    // result
    const result = shuffled[0];
    console.log(result)

    //message 
    let message = document.querySelector("#message");
    document.querySelector("#message").style.display = "block";

    // if (bet > localStorage.getItem("points")){ //point check
    //     message.textContent = "Check your points"
    //     message.style.color = 'red';
    //     return;
    // }

    if (choice.value === "odd" && (result % 2) === 1){ //win
        message.textContent = `You Win. +${bet * 2}`
        message.style.color = 'green';
        localStorage.setItem('points', Number(localStorage.getItem("points")) + Number(bet));
    }else if(choice.value === "even" && (result % 2) === 1){ //lose
        message.textContent = `You lose. -${bet}`
        message.style.color = 'red';
        localStorage.setItem('points', Number(localStorage.getItem("points")) - Number(bet));
    }else if(choice.value === "even" && (result % 2) === 0){ //win
        message.textContent = `You Win. +${bet * 2}`
        message.style.color = 'green';
        localStorage.setItem('points', Number(localStorage.getItem("points")) + Number(bet));
    }else{ //lose
        message.textContent = `You lose. -${bet}`
        message.style.color = 'red';
        localStorage.setItem('points', Number(localStorage.getItem("points")) - Number(bet));
    }

    //img
    let img = document.querySelector("#diceImg")
    img.innerHTML = `<img src=img/dice${result}.webp alt="dice${result}" id="dice">`;

    //reset input
     let choices = document.querySelectorAll('input[name="userChoice"]');
    choices.forEach(choice => choice.checked = false);

    document.getElementById('betPoint').value = "";

    // set point
    document.getElementById('point').textContent = 'Points: ' + localStorage.getItem("points");
}

function reset(){
    localStorage.setItem('points', '100');
    document.getElementById('point').textContent = 'Points: 100';

    document.getElementById('betPoint').value = "";

    let choices = document.querySelectorAll('input[name="userChoice"]');
    choices.forEach(choice => choice.checked = false);

    document.querySelector("#diceImg").innerHTML = "";

    document.querySelector("#message").textContent = "";

    document.querySelector("#message").style.display = "none";
}

