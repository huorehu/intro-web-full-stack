/* Task-1: посчитать сумму чисел от -1000 до 1000 */
function countSum() {
  var result = 0;
  for (var i = -1000; i <= 1000; i++) {
    result += i;
  }
  document.getElementById('sum-of-numbers').innerHTML = "Result = " + result;
}

/* Task-2: посчитать сумму чисел от -1000 до 1000, суммируя только числа, которые заканчиваются на 2,3 и 7 */
function countSum237() {
  var result = 0;
  var from = -1000;
  var to = 1000;
  for (var i = from; i <= to; i++) {
    var numberSuffix = Math.abs(i % 10);
    if (numberSuffix == 2 || numberSuffix == 3 || numberSuffix == 7) {
      result += i;
    }
  }
  document.getElementById('sum-of-numbers-2-3-7').innerHTML = "Result = " + result;
}

/* Task-3: вывести на страницу список из 50 элементов вида: *
                                                            **
                                                            *** */ //
function drawStars() {
  var amountStars = 50;
  var symbol = "*";
  var addedLine = "";
  var blockStars = document.getElementById('block-stars');
  var ulElem = document.createElement('ul');
  for (var i = 0; i < amountStars; i++) {
    addedLine += symbol;
    var liElem = document.createElement('li');
    liElem.innerHTML = addedLine;
    ulElem.appendChild(liElem);
  }
  blockStars.appendChild(ulElem);
  var button = document.getElementById('draw-stars');
  button.onclick = clearBlockStars;
  button.innerHTML = "Clear";
}

function clearBlockStars() {
  var blockStars = document.getElementById('block-stars');
  blockStars.removeChild(blockStars.getElementsByTagName('ul')[0]);
  var button = document.getElementById('draw-stars');
  button.onclick = drawStars;
  button.innerHTML = "Draw stars";
}

/* Task-4: вывести в формате: hh:mm:ss */ //
function secondsToFormatTime() {
  var secondsInHour = 3600;
  var secondsInMinute = 60;
  var resultBlock = document.getElementById('time-seconds');
  resultBlock.innerHTML = "";
  var seconds = document.getElementById('seconds').value;
  if (seconds < 0) {
    showErrorMessage(resultBlock);
    return;
  }
  var hh = getIntegerTimeInterval(seconds, secondsInHour);
  var mm = getIntegerTimeInterval(seconds - hh * secondsInHour, secondsInMinute);
  var ss = seconds - hh * secondsInHour - mm * secondsInMinute;
  resultBlock.innerHTML = normalizeNumber(hh) + "-" + normalizeNumber(mm) + "-" + normalizeNumber(ss);
  resultBlock.style.color = "#000";
}

function normalizeNumber(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

/* Task-5: вывести фразу вида "22 года" */
function formatAge() {
  var ageResult = document.getElementById('formated-age');
  var age = document.getElementById('age').value * 1;
  if (age < 0) {
    showErrorMessage(ageResult);
    return;
  }
  ageResult.innerHTML = "";
  ageResult.innerHTML = age + 0 + " " + choiceFormatingCounterSuffix(age, yearForms);
  ageResult.style.color = "#000";
}

const yearForms = ["год", "года", "лет"];
const monthForms = ["месяц", "месяца", "месяцев"];
const dayForms = ["день", "дня", "дней"];
const hourForms = ["час", "часа", "часов"];
const minuteForms = ["минута", "минуты", "минут"];
const secondForms = ["секунда", "секунды", "секунд"];

function choiceFormatingCounterSuffix(number, counterForms) {
  var numberSuffix = number % 10;
  var numberSuffixDiv100 = number % 100;
  if (numberSuffixDiv100 > 10 && numberSuffixDiv100 < 15 || numberSuffix > 4 || numberSuffix == 0) {
    return counterForms[2];
  } else if (numberSuffix == 1) {
    return counterForms[0];
  } else if (numberSuffix > 1) {
    return counterForms[1];
  }
  return "error";
}

function getIntegerTimeInterval(seconds, maxTimeUnitSize) {
  return Math.floor(seconds / maxTimeUnitSize);
}

/* Task-6: вычислить промежуток времени */
function countInterval() {
  var dateIntervalResult = document.getElementById('date-interval');
  var startDate = new Date(document.getElementById('startDate').value);
  var endDate = new Date(document.getElementById('endDate').value);
  if (isNaN(endDate.getTime()) || isNaN(startDate.getTime())) {
    showErrorMessage(dateIntervalResult);
    return;
  }
  dateIntervalResult.innerHTML = "";
  var seconds = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;
  var dateIntervalArray = getDateIntervalArray(seconds);
  dateIntervalResult.innerHTML = "Между датами прошло " + dateIntervalArray.join(", ");
  dateIntervalResult.style.color = "#000";
}

function getDateIntervalArray(seconds) {
  var secondsInUnit = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hh: 3600,
    mm: 60
  }
  var passedTime = 0;
  var years = getIntegerTimeInterval(seconds - passedTime, secondsInUnit.year);
  var months = getIntegerTimeInterval(seconds - (passedTime += years * secondsInUnit.year), secondsInUnit.month);
  var days = getIntegerTimeInterval(seconds - (passedTime += months * secondsInUnit.month), secondsInUnit.day);
  var hh = getIntegerTimeInterval(seconds - (passedTime += days * secondsInUnit.day), secondsInUnit.hh);
  var mm = getIntegerTimeInterval(seconds - (passedTime += hh * secondsInUnit.hh), secondsInUnit.mm);
  var ss = (seconds - (passedTime + mm * secondsInUnit.mm)) % secondsInUnit.mm;
  var dateIntervalArray = [years + " " + choiceFormatingCounterSuffix(years, yearForms),
                      months + " " + choiceFormatingCounterSuffix(months, monthForms),
                      days + " " + choiceFormatingCounterSuffix(days, dayForms),
                      hh + " " + choiceFormatingCounterSuffix(hh, hourForms),
                      mm + " " + choiceFormatingCounterSuffix(mm, minuteForms),
                      ss + " " + choiceFormatingCounterSuffix(ss, secondForms)];
  return dateIntervalArray;
}

