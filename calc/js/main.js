let barNet = 0;
let totalCash = 0;
let totalTips = 0;
let cashTips = 0;

let barPercent = .15;
let cashTipsBar = 0;
let barTipOutCheck = 0;

let busserPercent = .15;
let busserOTR = false;
let cashTipsBusser = 0;
// let busserTipOutCheck = 0;

// let takeHomeTipsCash = 0;
// let takeHomeTipsCheck = 0;

let tipTextBusser = "";
// let text = "";
// let text2 = "";
// let text3 = "";


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

  let totalCash = Number(document.getElementById("total-cash").value);
  let cashSales = Number(document.getElementById("cash-sales").value);
  let ccTips = Number(document.getElementById("cc-tips").value);
  let busserOTR = document.getElementById("busser-otr").checked;

  // let serverMessage = `<strong>You owe the bar $${cashSales}.</strong>`;
  // let barNet = Number(document.getElementById("barNet").value);

  let cashTips = Math.round(totalCash - cashSales);
  let totalTips = Number((cashTips + ccTips).toFixed(2));
  // debugger;
  // if (barNet < 0) {
    //   barNet = barNet * -1;
    //   ccTips = barNet
    //   totalTips = barNet + totalCash;
    //   cashTips = totalCash;
    //   serverMessage = `You would get $${barNet} from the bar, but now this is what you input into the spreadsheet for paychecks.`;
    // } else {
      //   ccTips = 0;
      //   totalTips = (barNet - totalCash) * -1;
      //   cashTips = totalCash - barNet;
      //   serverMessage = `<strong>You owe the bar $${barNet}.</strong>`;
      // }
      
      if (busserOTR === true) {
        cashTipsBusser = Math.ceil(cashTips * busserPercent);
        ccTipsBusser = Number((ccTips * busserPercent).toFixed(2));
      } else {
        console.log('-------');
        console.log(`TotalTips: $${totalTips}`);
        console.log(`busserPercent: $${busserPercent}`)
        cashTipsBusser = Math.ceil(totalTips * busserPercent);
        console.log(`cashTipsBusser: $${cashTipsBusser}`)
        console.log('-------');
        ccTipsBusser = 0;
      }
      // let cashTipsBusser = totalTips * busserPercent;
      // let cashTipsBar = cashTips * barPercent;
      

      

  let cashTipsBar = Math.ceil(cashTips * barPercent);
  let ccTipsBar = Number((ccTips * barPercent).toFixed(2));
 
  let cashTipsServer = Number(cashTips - cashTipsBar - cashTipsBusser);
  let ccTipsServer = Number((ccTips - ccTipsBusser - ccTipsBar).toFixed(2));

  console.log(`CC Tips: $${ccTips}`);
  console.log(`CC Tips Busser: $${ccTipsBusser}`);
  console.log(`CC Tips Bar: $${ccTipsBar}`);
  console.log(`Cash Tips Bar: $${cashTipsBar}`);

  let totalTipsBar = Number((cashTipsBar + ccTipsBar).toFixed(2));
  let totalTipsBusser = Number((cashTipsBusser + ccTipsBusser).toFixed(2));
  let totalTipsServer = Number((cashTipsServer + ccTipsServer).toFixed(2));
console.log(`Total Tips BAR: $${totalTipsBar}`)
console.log(`Total Tips Busser: $${totalTipsBusser}`)

console.log(`Server Cash Tips: $${cashTipsServer}`)
console.log(`Server CC Tips: $${ccTipsServer}`)

console.log(`Total Tips Sever: $${totalTipsServer}`)
let serverTakeHomeCash = Math.round(cashTips - cashTipsBar - cashTipsBusser);

  let tipTextBusser = tipMessage("Busser", totalTipsBusser, cashTipsBusser, ccTipsBusser);
  let tipTextBar = tipMessage("Bar", totalTipsBar, cashTipsBar, ccTipsBar);
  let tipTextServer = tipMessage("Server", totalTipsServer, cashTipsServer, ccTipsServer);


  serverMessage = `
  <p><strong>Give the bar your "Cash Sales" of $${Math.round(cashSales)}.</strong></p>
  <p>Your total tips are $${totalTips}.</p>
  <p>Your total cash tips are $${cashTips}.</p>
  <h3>Tip Cash Out</h3>
  <ul>
      <li>Give the Bar $${cashTipsBar} in cash.</li>
      <li>Give the Busser $${cashTipsBusser} in cash.</li>
      <li>You should walk home with $${serverTakeHomeCash} in cash.</li>
  </ul>
  `

  document.getElementById("tip-out-box").style.display = "block";
  document.getElementById("tip-out-message").innerHTML = serverMessage

  document.getElementById("cash-out-bar").innerHTML = tipTextBar;
  document.getElementById("cash-out-busser").innerHTML = tipTextBusser;
  document.getElementById("cash-out-server").innerHTML = tipTextServer;
}