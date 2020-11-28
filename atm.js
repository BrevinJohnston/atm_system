var currentUser;
var phase = "welcome";
var billStorage = {
    billsInATM: 1000,
    valueAvailable: 50000
}
var accountDatabase = {
    customers: [customer1 = {
                  cardnumber: 200034568719,
                  pin: 1234,
                  balance: 200},
                customer2 = {
                  cardnumber: 680039564723,
                  pin: 1234,
                  balance: 100},
                customer3 = {
                  cardnumber: 302097267147,
                  pin: 3456,
                  balance: 40}
               ]
}
var componentFailure = [];
var card1 = 200034568719;
var card2 = 680039564723;
var card3 = 302097267147;

function numberInput(input) {
    if(phase !== "welcome") {
        $('#pinField').append(input);
    }
}
function enterButton() {
    let input = $(pinField).html();
    $('#pinField').html("");
    if(phase === 'checkpin') {
        checkPIN(input);
    }
    else if(phase === 'inputwithdrawalamount') {
        inputWithdrawalAmount(input);
    }
}
function cancelButton() {
    globalInput = "";
    $('#pinField').html("");
}
function insertCard(card) {
    currentUser = accountDatabase.customers.find(user => user.cardnumber == card);
    $('#message').html("Card inserted, please enter your PIN.")
    phase = "checkpin";
}
function welcome() {
    
}
function checkPIN(pin) {
    if(pin == currentUser.pin) {
        $('#message').html("PIN correct. How much would you like to withdraw today? (max $100)");            
        phase = "inputwithdrawalamount";
    }
    else {
        $('#message').html("PIN incorrect, please try again.");
    }
}
function inputWithdrawalAmount(input) {
    if(input > 100) {
        $('#message').html("Entered amount should be less than $100.") ;
    }
    else {
        verifyBalance(input);
    }
}
function verifyBalance(amount) {
    if(amount > currentUser.balance) {
        $('#message').html("Insufficient balance on account.");
    }
    else {
        verifyCash(amount);
    }
}
function verifyCash(amount) {
    if(amount > billStorage.valueAvailable) {
        $('#message').html("Insufficient withdrawal amount in ATM.");
    }
    else {
        $('#message').html(`Withdrawing $${amount} from your account...`);
        billStorage.billsInATM--;
        billStorage.valueAvailable -= amount;
        accountDatabase.customers.find(user => user === currentUser).balance -= amount;
        setTimeout(disburseCash, 3000);
    }
}
function disburseCash() {
    $('#message').html("Money has been disbursed. Have a good day!");
    $('#cashDispenser').html("<img src='bill.png' alt='bill'>");
}
function ejectCard() {

}
function systemFailure() {

}
function systemClock() {
    
}

