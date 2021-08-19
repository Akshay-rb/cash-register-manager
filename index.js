const billAmount = document.querySelector("#bill-amount")
const checkButton = document.querySelector("#check-button")
const cashGiven = document.querySelector("#cash-given")
const message = document.querySelector("#error-message")
const noOfNotes = document.querySelectorAll(".no-of-notes")

const availableNotes = [2000,500,100,20,10,5,1]

// event listner for check button click
checkButton.addEventListener('click', () => {
    hideMessage()
    if(typeof(billAmount)=== Number && typeof(cashGiven)=== Number){
        if(billAmount.value > 0){
            if(cashGiven.value >= billAmount.value){
                const amountToBeReturned = cashGiven.value - billAmount.value
                calculateChange(amountToBeReturned)
            } else{
                showMessage("cash provided should atleast be equal to the bill amount")
            }
        }else{
            showMessage("Invalid bill amount")
        }

    }else {
        showMessage("Only numbers accepted")
    }
   
})

// function to determine the change and denominations to be returned
function calculateChange(amountToBeReturned){
    for(let i =0; i<availableNotes.length;i++){
        // number of notes needed for denomination
        const numberofNotes = Math.trunc(amountToBeReturned/availableNotes[i])
        // amount left after calculating the highest denomination required 
        amountToBeReturned %= availableNotes[i]
        // update the number of notes in table for the current amount
        noOfNotes[i].innerText = numberofNotes 
    }
}

// function to hide the message
function hideMessage(){
    message.style.display = "none"
}

// function to display the message 
function showMessage(msg){
    message.style.display = "block"
    message.innerText = msg
}