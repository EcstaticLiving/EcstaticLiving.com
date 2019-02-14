const calendarCardElements = [
  document.getElementsByClassName('calendar-detail-box'),
  document.getElementsByClassName('calendar-detail-day'),
  document.getElementsByClassName('calendar-detail-month'),
  document.getElementsByClassName('calendar-detail-venue'),
  document.getElementsByClassName('calendar-detail-location'),
  document.getElementsByClassName('calendar-detail-dates'),
  document.getElementsByClassName('card-button')
]
const calendarCards = document.getElementsByClassName('card')
let isTapped = false
for (let i = 0; i < calendarCards.length; i++) {
  calendarCards[i].addEventListener('mouseover', () => {
    isTapped = true
    calendarCardElements.forEach(element => element[i].classList.add('hover-tap'))
    console.log(isTapped)
  })
  calendarCards[i].addEventListener('mouseout', () => {
    isTapped = false
    calendarCardElements.forEach(element => element[i].classList.remove('hover-tap'))
    console.log(isTapped)
  })
  calendarCards[i].addEventListener('click', () => {
    if (!isTapped) {
      calendarCardElements.forEach(element => element[i].classList.remove('hover-tap'))
    }
    else {
      calendarCardElements.forEach(element => element[i].classList.add('hover-tap'))
    }
    console.log(isTapped)
  })
}
