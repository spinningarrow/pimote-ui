const API_URL = 'http://localhost:3000'

document.addEventListener('click', event => {
	if (event.target.tagName !== 'BUTTON') return

	const { device, action } = event.target.dataset

	fetch(`${API_URL}/devices/${device}/actions/${action}/executions`)
		.then(response => response.text())
		.then(console.log)
})
