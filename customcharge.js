if ((window.location.href === `${siteUrl}charge`) || (window.location.href === `${siteUrl}charge#`)) {
	$customChargeForm[0].reset()
	$customChargeForm.parsley()
	$customChargeForm.show()
}
