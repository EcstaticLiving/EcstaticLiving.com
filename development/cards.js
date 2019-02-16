const cardElementsLoad = [
  document.getElementsByClassName('card-image'),
  document.getElementsByClassName('card-gradient'),
  document.getElementsByClassName('card-header-title'),
  document.getElementsByClassName('card-header-subtitle'),
  document.getElementsByClassName('card-header-intro'),
  document.getElementsByClassName('card-detail-circle'),
  document.getElementsByClassName('card-detail-day'),
  document.getElementsByClassName('card-detail-month'),
  document.getElementsByClassName('card-detail-venue'),
  document.getElementsByClassName('card-detail-location'),
  document.getElementsByClassName('card-detail-dates'),
  document.getElementsByClassName('card-detail-button'),
  document.getElementsByClassName('ribbon blue'),
  document.getElementsByClassName('ribbon green'),
  document.getElementsByClassName('ribbon red'),
  document.getElementsByClassName('banner blue'),
  document.getElementsByClassName('banner green'),
  document.getElementsByClassName('banner red')
]
const cardElementsHoverTap = [
  document.getElementsByClassName('card-detail-circle load'),
  document.getElementsByClassName('card-detail-day load'),
  document.getElementsByClassName('card-detail-month load'),
  document.getElementsByClassName('card-detail-venue load'),
  document.getElementsByClassName('card-detail-location load'),
  document.getElementsByClassName('card-detail-dates load'),
  document.getElementsByClassName('card-detail-button load'),
  document.getElementsByClassName('ribbon blue load'),
  document.getElementsByClassName('ribbon green load'),
  document.getElementsByClassName('ribbon red load')
]
const calendarCards = document.getElementsByClassName('card')
const device = getDevice()

// Add event listener for hover or tap
for (let i = 0; i < calendarCards.length; i++) {

  // Init on window load
  onLoad(window, () => cardElementsLoad.forEach(element => element[i].classList.add('on-load')))

  // Desktops use `mouseover` response...
  if (device === 'desktop') {
    calendarCards[i].addEventListener('mouseover', () => cardElementsHoverTap.forEach(element => element[i].classList.add('on-hover-tap')))
    calendarCards[i].addEventListener('mouseout', () => cardElementsHoverTap.forEach(element => element[i].classList.remove('on-hover-tap')))
  }
  // ...mobile and tablet use `tap` response.
  else {
    calendarCards[i].addEventListener('click', () => {
      // Add tap response...
      cardElementsHoverTap.forEach(element => {
        // ...if card is already active, deactivate it...
        if (element[i].classList.contains('on-hover-tap')) {
          element[i].classList.remove('on-hover-tap')
        }
        // ...otherwise, activate it.
        else {
          element[i].classList.add('on-hover-tap')
        }
      })
      // ...and remove active states from all other cards.
      for (let j = 0; j < calendarCards.length; j++) {
        if (i !== j) {
          cardElementsHoverTap.forEach(element => element[j].classList.remove('on-hover-tap'))
        }
      }
    })
  }
}
