// mobile check
const isMobile = function(e){
  try {
    document.createEvent("TouchEvent");
    console.log('a')
    return true;
  } catch (e) {
    console.log('b')
    return false;
  }
};

const isTouch = {
  start: null,
  move: null,
  end: null,
  click: isMobile() ? "click" : "touchend",
}

const items = document.querySelectorAll('.item');
let fileSelectors = document.querySelectorAll('.fileSelector');
for (let item of items) {
  let fileSelector = item.querySelector('.fileSelector');
  fileSelector.addEventListener(isTouch.click, function(){
    item.querySelector('input').click();
  });
  item.querySelector('input').addEventListener('change', fnturnOn);
  }

let missionTexts = document.querySelectorAll('.mission');
for(let i=0; i<missionTexts.length; i++){
  missionTexts[i].innerHTML = MISSION[i];
}

function fnturnOn() {
  let input = this;
  let file = input.files[0];
  let reader = new FileReader();

  let item = this.parentNode;
  let closeBtn = item.querySelector('.btnClose');

  closeBtn.addEventListener(isTouch.click, fnturnOff);

  reader.onload = () => {
    item.style.backgroundImage = `url('${reader.result}')`;
    item.classList.toggle('turnOn');
    allowedBtn();
  }
  if (file) {
    reader.readAsDataURL(file);
  }
  
  function fnturnOff() {
    let item = this.parentNode;
    
    item.style.backgroundImage = ``;
    item.classList.remove('turnOn');
    item.children[0].value = ''
    allowedBtn();
    
  }

  function allowedBtn() {
    let enterImg = document.querySelectorAll('.item.turnOn');
    let btnSaveImg = document.querySelector('#btnSaveToImg');
    if(enterImg.length > MINCOUNT-1){
      btnSaveImg.addEventListener(isTouch.click, saveImg);
      btnSaveImg.classList.add('active')
    }else{
      btnSaveImg.removeEventListener(isTouch.click, saveImg);
      btnSaveImg.classList.remove('active')
    }
  }

}

function saveImg() {
  html2canvas(document.querySelector("#capture")).then(canvas => {
    let el = document.createElement('a');
    el.href = canvas.toDataURL('images/jpeg')
    el.download = 'tmm_MissionComplete.jpg'
    el.click();
  });
}