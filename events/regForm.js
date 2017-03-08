$(regButton).on('click', function() {
	// Causes Reg section to scroll smoothly on iOS
	document.getElementById('registration-section').style.webkitOverflowScrolling = 'touch'
	document.getElementById('registration-section-mobile').style.webkitOverflowScrolling = 'touch'
	resetLodging()
	if ((window.location.href === `${siteUrl}charge`) || (window.location.href === `${siteUrl}charge#`)) {
		if (device === 'mobile') { resetChargeFormMobile() }
		else { resetChargeForm() }
	} else {
		hideExperience()
		hideDiet()
		hidePartner()
		deActivateRegContinue()
		if (device == 'mobile') { resetRegFormMobile() }
		else { resetRegForm() }
	}
})

function deActivateRegContinue() {
	$(regContinue).prop('disabled', true)
	$(regContinue).css('background-color', '#cccccc')
	$(regContinueMobile).prop('disabled', true)
	$(regContinueMobile).css('background-color', '#cccccc')
}

function checkRegForm() {
	if (device == 'mobile') {
		if (
			(($(regFirstNameMobile).val() != '') && ($(regLastNameMobile).val() != '') && ($(regEmailMobile).val() != '') && ($(regMobileMobile).val() != '') && ($(regBirthdateMobile).val() != '')) &&
			(($(regFemaleMobile).is(':checked')) || ($(regMaleMobile).is(':checked')) || ($(regOtherMobile).is(':checked'))) &&
			(($(regReferralMobile).val() != '')) &&
			((($(regExpYesMobile).is(':checked')) && ($(regExpMobile).val() != '')) || ($(regExpNoMobile).is(':checked'))) &&
			((($(regDietYesMobile).is(':checked')) && ($(regDietMobile).val() != '')) || ($(regDietNoMobile).is(':checked'))) &&
			((
				(($(regTypeMobile).val() == 'Couple') || ($(regTypeMobile).val() == 'Two Singles (paired)')) &&
				($(regPartnerNameMobile).val() != '') &&
				(($(regPartnerFemaleMobile).is(':checked')) || ($(regPartnerMaleMobile).is(':checked')) || ($(regPartnerOtherMobile).is(':checked'))) &&
				($(regPayBothYesMobile).is(':checked') || ($(regPayBothNoMobile).is(':checked')))
			) || ($(regTypeMobile).val() == 'Single')) &&
			($(regLodgingMobile).val() != '') &&
			(($(regPayDepositMobile).is(':visible') && ($(regPayDepositFullMobile).is(':checked') || $(regPayDepositOnlyMobile).is(':checked'))) || ($(regPayDepositMobile).is(':hidden'))) &&
			($(regTermsMobile).is(':checked'))
		) {
			$(regContinueMobile).prop('disabled', false)
			$(regContinueMobile).css('background-color', '#9b3831')
		} else {
			deActivateRegContinue()
		}
	} else {
		if (
			(($(regFirstName).val() != '') && ($(regLastName).val() != '') && ($(regEmail).val() != '') && ($(regMobile).val() != '') && ($(regBirthdate).val() != '')) &&
			(($(regFemale).is(':checked')) || ($(regMale).is(':checked')) || ($(regOther).is(':checked'))) &&
			(($(regReferral).val() != '')) &&
			((($(regExpYes).is(':checked')) && ($(regExp).val() != '')) || ($(regExpNo).is(':checked'))) &&
			((($(regDietYes).is(':checked')) && ($(regDiet).val() != '')) || ($(regDietNo).is(':checked'))) &&
			((
				(($(regType).val() == 'Couple') || ($(regType).val() == 'Two Singles (paired)')) &&
				($(regPartnerName).val() != '') &&
				(($(regPartnerFemale).is(':checked')) || ($(regPartnerMale).is(':checked')) || ($(regPartnerOther).is(':checked'))) &&
				($(regPayBothYes).is(':checked') || ($(regPayBothNo).is(':checked')))
			) || ($(regType).val() == 'Single')) &&
			($(regLodging).val() != '') &&
			(($(regPayDeposit).is(':visible') && ($(regPayDepositFull).is(':checked') || $(regPayDepositOnly).is(':checked'))) || ($(regPayDeposit).is(':hidden'))) &&
			($(regTerms).is(':checked'))
		) {
			$(regContinue).prop('disabled', false)
			$(regContinue).css('background-color', '#9b3831')
		} else {
			deActivateRegContinue()
		}
	}
}
$(regFirstName + ',' + regLastName + ',' + regEmail + ',' + regMobile + ',' + regBirthdate + ',' + regFemale + ',' + regMale + ',' + regOther + ',' + regReferral + ',' + regExp + ',' + regDiet + ',' + regType + ',' + regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regLodging + ',' + regTerms).on('change', function() {
	//	Disable reg form verification for Charge form
	if ((window.location.href != `${siteUrl}charge`) && (window.location.href != `${siteUrl}charge#`)) {
		checkRegForm()
	}
})
$(regFirstNameMobile + ',' + regLastNameMobile + ',' + regEmailMobile + ',' + regMobileMobile + ',' + regBirthdateMobile + ',' + regFemaleMobile + ',' + regMaleMobile + ',' + regOtherMobile + ',' + regReferralMobile + ',' + regExpMobile + ',' + regDietMobile + ',' + regTypeMobile + ',' + regPartnerNameMobile + ',' + regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regLodgingMobile + ',' + regTermsMobile).on('change', function() {
	//	Disable reg form verification for Charge form
	if ((window.location.href != `${siteUrl}charge`) && (window.location.href != `${siteUrl}charge`)) {
		checkRegForm()
	}
})

