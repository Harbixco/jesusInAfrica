/**
 * Resolves a reliable millisecond timestamp for a post object.
 * Priority:
 * 1. scheduledAt (if status is scheduled)
 * 2. publishedAt (if provided as Date or ISO string)
 * 3. date (parsed human string e.g. "November 3, 2026", "September 14, 2024")
 * 4. createdAt (database creation timestamp)
 */
export const getPostTimestamp = (post) => {
  if (!post) return 0

  if (post.status === 'scheduled' && post.scheduledAt) {
    const t = new Date(post.scheduledAt).getTime()
    if (!isNaN(t)) return t
  }

  if (post.publishedAt) {
    const t = new Date(post.publishedAt).getTime()
    if (!isNaN(t)) return t
  }

  if (post.date) {
    const t = new Date(post.date).getTime()
    if (!isNaN(t)) return t
  }

  if (post.createdAt) {
    const t = new Date(post.createdAt).getTime()
    if (!isNaN(t)) return t
  }

  return 0
}

/**
 * Sorts an array of post objects from latest to oldest.
 * Returns a new sorted array.
 */
export const sortPostsLatestFirst = (posts) => {
  if (!Array.isArray(posts)) return []

  return [...posts].sort((a, b) => {
    const timeA = getPostTimestamp(a)
    const timeB = getPostTimestamp(b)

    if (timeB !== timeA) {
      return timeB - timeA // Latest timestamp first
    }

    // Tie-breaker for posts published on the same day: check createdAt
    const createdA = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const createdB = b.createdAt ? new Date(b.createdAt).getTime() : 0
    if (createdB !== createdA) {
      return createdB - createdA
    }

    // Secondary tie-breaker on ID
    return String(b._id || b.id || '').localeCompare(String(a._id || a.id || ''))
  })
}
