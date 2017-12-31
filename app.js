const API_URL = 'http://localhost:3000'

const triggerAction = (device, action) =>
	fetch(`${API_URL}/devices/${device}/actions/${action}/executions`)
		.then(r => r.json())
		.then(console.log)

const Action = (device, action) => `
	<button onclick="triggerAction('${device}', '${action}')" data-action="${action}">
		${action.replace(/-/g, ' ')}
	</button>
`

const Device = ({ name, actions }) => `
	<div class="device" id="${name}">
		<a class="device-name" href="#${name}">${name}</a>
		<div class="actions">
			${actions.map(Action.bind(null, name)).join('')}
		</div>
	</div>
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
