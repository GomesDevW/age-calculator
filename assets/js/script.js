"use strict";

var dayInput = document.querySelector("#day");
var monthInput = document.querySelector("#month");
var yearInput = document.querySelector("#year");
var resultBtn = document.querySelector("button");
var dayResult = document.querySelector("#day-result");
var clearBtn = document.querySelector(".clear")
var monthResult = document.querySelector("#month-result");
var yearResult = document.querySelector("#year-result");
var resultLine = document.querySelector(".result-lines");
var msgDay = document.querySelector("#error-message-day");
var msgMonth = document.querySelector("#error-message-month");
var msgYear = document.querySelector("#error-message-year");


dayInput.focus()

dayInput.addEventListener('input', function() {
  if(dayInput.value.length === 2){
    monthInput.focus()
  }
})

monthInput.addEventListener('input', function() {
  if(monthInput.value.length === 2){
    yearInput.focus()
  }
})

yearInput.addEventListener('input', function() {
  if(yearInput.value.length === 4){
    resultBtn.focus()
  }
})

clearBtn.addEventListener('click', function (){
  dayInput.value = ''
  monthInput.value = ''
  yearInput.value = ''
  dayResult.innerHTML = "- -";
  monthResult.innerHTML = "- -";
  yearResult.innerHTML = "- -";

})

resultBtn.addEventListener("click", function () {

  if (dayInput.value === "") {
    msgDay.innerHTML = "This field is required";
    dayInput.style.borderColor = "rgb(252, 29, 0)";
    return;
  } else {
    msgDay.innerHTML = "";
    dayInput.style.borderColor = "hsl(0, 0%, 86%)";
  }

  if (monthInput.value === "") {
    msgMonth.innerHTML = "This field is required";
    monthInput.style.borderColor = "rgb(252, 29, 0)";
    return;
  } else {
    msgMonth.innerHTML = "";
    monthInput.style.borderColor = "hsl(0, 0%, 86%)";
  }

  if (yearInput.value === "") {
    msgYear.innerHTML = "This field is required";
    yearInput.style.borderColor = "rgb(252, 29, 0)";
    return;
  } else {
    msgYear.innerHTML = "";
    yearInput.style.borderColor = "hsl(0, 0%, 86%)";
  }

  var year = parseInt(yearInput.value);
  var month = parseInt(monthInput.value);
  var day = parseInt(dayInput.value);

  if (isValidDate(year, month, day)) {
    var birthday = new Date(year, month - 1, day);
    var result = ageCalc(birthday);

    if (!(birthday > new Date())) {
      dayResult.textContent = result.days;
      monthResult.textContent = result.months;
      yearResult.textContent = result.ages;
    }
  } else {

    dayResult.innerHTML = "- -";
    monthResult.innerHTML = "- -";
    yearResult.innerHTML = "- -";
    yearInput.style.borderColor = "rgb(252, 29, 0)";
    monthInput.style.borderColor = "rgb(252, 29, 0)";
    dayInput.style.borderColor = "rgb(252, 29, 0)";
    alert("Choose a later date than the current one or check if this date exists!\nFormat: DD/MM/YYYY\nDay: 01 to 31\nMonth: 01 to 12\nYear: 1 to current year");
  }

});

function isValidDate(year, month, day) {
  var date = new Date(year, month - 1, day);
  var currentDate = new Date();

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    currentDate >= date
  );
}

function ageCalc(birthday) {
  var currentDate = new Date();
  var birthDate = new Date(birthday);
  var age = currentDate.getFullYear() - birthDate.getFullYear();
  var months = currentDate.getMonth() - birthDate.getMonth();
  var days = birthDate.getDate() - currentDate.getDate() ;

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
    months += 12;
  }

  var remainingMonths = months;
  var remainingDays = days;

  return {
    ages: age,
    months: remainingMonths,
    days: remainingDays
  };
}