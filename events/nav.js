//	Hides/reveals workshop information located at the bottom of the Events Template, and featured inside the Reg Modal.
if (top == window) {
	$regFeature.hide()
} else {
	$regFeature.show()
}
//	? icon inside Registration Modal
$('#question-mark').jBox('Tooltip', {
	position: {
		x: 'right',
		y: 'center'
	},
	outside: 'x'
})
