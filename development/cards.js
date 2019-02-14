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
const device = getDevice()
let isTapped = []
for (let i = 0; i < calendarCards.length; i++) {
  // Desktops use `mouseover` response, mobile and tablet use `tap` response.
  if (device === 'desktop') {
    calendarCards[i].addEventListener('mouseover', () => calendarCardElements.forEach(element => element[i].classList.add('hover-tap')))
    calendarCards[i].addEventListener('mouseout', () => calendarCardElements.forEach(element => element[i].classList.remove('hover-tap')))
  }
  else {
    calendarCards[i].addEventListener('click', () => {
      // Add tap response...
      calendarCardElements.forEach(element => element[i].classList.add('hover-tap'))
      isTapped[i] = true
      // ...and remove active states from all other cards.
      for (let j = 0; j < calendarCards.length; j++) {
        if (i !== j) {
          calendarCardElements.forEach(element => element[j].classList.remove('hover-tap'))
        }
      }
    })
  }
}
