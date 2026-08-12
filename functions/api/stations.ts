export async function onRequest(context: { request: Request; env: { PRIMARY_KEY: string } }) {
  const url = new URL(context.request.url)
  const searchQuery = url.searchParams.get('q')

  const nsUrl = searchQuery
    ? `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=${encodeURIComponent(searchQuery)}&countryCodes=nl`
    : 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?countryCodes=NL'

  const nsResponse = await fetch(nsUrl, {
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': context.env.PRIMARY_KEY,
      Accept: 'application/json',
    },
  })

  if (!nsResponse.ok) {
    return new Response(JSON.stringify({ error: nsResponse.statusText }), {
      status: nsResponse.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await nsResponse.json()

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}