/* Task-7: знаки зодиака */
function getZodiacSign() {
  var resultBlock = document.getElementById('zodiac-result');
  resultBlock.innerHTML = "";
  var birthday = new Date(document.getElementById('zodiac').value);
  if (isNaN(birthday.getDate())) {
    resultBlock.appendChild(document.createElement('p'));
    showErrorMessage(resultBlock.firstChild);
  }
  var month = birthday.getMonth() + 1;
  var day = birthday.getDate();
  var result = document.createElement('div');
  if (month == 1 && day >= 20 || month == 2 && day <= 18) {
    result.innerHTML = "<img src='img/water-bearer.png' alt=zodiac><p>Water-bearer</p>";
  } else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
    result.innerHTML = "<img src='img/fish.png' alt=zodiac><p>Fish</p>";
  } else if (month == 3 && day >= 21 || month == 4 && day <= 19) {
    result.innerHTML = "<img src='img/ram.png' alt=zodiac><p>Ram</p>";
  } else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
    result.innerHTML = "<img src='img/bull.png' alt=zodiac><p>Bull</p>";
  } else if (month == 5 && day >= 21 || month == 6 && day <= 20) {
    result.innerHTML = "<img src='img/twins.png' alt=zodiac><p>Twins</p>";
  } else if (month == 6 && day >= 21 || month == 7 && day <= 22) {
    result.innerHTML = "<img src='img/crab.png' alt=zodiac><p>Crab</p>";
  } else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
    result.innerHTML = "<img src='img/lion.png' alt=zodiac><p>Lion</p>";
  } else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
    result.innerHTML = "<img src='img/maiden.png' alt=zodiac><p>Maiden</p>";
  } else if (month == 9 && day >= 23 || month == 10 && day <= 22) {
    result.innerHTML = "<img src='img/scales.png' alt=zodiac><p>Scales</p>";
  } else if (month == 10 && day >= 23 || month == 11 && day <= 21) {
    result.innerHTML = "<img src='img/scorpion.png' alt=zodiac><p>Scorpion</p>";
  } else if (month == 11 && day >= 22 || month == 12 && day <= 21) {
    result.innerHTML = "<img src='img/archer.png' alt=zodiac><p>Archer</p>";
  } else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
    result.innerHTML = "<img src='img/goat.png' alt=zodiac><p>Goat</p>";
  }
  resultBlock.appendChild(result);
}

/* Task-8: шахматная доска */
function drawBoard() {
  var resultBlock = document.getElementById('board-result');
  resultBlock.innerHTML = "";
  var boardSize = document.getElementById('chessboard').value;
  var boardWidth = parseInt(boardSize);
  var boardHeight = getBoardHeight(boardSize) * 1;
  if (boardWidth <= 0 || boardHeight <= 0 || (boardHeight + "") == "NaN") {
    resultBlock.appendChild(document.createElement('p'));
    showErrorMessage(resultBlock.firstChild);
    return;
  }
  drawChessboard(boardWidth, boardHeight, resultBlock);
}