function showExperience() {
	$(regExp).show()
	$(regExp).prop('disabled', false)
	$(regExp).animate({
		top: 40,
		opacity: 1
	}, 200)
	$(regExpMobile).show()
	$(regExpMobile).prop('disabled', false)
	$(regExpMobile).animate({
		top: 40,
		opacity: 1
	}, 200)
}

function hideExperience() {
	$(regExp).val('')
	$(regExp).animate({
		top: 0,
		opacity: 0
	}, 200)
	$(regExp).prop('disabled', true)
	$(regExp).hide()
	$(regExpMobile).val('')
	$(regExpMobile).animate({
		top: 0,
		opacity: 0
	}, 200)
	$(regExpMobile).prop('disabled', true)
	$(regExpMobile).hide()
}
$(regExpNo + ',' + regExpYes).change(function() {
	if ($(regExpYes).is(':checked')) showExperience()
	if ($(regExpNo).is(':checked')) hideExperience()
})
$(regExpNoMobile + ',' + regExpYesMobile).change(function() {
	if ($(regExpYesMobile).is(':checked')) showExperience()
	if ($(regExpNoMobile).is(':checked')) hideExperience()
})

function showDiet() {
	$(regDiet).show()
	$(regDiet).prop('disabled', false)
	$(regDiet).animate({
		top: 0,
		opacity: 1
	}, 200)
	$(regDietMobile).show()
	$(regDietMobile).prop('disabled', false)
	$(regDietMobile).animate({
		top: 0,
		opacity: 1
	}, 200)
}

function hideDiet() {
	$(regDiet).val('')
	$(regDiet).animate({
		top: -40,
		opacity: 0
	}, 200)
	$(regDiet).prop('disabled', true)
	$(regDiet).hide()
	$(regDietMobile).val('')
	$(regDietMobile).animate({
		top: -40,
		opacity: 0
	}, 200)
	$(regDietMobile).prop('disabled', true)
	$(regDietMobile).hide()
}
$(regDietNo + ',' + regDietYes).change(function() {
	if ($(regDietYes).is(':checked')) showDiet()
	if ($(regDietNo).is(':checked')) hideDiet()
})
$(regDietNoMobile + ',' + regDietYesMobile).change(function() {
	if ($(regDietYesMobile).is(':checked')) showDiet()
	if ($(regDietNoMobile).is(':checked')) hideDiet()
})

function showPartner() {
	if (device == 'mobile') {
		$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).show()
		$(regPartnerNameMobile + ',' + regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regPayBothNoMobile + ',' + regPayBothYesMobile).prop('disabled', false)
		$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).animate({
			top: 0,
			opacity: 1
		}, 200)
		if ($(regPayBothYesMobile).is(':checked')) {
			resetLodging('for both')
		} else {
			resetLodging('per person')
		}
	} else {
		$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).show()
		$(regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('disabled', false)
		$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).animate({
			top: 0,
			opacity: 1
		}, 200)
		if ($(regPayBothYes).is(':checked')) {
			resetLodging('for both')
		} else {
			resetLodging('per person')
		}
	}
}

function hidePartner() {
	if (device == 'mobile') {
		$(regPartnerNameMobile).val('')
		$(regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regPayBothNoMobile + ',' + regPayBothYesMobile).prop('checked', false)
		$(regPartnerNameMobile + ',' + regPartnerFemaleMobile + ',' + regPartnerMaleMobile + ',' + regPartnerOtherMobile + ',' + regPayBothNoMobile + ',' + regPayBothYesMobile).prop('disabled', true)
		$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).animate({
			top: -40,
			opacity: 0
		}, 200)
		$(regPartnerNameMobile + ',' + regPartnerGenderMobile + ',' + regPayBothTextMobile + ',' + regPayBothMobile).hide()
	} else {
		$(regPartnerName).val('')
		$(regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('checked', false)
		$(regPartnerName + ',' + regPartnerFemale + ',' + regPartnerMale + ',' + regPartnerOther + ',' + regPayBothNo + ',' + regPayBothYes).prop('disabled', true)
		$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).animate({
			top: -40,
			opacity: 0
		}, 200)
		$(regPartnerName + ',' + regPartnerGender + ',' + regPayBothText + ',' + regPayBoth).hide()
	}
	resetLodging()
}

function participants() {
	if (device == 'mobile') {
		if (($(regTypeMobile).find('option:selected').val() == 'Couple') || ($(regTypeMobile).find('option:selected').val() == 'Two Singles (paired)')) {
			return 2
		} else if ($(regTypeMobile).find('option:selected').val() == 'Single') {
			return 1
		}
	} else {
		if (($(regType).find('option:selected').val() == 'Couple') || ($(regType).find('option:selected').val() == 'Two Singles (paired)')) {
			return 2
		} else if ($(regType).find('option:selected').val() == 'Single') {
			return 1
		}
	}
}
$(`${regType}, ${regTypeMobile}`).change(function() {
	if (participants() == 2) {
		showPartner()
	} else {
		hidePartner()
	}
})
$(regPayBothNo + ',' + regPayBothYes).change(function() {
	if ($(regPayBothYes).is(':checked')) {
		resetLodging('for both')
	} else if (participants() == 2) {
		resetLodging('per person')
	} else {
		resetLodging('')
	}
})
$(regPayBothNoMobile + ',' + regPayBothYesMobile).change(function() {
	if ($(regPayBothYesMobile).is(':checked')) {
		resetLodging('for both')
	} else if (participants() == 2) {
		resetLodging('per person')
	} else {
		resetLodging('')
	}
})
