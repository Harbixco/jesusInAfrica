/**
 * Client-side Image Optimization Utility
 * Automatically scales down high-resolution camera photos and compresses them to WebP
 * before network transmission, saving bandwidth and Cloudinary storage space.
 */

export const compressImage = (
  file,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
) => {
  return new Promise((resolve) => {
    // If SVG or Animated GIF, keep as-is to preserve vector/animation data
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      return resolve(file)
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result

      img.onload = () => {
        let width = img.width
        let height = img.height

        // Calculate aspect-ratio preserved dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        // Clean rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file) // Fallback if browser fails
            }

            // Create compressed WebP file object
            const originalName = file.name.replace(/\.[^/.]+$/, '')
            const optimizedFile = new File([blob], `${originalName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            })

            console.log(
              `[Image Optimizer]: Compressed ${(file.size / 1024).toFixed(1)} KB -> ${(
                optimizedFile.size / 1024
              ).toFixed(1)} KB (${Math.round((1 - optimizedFile.size / file.size) * 100)}% saved)`
            )

            resolve(optimizedFile)
          },
          'image/webp',
          quality
        )
      }

      img.onerror = () => resolve(file)
    }

    reader.onerror = () => resolve(file)
  })
}

export default compressImage
