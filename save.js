//	Form module
function saveForm() {
	var values = {};
	$('input, textarea, select').each(function() {
		if ($(this).is(':radio')) {
			if ($(this).is(':checked')) { values[$(this).attr('name')] = $(this).val() }
		}
		else {
			values[$(this).attr('name')] = $(this).val()
		}
	})
	localStorage.setItem('EcstaticLiving:Form', JSON.stringify(values))
}

function repopulateForm() {
	if (localStorage.getItem('EcstaticLiving:Form')) {
		var values = JSON.parse(localStorage.getItem('EcstaticLiving:Form'))
		for (var item in values) {
			if ($('*[name=' + item + ']').is(':radio')) {
				$('input[name=' + item + '][value="' + values[item] + '"]').prop('checked', true)
			}
			else {
				$('*[name=' + item + ']').val(values[item])
			}
		}
		localStorage.removeItem('EcstaticLiving:Form')
	}
}
