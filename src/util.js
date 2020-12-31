const KEY_LEFT = 37,
      KEY_RIGHT = 39

export function caseDataArrToDict(arr) {
  const dict = {}
  console.log(arr)
  for(let entry of arr) {
    const date = entry.date
    dict[date] = entry.data
  }
  return dict
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export function handleKeyPress(e, date, setDate, caseData, setCases) {
  
  if (![KEY_LEFT, KEY_RIGHT].includes(e.keyCode)) return

  let currentDate = new Date(date)
  
  if (e.keyCode === KEY_LEFT) {
    currentDate.setDate(currentDate.getDate() - 1)
  } else if (e.keyCode === KEY_RIGHT) {
    currentDate.setDate(currentDate.getDate() + 1)
  }
  setDate(formatDate(currentDate))
  setCases(caseData[formatDate(currentDate)])
}