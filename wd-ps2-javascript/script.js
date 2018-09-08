/* Task-1: посчитать сумму чисел от -1000 до 1000 */
function countSum() {
  let result = 0;

  for (let i = -1000; i <= 1000; i++) {
    result += i;
  }

  document.getElementById('sum-of-numbers').innerText = `Result = ${result}`;
}

/* Task-2: посчитать сумму чисел от -1000 до 1000, суммируя только числа, которые заканчиваются на 2,3 и 7 */
function countSum237() {
  let result = 0;
  const from = -1000;
  const to = 1000;

  for (let i = from; i <= to; i++) {
    const numberSuffix = Math.abs(i % 10);
    if (numberSuffix === 2 || numberSuffix === 3 || numberSuffix === 7) {
      result += i;
    }
  }

  document.getElementById('sum-of-numbers-2-3-7').innerText = `Result = ${result}`;
}

/* Task-3: вывести на страницу список из 50 элементов вида: *
                                                            **
                                                            *** */ //
function drawStars() {
  const amountStars = 50;
  const symbol = "*";
  let addedLine = "";
  const blockStars = document.getElementById('block-stars');
  const ulElem = document.createElement('ul');
  ulElem.classList.add("row-of-list");

  for (let i = 0; i < amountStars; i++) {
    addedLine += symbol;
    const liElem = document.createElement('li');
    liElem.innerHTML = addedLine;
    ulElem.appendChild(liElem);
  }

  blockStars.appendChild(ulElem);
  const button = document.getElementById('draw-stars');
  button.onclick = clearBlockStars;
  button.innerText = "Clear";
}

function clearBlockStars() {
  let blockStars = document.getElementById('block-stars');
  blockStars.removeChild(blockStars.getElementsByTagName('ul')[0]);
  const button = document.getElementById('draw-stars');
  button.onclick = drawStars;
  button.innerText = "Draw stars";
}

/* Task-4: вывести в формате: hh:mm:ss */
function secondsToFormatTime() {
  const secondsInHour = 3600;
  const secondsInMinute = 60;
  const resultBlock = document.getElementById('time-seconds');
  const seconds = document.getElementById('seconds').value;
  resultBlock.innerText = "";
  resultBlock.classList.remove("error-text");

  if (isContainsNotNumberCharacters(seconds) || !isInteger(seconds * 1)) {
    showErrorMessage(resultBlock);
    return;
  }

  const hh = getIntegerTimeInterval(seconds, secondsInHour) + "";
  const mm = getIntegerTimeInterval(seconds - hh * secondsInHour, secondsInMinute) + "";
  const ss = seconds - hh * secondsInHour - mm * secondsInMinute + "";

  resultBlock.innerText = `${hh.padStart(2, '0')}-${mm.padStart(2, '0')}-${ss.padStart(2, '0')}`;
}

function isContainsNotNumberCharacters(str) {
  return str.indexOf('-') >= 0 || str === "";
}

function isInteger(num) {
  return (num ^ 0) === num;
}

/* Task-5: вывести фразу вида "22 года" */
function formatAge() {
  const ageResult = document.getElementById('formated-age');
  let age = document.getElementById('age').value;

  if (isContainsNotNumberCharacters(age)) {
    showErrorMessage(ageResult);
    return;
  }

  age *= 1;
  ageResult.innerText = "";
  ageResult.classList.remove("error-text");
  ageResult.innerText = `${age} ${choiceFormatedCounterSuffix(age, yearForms)}`;
}

const yearForms = ["год", "года", "лет"];
const monthForms = ["месяц", "месяца", "месяцев"];
const dayForms = ["день", "дня", "дней"];
const hourForms = ["час", "часа", "часов"];
const minuteForms = ["минута", "минуты", "минут"];
const secondForms = ["секунда", "секунды", "секунд"];

function choiceFormatedCounterSuffix(number, counterForms) {
  const numberSuffix = number % 10;
  const numberSuffixDiv100 = number % 100;

  if (numberSuffixDiv100 > 10 && numberSuffixDiv100 < 15 || numberSuffix > 4 || numberSuffix === 0) {
    return counterForms[2];
  } else if (numberSuffix === 1) {
    return counterForms[0];
  } else {
    return counterForms[1];
  }
}

function getIntegerTimeInterval(seconds, maxTimeUnitSize) {
  return Math.floor(seconds / maxTimeUnitSize);
}

