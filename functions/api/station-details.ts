export async function onRequest(context: { request: Request; env: { PRIMARY_KEY: string } }) {
  const url = new URL(context.request.url)
  const uicCode = url.searchParams.get('uicCode')
  const stationName = url.searchParams.get('name')

  if (!uicCode && !stationName) {
    return new Response(JSON.stringify({ error: 'A UICcode or station name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const nsUrl = uicCode
    ? `https://gateway.apiportal.ns.nl/nsapp-stations/v1/station?uicCode=${encodeURIComponent(uicCode)}`
    : `https://gateway.apiportal.ns.nl/nsapp-stations/v3?q=${encodeURIComponent(stationName)}&limit=3`

  const nsResponse = await fetch(
    nsUrl,
    {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': context.env.PRIMARY_KEY,
        Accept: 'application/json',
      },
    },
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
