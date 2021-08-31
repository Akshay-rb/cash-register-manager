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
    let billAmountValue = billAmount.value
    hideMessage()
    if(billAmountValue.length === 0 || Number(billAmountValue) === 0){
        billAmountErrorMessage.style.color = 'red'
        billAmountErrorMessage.innerText ="Enter valid bill amout"
        return
    } else{
        billAmountErrorMessage.style.display = 'none'
    if(!isNaN(billAmountValue) ){
        if(billAmountValue > 0){
            cashGivenSection.style.display = 'block'
            return
        } else{
            billAmountErrorMessage.style.color = 'red'
            billAmountErrorMessage.innerText ="Enter valid bill amout"
        }
    }
}
})


checkButton.addEventListener('click', () =>{
    let billAmountValue = Number(billAmount.value)
    let cashGivenValue = Number(cashGiven.value)
    tableSection.style.display = 'none'
    hideMessage()
        if(billAmountValue >0 && cashGivenValue>0){
            if(billAmountValue> cashGivenValue){
                showMessage('cash provided should atleast be equal to the bill amount')
                tableSection.style.display = 'none'
                return
            }
            if(billAmountValue === cashGivenValue){
                tableSection.style.display = 'none'
                showMessage('No change to be returned')
                return
            }
            tableSection.style.display = 'block'
            const amountToBeReturned = cashGiven.value - billAmount.value
            calculateChange(amountToBeReturned)
        }else{
                showMessage('Enter valid bill amount and cash given')
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