/* Task-6: вычислить промежуток времени */
function countInterval() {
  const dateIntervalResult = document.getElementById('date-interval');
  const startDateStr = document.getElementById('startDate').value;
  const endDateStr = document.getElementById('endDate').value;
  let startDate = new Date(startDateStr);
  let endDate = new Date(endDateStr);

  if (!(isCorrectDate(startDate, startDateStr)) || !(isCorrectDate(endDate, endDateStr))) {
    showErrorMessage(dateIntervalResult);
    return;
  }

  /* Swaps dates */
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  const dateIntervalArray = getDateIntervalArray(startDate, endDate);
  dateIntervalResult.innerText = "";
  dateIntervalResult.classList.remove("error-text");
  dateIntervalResult.innerText = `Между датами прошло ${dateIntervalArray.join(", ")}`;
}

/* Verifies the correct date */
function isCorrectDate(date, dateStr) {
  if (isNaN(date.getTime())) {
    return false;
  }

  let monthDay;
  if (dateStr.match(/^\d./)) {
    monthDay = dateStr.substring(dateStr.lastIndexOf('-') + 1).trim();
  } else {
    monthDay = dateStr.substring(0, dateStr.indexOf(',')).trim();
  }
  const day = monthDay.replace(/\D/g, "");

  return date.getDate() == day;
}

Date.prototype.getDaysCurrentMonth = function() {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
}

function getDateIntervalArray(startDate, endDate) {
  const timeUnits = [12,
                      /* Amount of days a month before the month of the end date */
                      new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1).getDaysCurrentMonth(),
                      24,
                      60,
                      60];

  const dateInterval = [endDate.getFullYear() - startDate.getFullYear(),
                      endDate.getMonth() - startDate.getMonth(),
                      endDate.getDate() - startDate.getDate(),
                      endDate.getHours() - startDate.getHours(),
                      endDate.getMinutes() - startDate.getMinutes(),
                      endDate.getSeconds() - startDate.getSeconds()];

  correctDateInterval(dateInterval, timeUnits);

  const dateIntervalArray = [`${dateInterval[0]} ${choiceFormatedCounterSuffix(dateInterval[0], yearForms)}`,
                           `${dateInterval[1]} ${choiceFormatedCounterSuffix(dateInterval[1], monthForms)}`,
                           `${dateInterval[2]} ${choiceFormatedCounterSuffix(dateInterval[2], dayForms)}`,
                           `${dateInterval[3]} ${choiceFormatedCounterSuffix(dateInterval[3], hourForms)}`,
                           `${dateInterval[4]} ${choiceFormatedCounterSuffix(dateInterval[4], minuteForms)}`,
                           `${dateInterval[5]} ${choiceFormatedCounterSuffix(dateInterval[5], secondForms)}`];

  return dateIntervalArray;
}

function correctDateInterval(dateInterval, timeUnits) {
  for (let i = dateInterval.length - 1; i > 0; i--) {
    if (dateInterval[i] < 0) {
      dateInterval[i] += timeUnits[i - 1];
      dateInterval[i - 1]--;
    }
  }
}

/* Task-7: знаки зодиака */
function getZodiacSign() {
  const resultBlock = document.getElementById('zodiac-result');
  const birthdayStr = document.getElementById('zodiac').value;
  const birthday = new Date(birthdayStr);
  resultBlock.innerHTML = "";
  resultBlock.classList.remove("error-text");

  if (!isCorrectDate(birthday, birthdayStr)) {
    showErrorMessage(resultBlock);
    return;
  }

  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();
  let result;

  if (month === 1 && day >= 20 || month === 2 && day <= 18) {
    result = "<img src='img/water-bearer.png' alt=zodiac><p>Aquarius</p>";
  } else if (month === 2 && day >= 19 || month === 3 && day <= 20) {
    result = "<img src='img/fish.png' alt=zodiac><p>Pisces</p>";
  } else if (month === 3 && day >= 21 || month === 4 && day <= 19) {
    result = "<img src='img/ram.png' alt=zodiac><p>Aries</p>";
  } else if (month === 4 && day >= 20 || month === 5 && day <= 20) {
    result = "<img src='img/bull.png' alt=zodiac><p>Taurus</p>";
  } else if (month === 5 && day >= 21 || month === 6 && day <= 20) {
    result = "<img src='img/twins.png' alt=zodiac><p>Gemini</p>";
  } else if (month === 6 && day >= 21 || month === 7 && day <= 22) {
    result = "<img src='img/crab.png' alt=zodiac><p>Cancer</p>";
  } else if (month === 7 && day >= 23 || month === 8 && day <= 22) {
    result = "<img src='img/lion.png' alt=zodiac><p>Leo</p>";
  } else if (month === 8 && day >= 23 || month === 9 && day <= 22) {
    result = "<img src='img/maiden.png' alt=zodiac><p>Virgo</p>";
  } else if (month === 9 && day >= 23 || month === 10 && day <= 22) {
    result = "<img src='img/scales.png' alt=zodiac><p>Libra</p>";
  } else if (month === 10 && day >= 23 || month === 11 && day <= 21) {
    result = "<img src='img/scorpion.png' alt=zodiac><p>Scorpio</p>";
  } else if (month === 11 && day >= 22 || month === 12 && day <= 21) {
    result = "<img src='img/archer.png' alt=zodiac><p>Sagittarius</p>";
  } else if (month === 12 && day >= 22 || month === 1 && day <= 19) {
    result = "<img src='img/goat.png' alt=zodiac><p>Capricorn</p>";
  }

  resultBlock.innerHTML = result;
}

/* Task-8: шахматная доска */
function drawBoard() {
  const resultBlock = document.getElementById('board-result');
  const boardSize = document.getElementById('chessboard-size').value;
  resultBlock.innerHTML = "";

  if (!boardSize.match(/^[1-9]\d*[xXхХ][1-9]\d*$/)) {
    resultBlock.appendChild(document.createElement('p'));
    showErrorMessage(resultBlock.firstChild);
    return;
  }

  const boardSizeArr = boardSize.split(/[xXхХ]/); // en & ru
  const boardWidth = parseInt(boardSizeArr[0]);
  const boardHeight = parseInt(boardSizeArr[1]);

  drawChessboard(boardWidth, boardHeight, resultBlock);
}

function clearChessboard() {
  document.getElementById('board-result').innerHTML = "";
}

function drawChessboard(boardWidth, boardHeight, resultBlock) {
  const table = document.createElement('table');
  table.classList.add("chessboard");
  resultBlock.appendChild(table);

  for (let i = 0; i < boardHeight; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < boardWidth; j++) {
      const td = document.createElement('td');
      td.classList.add("chessboard__cell");
      if ((i + j) % 2 === 0) {
        td.classList.add("chessboard__cell_white");
      } else {
        td.classList.add("chessboard__cell_black");
      }
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
}

/* Task-9: определить номер подъезда и этаж по номеру квартиры */
function getApartmentNumber() {
  const entrances = document.getElementById('entrances').value;
  const apartmentsPerFloor = document.getElementById('apartments-per-floor').value;
  const floors = document.getElementById('floors').value;
  const apartmentNumber = document.getElementById('apartment-number').value;
  const result = document.getElementById('apartment-result');

  if (!isValidApartmentParameters(entrances, apartmentsPerFloor, floors, apartmentNumber) ||
      (entrances + apartmentsPerFloor + floors + apartmentNumber).match(/[.e-]/)) {
    showErrorMessage(result);
    return;
  }

  const apartmentsPerEntrance = apartmentsPerFloor * floors;
  const entrance = Math.ceil(apartmentNumber / apartmentsPerEntrance);
  const floor = Math.ceil((apartmentNumber - apartmentsPerEntrance * (entrance - 1)) / apartmentsPerFloor);
  result.innerText = `Entrance number: ${entrance}\nFloor number: ${floor}`;
  result.classList.remove("error-text");
}

function isValidApartmentParameters(entrances, apartmentsPerFloor, floors, apartmentNumber) {
  return entrances > 0 && apartmentsPerFloor > 0 && floors > 0 && apartmentNumber > 0 &&
         entrances * apartmentsPerFloor * floors >= apartmentNumber;
}

/* Task-10: найти сумму цифр введённого числа */
function countDigitsSum() {
  const blockResult = document.getElementById('digits-sum');
  const number = document.getElementById('count-digits').value;

  if (number === "") {
    showErrorMessage(blockResult);
    return;
  }

  const result = number.replace(/\D/g, "")
                 .split('')
                 .reduce((tmpResult, number) => tmpResult + parseInt(number), 0);

  blockResult.innerText = `Result = ${result}`;
  blockResult.classList.remove("error-text");
}

/* Task-11: textarea, в который пользователь вводит ссылки */
function showSortedLinks() {
  const minLinkBlockLength = 32;
  const sortedLinks = document.getElementById('links')
                            .value
                            .split(',')
                            .map(link => link.trim().replace(/^https?:\/\//i, ""))
                            .sort()
                            .map(link => `<li><a href="http://${link}">${link}</a></li>`)
                            .join('');

  const outputArea = document.getElementById('links-result');
  outputArea.innerHTML = "";

  if (sortedLinks.length < minLinkBlockLength) {
    return;
  }

  const result = document.createElement('ul');
  result.innerHTML = sortedLinks;
  result.classList.add("row-of-list");
  outputArea.appendChild(result);
}

function clearTextArea() {
  const clearedBlock = document.getElementById('task11');
  const removedChild = clearedBlock.getElementsByTagName('ul')[0];
  clearedBlock.getElementsByTagName('textarea')[0].value = "";

  if (removedChild) {
    document.getElementById('links-result').removeChild(removedChild);
  }
}

function showErrorMessage(blockForError) {
  blockForError.innerText = "Wrong input data";
  blockForError.classList.add("error-text");
}
