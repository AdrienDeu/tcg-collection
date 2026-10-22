export async function fetchCards() {
  const response = await fetch('http://localhost:3001/cards')

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  // The API response shape is not validated here.
  return response.json()
}
