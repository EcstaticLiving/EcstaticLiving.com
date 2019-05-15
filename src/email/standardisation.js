const standardisationName = value => {
	// Prevent ALL CAPS
	value = value.toLowerCase()
	// Title case
	value = value.charAt(0).toUpperCase() + value.slice(1)
	// No empty spaces
	return value.includes(' ') ? value.replace(' ', '') : value
}

const standardisationEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim
