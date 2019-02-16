const calendarCardElements = [
  document.getElementsByClassName('card-detail-circle'),
  document.getElementsByClassName('card-detail-day'),
  document.getElementsByClassName('card-detail-month'),
  document.getElementsByClassName('card-detail-venue'),
  document.getElementsByClassName('card-detail-location'),
  document.getElementsByClassName('card-detail-dates'),
  document.getElementsByClassName('card-detail-button'),
  document.getElementsByClassName('ribbon blue'),
  document.getElementsByClassName('ribbon green'),
  document.getElementsByClassName('ribbon red')
]
const calendarCards = document.getElementsByClassName('card')
const device = getDevice()
for (let i = 0; i < calendarCards.length; i++) {
  // Desktops use `mouseover` response, mobile and tablet use `tap` response.
  if (device === 'desktop') {
    calendarCards[i].addEventListener('mouseover', () => calendarCardElements.forEach(element => element[i].classList.add('hover-tap')))
    calendarCards[i].addEventListener('mouseout', () => calendarCardElements.forEach(element => element[i].classList.remove('hover-tap')))
  }
  else {
    calendarCards[i].addEventListener('click', () => {
      // Add tap response...
      calendarCardElements.forEach(element => {
        // ...if card is already active, deactivate it...
        if (element[i].classList.contains('hover-tap')) {
          element[i].classList.remove('hover-tap')
        }
        // ...otherwise, activate it.
        else {
          element[i].classList.add('hover-tap')
        }
      })
      // ...and remove active states from all other cards.
      for (let j = 0; j < calendarCards.length; j++) {
        if (i !== j) {
          calendarCardElements.forEach(element => element[j].classList.remove('hover-tap'))
        }
      }
    })
  }
}
