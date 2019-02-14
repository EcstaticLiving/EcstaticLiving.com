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
const device = getDevice()
for (let i = 0; i < calendarCards.length; i++) {
  if (device === 'desktop') {
    calendarCards[i].addEventListener('mouseover', () => calendarCardElements.forEach(element => element[i].classList.add('hover-tap')))
    calendarCards[i].addEventListener('mouseout', () => calendarCardElements.forEach(element => element[i].classList.remove('hover-tap')))
  }
  else {
    calendarCards[i].addEventListener('click', () => {
      if (isTapped) {
        calendarCardElements.forEach(element => element[i].classList.remove('hover-tap'))
        isTapped = false
      }
      else {
        calendarCardElements.forEach(element => element[i].classList.add('hover-tap'))
        isTapped = true
      }
    })
  }
}
