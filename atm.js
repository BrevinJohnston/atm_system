var globalInput;
var currentUser;
var phase = "welcome";
var componentFailure = [];


class CardScanner {
    constructor(data, status, cardInserted, cardEjector, port) {
        this.data = data;
        this.status = status;
        this.cardInserted = cardInserted;
        this.cardEjector = cardEjector;
        this.port = port
    }
}

class Keypad {
    constructor(digits, enterKey, cancelKey, port, status) {
        this.digits = digits;
        this.enterKey = enterKey;
        this.cancelKey = cancelKey;
        this.port = port;
        this.status = status
    }
}

class Monitor {
    constructor(message, status, port) {
        this.message = message;
        this.status = status;
        this. port =  port;
    }
}

class BillStorage {
    constructor(billsInATM, valueAvailable, status, port1, port2) {
        this.billsInATM = billsInATM;
        this.valueAvailable = valueAvailable;
        this.status =  status;
        this.port1 = port1
        this.port2 = port2
    }
}

var user1 = {
    cardnumber: 200034568719,
    pin: 1234,
    balance: 200
}
var user2 = {
    cardnumber: 680039564723,
    pin: 1234,
    balance: 100
}
var user3 = {
    cardnumber: 302097267147,
    pin: 3456,
    balance: 40
}

function numberInput(input) {
    if(phase !== "welcome") {
        $('#pinField').append(input);
    }
}
function enterButton() {
    globalInput = $(pinField).html();
    $('#pinField').html("");
    if(phase === 'checkpin') {
        checkPIN(globalInput);
    }
}
function cancelButton() {
    globalInput = "";
    $('#pinField').html("");
}
function insertCard(card) {
    currentUser = card;
    $('#message').html("Card inserted, please enter your PIN.")
    phase = "checkpin";
}
function welcome() {
    
}
function checkPIN(pin) {
    if(pin == currentUser.pin) {
        $('#message').html("PIN correct, how much would you like to withdraw today?\
        <ul>\
            <li>1: $100</li>")
    }
    else {
        $('#message').html("PIN incorrect, please try again.")
    }
}
function inputWithdrawalAmount() {

}
function verifyBalance() {

}
function verifyCash() {

}
function disburseCash() {

}
function ejectCard() {

}
function systemFailure() {
    if (cardScanner.status === false || keyPad.status === false || monitor.status === false || billStorage.status === false){
        $('#message').text("Broken System. Contact Support")
        ejectCard()
    }
}

//References:
// https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
// https://stackoverflow.com/questions/26584233/updating-javascript-time-every-second
function doDate() {
    var time_now = "Current Time: " + new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    $("#time-display").text(time_now);
}

setInterval(doDate, 1000);
cardScanner = new CardScanner(undefined, false, undefined, undefined, undefined)
keyPad = new Keypad(undefined, undefined, undefined, undefined, true)
monitor = new Monitor(undefined, true, undefined)
billStorage = new BillStorage(undefined, undefined, status, undefined, undefined )



systemFailure()