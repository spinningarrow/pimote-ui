const API_URL = 'http://localhost:3000'

const triggerAction = (device, action) =>
	fetch(`${API_URL}/devices/${device}/actions/${action}/executions`)
		.then(r => r.json())
		.then(console.log)

const Action = (device, action) => `
	<button onclick="triggerAction('${device}', '${action}')">${action}</button>
`

const Device = ({ name, actions }) => `
	<h2>${name}</h2>
	${actions.map(Action.bind(null, name)).join('')}
`

const App = data => `
	${data.map(Device).join('')}
`

const render = html =>
	document.querySelector('main').innerHTML = html

const fetchData = async () => {
	const devices = await fetch(`${API_URL}/devices`).then(r => r.json())
	const actions = await Promise.all(devices.map(device =>
		fetch(`${API_URL}/devices/${device}/actions`).then(r => r.json())))

	return devices.reduce((memo, device, index) => {
		memo.push({
			name: device,
			actions: actions[index]
		})

		return memo
	}, [])
}


fetchData()
	.then(App)
	.then(render)
