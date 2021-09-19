
// Define speed and covvert to mps
const SPEED_SIMPLE_HUMAN = 5 * 5 / 18;
const SPEED_SPORT_HUMAN = 8 * 5 / 18;
const SPEED_SIMPLE_BYC = 20 * 5 / 18;
const SPEED_SPORT_BYC = 50 * 5 / 18;
const SPEED_SIMPLE_CAR = 70 * 5 / 18;
const SPEED_SPORT_CAR = 150 * 5 / 18;


//=============== Get HTML elements ======================
let elForm = document.querySelector('.form-js'); // Form
let elInputDistance = elForm.querySelector('.input-distance-js'); // Input for distance
let elSelect = elForm.querySelector('.select-js'); // Input for select unit
let elMessage = elForm.querySelector('.message-js'); // p tag for message wrong input data
let elOutputHuman = document.querySelector('.piyoda-js'); // output tag for human results
let elOutputByc = document.querySelector('.bycicle-js'); // output tag for bycicle results
let elOutputCar = document.querySelector('.car-js'); // output tag for car results


// ================ Functions ==========================


// Make result on format hh:mm:ss. Input: time in second
const convertTimeToHour = (timeSec) => {
  let hour = Math.floor(timeSec / 3600);
  let min = Math.floor((timeSec - hour * 3600) / 60);
  let sec = Math.floor(timeSec - hour * 3600 - min * 60);
  let result = `${hour}:`;
  result = (min < 10) ? `${result}0${min}:` : `${result}${min}:`;
  result = (sec < 10) ? `${result}0${sec}` : `${result}${sec}`;
  return result;
}


// Input distance value and calculate time and show result in tag <output></output>
const calcTime = () => {
  let distanceOnMetre = Number(elInputDistance.value.trim());
  if (isNaN(distanceOnMetre)) {
    elMessage.textContent = "Masofani raqamlarda kiriting";
    elMessage.style.display = "block";
  } else {
    distanceOnMetre = Math.abs(distanceOnMetre); // Get absolute value of distance
    elMessage.style.display = "none";
    distanceOnMetre = (elSelect.value === 'km') ? distanceOnMetre * 1000 : (elSelect.value === 'ft') ? distanceOnMetre * 0.3 : distanceOnMetre; // Convert distance to metre

    // Calculate time in second for evety vehicle
    let timeHuman = (document.querySelector(`input[name="human"]:checked`).value === 'simple') ? distanceOnMetre / SPEED_SIMPLE_HUMAN : distanceOnMetre / SPEED_SPORT_HUMAN;
    let timeByc = (document.querySelector(`input[name="bycicle"]:checked`).value === 'simple') ? distanceOnMetre / SPEED_SIMPLE_BYC : distanceOnMetre / SPEED_SPORT_BYC;
    let timeCar = (document.querySelector(`input[name="car"]:checked`).value === 'simple') ? distanceOnMetre / SPEED_SIMPLE_CAR : distanceOnMetre / SPEED_SPORT_CAR;

    // Output results with converting time in second to format hh:mm:ss
    elOutputHuman.textContent = convertTimeToHour(timeHuman);
    elOutputByc.textContent = convertTimeToHour(timeByc);
    elOutputCar.textContent = convertTimeToHour(timeCar);
  }
}

elForm.addEventListener('submit', function (e) {
  e.preventDefault();
  calcTime();
});