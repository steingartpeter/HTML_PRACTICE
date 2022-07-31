let mainApp = {} || mainApp;

mainApp.addLightEffect = function (srcElmnt) {
  let src = srcElmnt;
  let bndRct = src.getBoundingClientRect();
  console.log();
  let oldDiv = document.querySelector(".light-run");
  if (oldDiv != null) {
    oldDiv.remove();
  }

  console.log("mousenter runs");
  const cntnrDiv = document.querySelector("#tst-04");
  let div = document.createElement("div");
  div.style.position = "relative";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.borderRadius = "50%";
  div.style.top = -(bndRct.height / 2) + 25;
  div.style.left = -(bndRct.width / 2) + 25;

  div.style.backgroundColor = "#FABE00";
  div.style.zIndex = 100;
  div.style.animation = "light-run-thrgh";
  //div.classList.add("light-run");
  cntnrDiv.appendChild(div);
};