function clearChessboard() {
  document.getElementById('board-result').innerHTML = "";
}

function drawChessboard(boardWidth, boardHeight, resultBlock) {
  var table = document.createElement('table');
  resultBlock.appendChild(table);
  for (var i = 0; i < boardHeight; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < boardWidth; j++) {
      var td = document.createElement('td');
      if ((i + j) % 2 == 0) {
        td.style.background = "#fff";
      } else {
        td.style.background = "#000";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function getBoardHeight(boardSize) {
  var indexOfHeightValue;
  if (boardSize) {
    boardSize += "";
    indexOfHeightValue = boardSize.indexOf('x'); // For english 'x'
    indexOfHeightValue = indexOfHeightValue > 0 ? ++indexOfHeightValue : boardSize.indexOf('х') + 1; // For russian 'x'
    if (indexOfHeightValue > 1 && indexOfHeightValue < boardSize.length) {
      return boardSize.substring(indexOfHeightValue);
    }
  }
  return -1;
}

/* Task-9: определить номер подъезда и этаж по номеру квартиры */
function getAppartmentNumber() {
  var entrances = document.getElementById('entrances').value;
  var appartmentsPerFloor = document.getElementById('appartments-per-floor').value;
  var floors = document.getElementById('floors').value;
  var appartmentNumber = document.getElementById('appartment-number').value;
  var result = document.getElementById('appartment-result');
  if (!isValidAppartmentParameters(entrances, appartmentsPerFloor, floors, appartmentNumber)) {
    showErrorMessage(result);
    return;
  }
  var amountHouseAppartments = entrances * appartmentsPerFloor * floors;
  var appartmentsPerEntrance = appartmentsPerFloor * floors;
  var entrance = intDivUpAround(appartmentNumber, appartmentsPerEntrance);
  var floor = intDivUpAround((appartmentNumber - appartmentsPerEntrance * (entrance - 1)), appartmentsPerFloor);
  result.innerHTML = "Entrance number: " + entrance + "<br>Floor number: " + floor;
  result.style.color = "#000";
}

function isValidAppartmentParameters(entrances, appartmentsPerFloor, floors, appartmentNumber) {
  return entrances * 1 > 0 && appartmentsPerFloor * 1 > 0 && floors * 1 > 0 && appartmentNumber * 1 > 0 &&
         (entrances * appartmentsPerFloor * floors) >= appartmentNumber;
}

function intDivUpAround(num, div) {
  return intDivision(num, div) - (intDivision((div - (num % div)), div) - 1);
}

function intDivision(num, div) {
  return (num - num % div) / div;
}

/* Task-10: найти сумму цифр введённого числа */
function countDigitsSum() {
  var result = 0;
  var blockResult = document.getElementById('digits-sum');
  var number = document.getElementById('count-digits').value;
  for (var i = 0; i < number.length; i++) {
    result += parseInt(number.charAt(i));
  }
  if (number < 0) {
    showErrorMessage(blockResult);
    return;
  }
  blockResult.innerHTML = "Result = " + result;
  blockResult.style.color = "#000";
}

countDigitsSum();

/* Task-11: textarea, в который пользователь вводит ссылки */
function showSortedLinks() {
  var links = document.getElementById('links').value.split(',');
  if (links.length < 2 && links[0] == "") {
    return;
  }
  var linksMap = {};
  var sortedLInks = [];
  for (var i = 0; i < links.length; i++) {
    sortedLInks[i] = links[i].trim().replace(/^https?:\/\//, "");
    linksMap[sortedLInks[i]] = links[i];
  }
  sortedLInks.sort();
  var result = document.createElement('ul');
  for (var i = 0; i < links.length; i++) {
    link = document.createElement('li');
    link.innerHTML = "<a href=" + linksMap[sortedLInks[i]] + " alt=link>" + sortedLInks[i] + "</a>";
    result.appendChild(link);
  }
  var linksResult = document.getElementById('links-result');
  var removedLinks = linksResult.getElementsByTagName('ul')[0];
  if (removedLinks) {
    linksResult.removeChild(removedLinks);
  }
  linksResult.appendChild(result);
}

function clearTextArea() {
  var clearedBlock = document.getElementById('task11');
  var removedChild = clearedBlock.getElementsByTagName('ul')[0];
  clearedBlock.getElementsByTagName('textarea')[0].value = "";
  if (removedChild) {
    document.getElementById('links-result').removeChild(removedChild);
  }
}

function showErrorMessage(blockForError) {
  blockForError.innerHTML = "Wrong input data";
  blockForError.style.color = "red";
}
