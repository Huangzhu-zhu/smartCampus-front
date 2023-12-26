function success(title, duration = 1500) {
	uni.showToast({
		title: title,
		icon: 'success',
		duration: duration,
	})
}


function loading(title, duration = 1500) {
	uni.showToast({
		title: title,
		icon: 'loading',
		duration: duration,
	})
}


function error(title, duration = 1500) {
	uni.showToast({
		title: title,
		icon: 'error',
		duration: duration,
	})
}

function info(title, duration = 1500) {
	uni.showToast({
		title: title,
		icon: 'none',
		duration: duration,
	})
}

function hide() {
	uni.hideToast()
}

export default {
	success,
	loading,
	error,
	hide,
	info
}