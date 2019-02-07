let barNet = 0;
let serverCash = 0;
let totalTips = 0;
let cashTips = 0;

let barPercent = .15;
let barTipOutCash = 0;
let barTipOutCheck = 0;

let busserPercent = .15;
let busserOTR = false;
let busserTipOutCash = 0;
let busserTipOutCheck = 0;

let takeHomeTipsCash = 0;
let takeHomeTipsCheck = 0;

let tipTextBusser = "";
let text = "";
let text2 = "";
let text3 = "";

function tipMath() {
  let totalTipsInput = document.getElementById("totalTips");
  let barNet = Number(document.getElementById("barNet").value);
  let serverCash = Number(document.getElementById("serverCash").value);
  // let totalTips = 0;

  // if (isNaN(barNet) || barNet < 0) {
  if (barNet < 0) {
    barNet = barNet * -1;
    ccTips = barNet
    totalTips = barNet + serverCash;
    cashTips = serverCash;
    text = "You get $" + barNet + " from the bar. This is what you input into the spreadsheet.";
    // text2 = "Your total tips are $" + totalTips + ".";
    // text3 = "Your total cash tips to tip out on are: $" + cashTips;

  } else {
    ccTips = 0;
    totalTips = (barNet - serverCash) * -1;
    cashTips = serverCash - barNet;
    text = "You owe the bar $" + barNet + ".";
    // text2 = "Your total tips are $" + totalTips + "."
    // text3 = "Your total cash tips to tip out on are $" + cashTips;

  }
  console.log("Total Credit Card Tips: " + ccTips);
  text2 = "Your total tips are $" + totalTips + "."
  text3 = "Your total cash tips to tip out on are $" + cashTips;

  totalTipsInput.setAttribute("value", totalTips);

  let busserOTR = document.getElementById("busserOTR").checked;
  if (busserOTR === true) {
    // console.log("true! Busser will get a check")
    busserTipOutCash = Math.ceil(cashTips * busserPercent);
    busserTipOutCC = Math.ceil(ccTips * busserPercent);

  } else {
    // console.log("false! You gotta tip the busser out!")
    busserTipOutCash = Math.ceil(totalTips * busserPercent);
    busserTipOutCC = 0;
  }



  barTipOutCash = Math.ceil(cashTips * barPercent);
  barTipOutCC = Math.ceil(ccTips * barPercent);
  serverTakeHomeCash = cashTips - barTipOutCash - busserTipOutCash;

  serverTipsCC = ccTips - busserTipOutCC - barTipOutCC;

barTotalTips = barTipOutCash + barTipOutCC;
busserTotalTips = busserTipOutCash + busserTipOutCC;
serverTotalTips = serverTakeHomeCash + serverTipsCC;

  tipTextBusser = "Total Tips: $" + busserTotalTips +" Cash: $" + busserTipOutCash + " Check: $" + busserTipOutCC;

  tipTextBar = "Total Tips: $" + barTotalTips +" Cash: $" + barTipOutCash + " Check: $"+ barTipOutCC;

  tipTextServer = "Total Tips: $" + serverTotalTips +" Cash: $" + serverTakeHomeCash + " Check: $"+ serverTipsCC;

  document.getElementById("tip-out-box").style.display = "block";
  document.getElementById("tip-out").innerHTML = text
  document.getElementById("tip-out-2").innerHTML = text2;
  document.getElementById("tip-out-3").innerHTML = text3;
  document.getElementById("cash-out-bar").innerHTML = tipTextBar;
  document.getElementById("cash-out-busser").innerHTML = tipTextBusser;
  document.getElementById("cash-out-server").innerHTML = tipTextServer;
}