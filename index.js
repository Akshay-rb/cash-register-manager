const billAmount = document.querySelector("#bill-amount")
const checkButton = document.querySelector("#check-button")
const cashGiven = document.querySelector("#cash-given")
const message = document.querySelector("#error-message")
const billAmountErrorMessage = document.querySelector("#error-bill-amount")
const noOfNotes = document.querySelectorAll(".no-of-notes")
const nextButton = document.querySelector("#next-button")
const cashGivenSection = document.querySelector("#cash-given-section")
const tableSection = document.querySelector("#return-change-section")

const availableNotes = [2000,500,100,20,10,5,1]

//event listner for next button click 
nextButton.addEventListener('click', () =>{
    hideMessage()
    if(billAmount.value.length === 0 || isNaN(billAmount.value)){
        billAmountErrorMessage.style.color = 'red'
        billAmountErrorMessage.innerText ="Enter valid bill amout"
    } else{
        billAmountErrorMessage.style.display = 'none'
    if(!isNaN(billAmount.value) ){
        if(billAmount.value > 0){
            cashGivenSection.style.display = 'block'
        }
    }
}
})

// event listner for check button click
checkButton.addEventListener('click', () => {
    hideMessage()
    // if(typeof(billAmount.value) !== isNaN && typeof(cashGiven.value) !== isNaN){
        if(!isNaN(billAmount.value) && !isNaN(cashGiven.value)){
        if(billAmount.value > 0){
            if(cashGiven.value === billAmount.value){
                tableSection.style.display = 'none'
                showMessage("No change to be returned")
            }
             else if(cashGiven.value >= billAmount.value){
                tableSection.style.display = 'block'
                const amountToBeReturned = cashGiven.value - billAmount.value
                calculateChange(amountToBeReturned)
            } 
            else{
                tableSection.style.display = 'none'
                showMessage("cash provided should atleast be equal to the bill amount")
            }
        }else{
            showMessage("Invalid bill amount")
        }

    }else {
        tableSection.style.display = 'none'
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
    message.style.color ='red'
    message.innerText = msg
    if(msg.toLowerCase() === 'No change to be returned'.toLowerCase()){
        message.style.color = 'green'
    }
}