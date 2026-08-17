export async function onRequest(context: { request: Request; env: { PRIMARY_KEY: string } }) {
  const url = new URL(context.request.url)
  const stationCode = url.searchParams.get('station')

  if (!stationCode) {
    return new Response(JSON.stringify({ error: 'Station code is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const nsResponse = await fetch(
    `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/arrivals?uicCode=${stationCode}&maxJourneys=10`,
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