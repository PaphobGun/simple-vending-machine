async function client<T>(endpoint: string, data?: T) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: data
      ? {
          'Content-Type': 'application/json',
        }
      : undefined,
  }

  return window.fetch(`/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
