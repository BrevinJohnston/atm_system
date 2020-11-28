var globalInput;
var currentUser;
var phase = "welcome";
var componentFailure = [];
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

}
function systemClock() {

}

