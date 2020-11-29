var currentUser;
var phase = "welcome";

var scb = {
    status: true
}

var cardScanner = {
    status: true
}

var keyPad = {
    status: true
}

var monitor = {
    status: true
}

var billDisburser = {
    status: true
}

var billStorage = {
    billsInATM: 1000,
    valueAvailable: 50000,
    status: true,
}

var systemDatabase = {
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
               ],
    status: true
}

var card1 = 200034568719;
var card2 = 680039564723;
var card3 = 302097267147;

setInterval(systemClock, 1000);
setInterval(systemFailure, 1000);
welcome();

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
function backspace() {
    $('#pinField').html("");
}
function cancelButton() {
    if(phase !== "welcome") {
        globalInput = "";
        $('#pinField').html("");
        $('#message').html("Transaction canceled. Ejecting card.")
        ejectCard();
    }
}
function insertCard(card) {
    if(!currentUser) {
        i = systemDatabase.customers.findIndex(user => user.cardnumber == card);
        currentUser = systemDatabase.customers[i];
        $('#message').html("Card inserted, please enter your PIN.")
        phase = "checkpin";
        $('#cardSlot').html(`card${i+1} slotted`);
        $('#cardSlot').css("background-color", "lightgrey");
    }
}
function welcome() {
    currentUser = null;
    $('#message').html("Welcome!<br>Please insert your card to begin.");
    $('#cashDispenser').html("");
}
function checkPIN(pin) {
    if(pin == currentUser.pin) {
        $('#message').html("PIN correct.<br>How much would you like to withdraw today? (max $100)");
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
        $('#message').html("Insufficient balance on account. Ejecting card.");
        ejectCard();
    }
    else {
        verifyCash(amount);
    }
}
function verifyCash(amount) {
    if(amount > billStorage.valueAvailable) {
        $('#message').html("Insufficient withdrawal amount in ATM. Ejecting card.");
        ejectCard();
    }
    else {
        $('#message').html(`Withdrawing $${amount} from your account...`);
        billStorage.billsInATM--;
        billStorage.valueAvailable -= amount;
        systemDatabase.customers.find(user => user === currentUser).balance -= amount;
        setTimeout(disburseCash, 3000);
    }
}
function disburseCash() {
    $('#message').html("Money has been disbursed. Have a good day!");
    $('#cashDispenser').html("<img src='bill.png' alt='bill'>");
    ejectCard();
}
function ejectCard() {
    $('#cardSlot').css("background-color", "black");
    if (phase !== "systemFailure") {
        phase = "welcome";
        setTimeout(welcome, 5000);
    }
}
function systemFailure() {
    if (cardScanner.status === false ||
        keyPad.status === false ||
        monitor.status === false ||
        billStorage.status === false ||
        billDisburser.status === false ||
        systemDatabase.status === false ||
        scb.status === false){
        $('#message').text("Broken System. Contact Support.")
        phase = "systemFailure";
        ejectCard()
    }
}

//References:
// https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
// https://stackoverflow.com/questions/26584233/updating-javascript-time-every-second
function systemClock() {
    var time_now = "Current Time: " + new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    $("#time-display").text(time_now);
}
