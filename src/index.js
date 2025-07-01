addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const originalUrl = new URL(request.url)
	const targetURL = new URL(originalUrl.pathname + originalUrl.search, 'https://generativelanguage.googleapis.com')

	let init = {
			method: request.method,
			headers: request.headers,
			body: request.body,
			redirect: 'manual'
	}

	console.log("[INFO] Forwarded request:", JSON.stringify(request, null, 2))
	console.log("[INFO] Params:", JSON.stringify({
		method: request.method,
		url: targetURL.toString(),
		headers: Object.fromEntries(request.headers.entries()),
		body: request.body,
		targetURL: targetURL.toString()
	}))

	// Forward the request to the target URL and return the response directly.
	const reqP = fetch(targetURL, init)
	
	reqP.then(response => {
		console.log("[INFO] Response status:", response.status)
		console.log("[INFO] Response headers:", Object.fromEntries(response.headers.entries()))
	})
	return reqP
}
