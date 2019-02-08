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


function tipMessage(name, total, cash, cc) {
  return `
    <h3>${name} Tip Breakdown</h3>
    <div class="tip-table">
    <div class="total-tips"><span class="tip-key">Total Tips: </span><span class="tip-amount">$${total}</span></div>
    <div class="cash-tips"><span class="tip-key">Cash Tips: </span><span class="tip-amount">$${cash}</span></div>
    <div class="cc-tips"><span class="tip-key">Paycheck Tips: </span><span class="tip-amount">$${cc}</span></div>
    </div>
  `;
}


function tipMath() {
  window.scrollTo(0,document.body.scrollHeight);

  let barNet = Number(document.getElementById("barNet").value);
  let serverCash = Number(document.getElementById("serverCash").value);
  let busserOTR = document.getElementById("busserOTR").checked;

  if (barNet < 0) {
    barNet = barNet * -1;
    ccTips = barNet
    totalTips = barNet + serverCash;
    cashTips = serverCash;
    serverMessage = `You would get $${barNet} from the bar, but now this is what you input into the spreadsheet for paychecks.`;
  } else {
    ccTips = 0;
    totalTips = (barNet - serverCash) * -1;
    cashTips = serverCash - barNet;
    serverMessage = `<strong>You owe the bar $${barNet}.</strong>`;

  }

  if (busserOTR === true) {
    busserTipOutCash = Math.ceil(cashTips * busserPercent);
    busserTipOutCC = Math.ceil(ccTips * busserPercent);
  } else {
    busserTipOutCash = Math.ceil(totalTips * busserPercent);
    busserTipOutCC = 0;
  }

  serverMessage += `<p>Your total tips are $${totalTips}, and your total cash tips to tip out on are $${cashTips}.</p>`


  barTipOutCash = Math.ceil(cashTips * barPercent);
  barTipOutCC = Math.ceil(ccTips * barPercent);
  serverTakeHomeCash = cashTips - barTipOutCash - busserTipOutCash;

  serverTipsCC = ccTips - busserTipOutCC - barTipOutCC;

  barTotalTips = barTipOutCash + barTipOutCC;
  busserTotalTips = busserTipOutCash + busserTipOutCC;
  serverTotalTips = serverTakeHomeCash + serverTipsCC;



  tipTextBusser = tipMessage("Busser", busserTotalTips, busserTipOutCash, busserTipOutCC);
  tipTextBar = tipMessage("Bar", barTotalTips, barTipOutCash, barTipOutCC);
  tipTextServer = tipMessage("Server", serverTotalTips, serverTakeHomeCash, serverTipsCC);


  document.getElementById("tip-out-box").style.display = "block";
  document.getElementById("tip-out-message").innerHTML = serverMessage

  document.getElementById("cash-out-bar").innerHTML = tipTextBar;
  document.getElementById("cash-out-busser").innerHTML = tipTextBusser;
  document.getElementById("cash-out-server").innerHTML = tipTextServer;
}