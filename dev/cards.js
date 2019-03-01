const cardElementsHoverTap = [
	getElementsByClassName('card-detail-circle'),
	getElementsByClassName('card-detail-day'),
	getElementsByClassName('card-detail-month'),
	getElementsByClassName('card-detail-venue'),
	getElementsByClassName('card-detail-location'),
	getElementsByClassName('card-detail-dates'),
	getElementsByClassName('card-detail-button'),
	getElementsByClassName('ribbon'),
]
const calendarCards = getElementsByClassName('card')

// Add event listener for hover or tap
for (let i = 0; i < calendarCards.length; i++) {
	// Init on window load
	calendarCards[i].classList.add('fade-transform')
	// Desktops use `mouseover` response...
	if (deviceType() === 'desktop') {
		calendarCards[i].addEventListener('mouseover', () => cardElementsHoverTap.forEach(element => element[i] ? element[i].classList.add('hover-tap') : null))
		calendarCards[i].addEventListener('mouseout', () => cardElementsHoverTap.forEach(element => element[i] ? element[i].classList.remove('hover-tap') : null))
	}
	// ...mobile and tablet use `tap` response.
	else {
		calendarCards[i].addEventListener('click', () => {
			// Add tap response...
			cardElementsHoverTap.forEach(element => {
        if (element[i]) {
          // ...if card is already active, deactivate it...
          if (element[i].classList.contains('hover-tap')) {
            element[i].classList.remove('hover-tap')
          }
          // ...otherwise, activate it.
          else {
            element[i].classList.add('hover-tap')
          }
        }
			})
			// ...and remove active states from all other cards.
			for (let j = 0; j < calendarCards.length; j++) {
				if (i !== j) {
					cardElementsHoverTap.forEach(element => element[j] ? element[j].classList.remove('hover-tap') : null)
				}
			}
		})
	}
}
