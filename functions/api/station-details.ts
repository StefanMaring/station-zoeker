export async function onRequest(context: { request: Request; env: { PRIMARY_KEY: string } }) {
  const url = new URL(context.request.url)
  const stationName = url.searchParams.get('q')

  if (!stationName) {
    return new Response(JSON.stringify({ error: 'Station name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const nsResponse = await fetch(
    `https://gateway.apiportal.ns.nl/nsapp-stations/v3?q=${encodeURIComponent(stationName)}&includeNonPlannableStations=false&limit=3`,
    {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': context.env.PRIMARY_KEY,
        Accept: 'application/json',
      },
    }
  )

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