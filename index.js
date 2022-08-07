const page = document.querySelector(".page");
const switchA1IN = page.querySelector(".discret-in__switch-a1-in");
const switchA2IN = page.querySelector(".discret-in__switch-a2-in");
const imgSwitchA1IN = page.querySelector(".discret-in__switch-a1-in-image");
const imgSwitchA2IN = page.querySelector(".discret-in__switch-a2-in-image");
const tempRange = page.querySelector(".temperatura__range");
const elementTempValue = page.querySelector(".temperatura__value");
const elementChannel = page.querySelector(".channel__value");
const elementTimer = page.querySelector(".timer__value");
const elementControllerOnImage = page.querySelector(".controllerOn__image");

let A1_IN = false;
let A2_IN = true;
let tempValue = 0;
let tick = 0;
let count = setInterval(getTimer, 1000);

function getTimer() {
  tick = tick + 1;
  elementTimer.innerHTML = tick;
  if (setHVAC_test()) {
    if (tempValue <= 25) {
      elementChannel.innerHTML = "2000";
    } else {
      elementChannel.innerHTML = "8000";
    }
  }
}

switchA1IN.addEventListener("click", () => {
  if (A1_IN) {
    A1_IN = false;
    imgSwitchA1IN.src = "./image/smalltumboff.svg";
  } else {
    A1_IN = true;
    tick = 0;
    imgSwitchA1IN.src = "./image/smalltumb.svg";
  }
  setHVAC_test();
  console.log("ALARM A1_IN", A1_IN);
});

switchA2IN.addEventListener("click", () => {
  if (A2_IN) {
    A2_IN = false;
    imgSwitchA2IN.src = "./image/smalltumboff.svg";
  } else {
    A2_IN = true;
    if (tick > 20) {
      tick = 0;
    }
    imgSwitchA2IN.src = "./image/smalltumb.svg";
  }
  setHVAC_test();
  if (tick > 20) {
    console.log("ALARM A2_IN", A2_IN);
  }
});

function getTemp() {
  tempValue = tempRange.value;
  elementTempValue.innerHTML = tempValue;
}

function setHVAC_test() {
  if (A1_IN && !(!A2_IN && tick > 20)) {
    elementControllerOnImage.src = "./image/lamp.png";
    return true;
  } else if (!A1_IN || (!A2_IN && tick > 20)) {
    elementControllerOnImage.src = "./image/lampoff.png";
    elementChannel.innerHTML = "0";
    return false;
  }
}
