const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://jia-backend.vercel.app/api'
    : 'http://localhost:5000/api')

// Helper for authorized headers
const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('jia_admin_token')
  const headers = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

export const api = {
  baseUrl: API_BASE_URL,

  // GET
  async get(endpoint, params = {}) {
    const url = new URL(`${API_BASE_URL}${endpoint}`)
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        url.searchParams.append(key, params[key])
      }
    })

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'API request failed')
    }
    return data
  },

  // POST
  async post(endpoint, body = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'API request failed')
    }
    return data
  },

  // PUT
  async put(endpoint, body = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'API request failed')
    }
    return data
  },

  // DELETE
  async delete(endpoint) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'API request failed')
    }
    return data
  },

  // Upload image
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: formData,
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Image upload failed')
    }
    return data
  },

  // Upload multiple images batch
  async uploadImages(files) {
    const formData = new FormData()
    for (const file of files) {
      formData.append('images', file)
    }

    const res = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: formData,
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Multiple images upload failed')
    }
    return data
  },
}

export default api
