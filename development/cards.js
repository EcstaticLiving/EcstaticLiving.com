const elements = [
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
    elements.forEach(element => element[i].classList.add('hover-tap'))
  })
  calendarCards[i].addEventListener('mouseout', () => {
    isTapped = false
    elements.forEach(element => element[i].classList.remove('hover-tap'))
  })
  calendarCards[i].addEventListener('click', () => {
    if (isTapped) {
      elements.forEach(element => element[i].classList.remove('hover-tap'))
    }
    else {
      elements.forEach(element => element[i].classList.add('hover-tap'))
    }
  })
}
