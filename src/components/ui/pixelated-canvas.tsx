import { useEffect, useRef } from 'react'

type PixelShape = 'circle' | 'square'
type DistortionMode = 'repel' | 'attract' | 'swirl'
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none'

interface PixelatedCanvasProps {
  src: string
  width?: number
  height?: number
  cellSize?: number
  dotScale?: number
  shape?: PixelShape
  backgroundColor?: string
  grayscale?: boolean
  className?: string
  alt?: string
  responsive?: boolean
  dropoutStrength?: number
  interactive?: boolean
  distortionStrength?: number
  distortionRadius?: number
  distortionMode?: DistortionMode
  followSpeed?: number
  sampleAverage?: boolean
  tintColor?: string
  tintStrength?: number
  maxFps?: number
  objectFit?: ObjectFit
  jitterStrength?: number
  jitterSpeed?: number
  fadeOnLeave?: boolean
  fadeSpeed?: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function PixelatedCanvas({
  src,
  width = 400,
  height = 500,
  cellSize = 3,
  dotScale = 0.9,
  shape = 'square',
  backgroundColor = '#000000',
  grayscale = false,
  className,
  alt = 'Pixelated image',
  responsive = false,
  dropoutStrength = 0.4,
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = 'swirl',
  followSpeed = 0.2,
  sampleAverage = true,
  tintColor = '#ffffff',
  tintStrength = 0.2,
  maxFps = 60,
  objectFit = 'cover',
  jitterStrength = 4,
  jitterSpeed = 4,
  fadeOnLeave = true,
  fadeSpeed = 0.1,
}: PixelatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !context) return

    const canvasWidth = Math.max(1, Math.round(width))
    const canvasHeight = Math.max(1, Math.round(height))
    const cell = Math.max(1, cellSize)
    const columns = Math.ceil(canvasWidth / cell)
    const rows = Math.ceil(canvasHeight / cell)
    const fittedCell = clamp(dotScale, 0, 1) * cell
    const image = new Image()
    const sampleCanvas = document.createElement('canvas')
    sampleCanvas.width = canvasWidth
    sampleCanvas.height = canvasHeight
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const canInteract = interactive && !prefersReducedMotion.matches
    const target = { x: 0, y: 0, active: false }
    const pointer = { x: 0, y: 0, strength: 0 }
    let colors: Uint8ClampedArray | undefined
    let cellColors = new Float32Array(columns * rows * 3)
    let cellLuminances = new Float32Array(columns * rows)
    let frameId = 0
    let pointerTimer = 0
    let lastFrame = 0
    let disposed = false

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = responsive ? '100%' : `${canvasWidth}px`
    canvas.style.height = 'auto'

    const tintCanvas = document.createElement('canvas')
    tintCanvas.width = 1
    tintCanvas.height = 1
    const tintContext = tintCanvas.getContext('2d')
    let tint: Uint8ClampedArray = new Uint8ClampedArray([255, 255, 255, 255])
    if (tintContext) {
      tintContext.fillStyle = tintColor
      tintContext.fillRect(0, 0, 1, 1)
      tint = tintContext.getImageData(0, 0, 1, 1).data
    }

    const prepareSamples = () => {
      if (!sampleContext || !image.naturalWidth || !image.naturalHeight) return

      sampleContext.fillStyle = backgroundColor
      sampleContext.fillRect(0, 0, canvasWidth, canvasHeight)
      const scaleX = canvasWidth / image.naturalWidth
      const scaleY = canvasHeight / image.naturalHeight
      const scale =
        objectFit === 'cover' ? Math.max(scaleX, scaleY) :
          objectFit === 'contain' ? Math.min(scaleX, scaleY) :
            objectFit === 'none' ? 1 : 0
      const drawWidth = objectFit === 'fill' ? canvasWidth : image.naturalWidth * scale
      const drawHeight = objectFit === 'fill' ? canvasHeight : image.naturalHeight * scale
      sampleContext.drawImage(
        image,
        (canvasWidth - drawWidth) / 2,
        (canvasHeight - drawHeight) / 2,
        drawWidth,
        drawHeight,
      )
      colors = sampleContext.getImageData(0, 0, canvasWidth, canvasHeight).data
      cellColors = new Float32Array(columns * rows * 3)
      cellLuminances = new Float32Array(columns * rows)
      for (let row = 0; row < rows; row += 1) {
        const top = row * cell
        const bottom = Math.min(canvasHeight, top + cell)
        for (let column = 0; column < columns; column += 1) {
          const left = column * cell
          const right = Math.min(canvasWidth, left + cell)
          let red = 0
          let green = 0
          let blue = 0
          let count = 0
          if (sampleAverage) {
            for (let y = top; y < bottom; y += 1) {
              for (let x = left; x < right; x += 1) {
                const offset = (y * canvasWidth + x) * 4
                red += colors[offset]
                green += colors[offset + 1]
                blue += colors[offset + 2]
                count += 1
              }
            }
          } else {
            const offset =
              (Math.min(canvasHeight - 1, top + Math.floor((bottom - top) / 2)) * canvasWidth +
                Math.min(canvasWidth - 1, left + Math.floor((right - left) / 2))) *
              4
            red = colors[offset]
            green = colors[offset + 1]
            blue = colors[offset + 2]
            count = 1
          }
          const index = row * columns + column
          const colorIndex = index * 3
          red /= count
          green /= count
          blue /= count
          cellColors[colorIndex] = red
          cellColors[colorIndex + 1] = green
          cellColors[colorIndex + 2] = blue
          cellLuminances[index] = red * 0.299 + green * 0.587 + blue * 0.114
        }
      }
    }

    const draw = (time = 0) => {
      if (!context || disposed) return
      context.fillStyle = backgroundColor
      context.fillRect(0, 0, canvasWidth, canvasHeight)
      if (!colors) return

      const smoothing = clamp(followSpeed, 0, 1)
      const fade = clamp(fadeSpeed, 0, 1)
      const targetStrength = target.active || !fadeOnLeave ? 1 : 0
      pointer.x += (target.x - pointer.x) * smoothing
      pointer.y += (target.y - pointer.y) * smoothing
      pointer.strength += (targetStrength - pointer.strength) * (targetStrength ? smoothing : fade)
      const influence = canInteract ? pointer.strength : 0
      const radius = Math.max(1, distortionRadius)

      const mix = clamp(tintStrength, 0, 1)
      const minContrast = clamp(dropoutStrength, 0, 1) * 48
      for (let row = 0; row < rows; row += 1) {
        const top = row * cell
        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column
          const colorIndex = index * 3
          const rawRed = cellColors[colorIndex]
          const rawGreen = cellColors[colorIndex + 1]
          const rawBlue = cellColors[colorIndex + 2]
          const luminance = cellLuminances[index]
          const leftLuminance = cellLuminances[row * columns + Math.max(0, column - 1)]
          const rightLuminance = cellLuminances[row * columns + Math.min(columns - 1, column + 1)]
          const aboveLuminance = cellLuminances[Math.max(0, row - 1) * columns + column]
          const belowLuminance = cellLuminances[Math.min(rows - 1, row + 1) * columns + column]
          const contrast =
            (Math.abs(luminance - leftLuminance) +
              Math.abs(luminance - rightLuminance) +
              Math.abs(luminance - aboveLuminance) +
              Math.abs(luminance - belowLuminance)) / 4
          if (dropoutStrength > 0 && contrast < minContrast) continue

          let red = rawRed
          let green = rawGreen
          let blue = rawBlue
          if (grayscale) red = green = blue = luminance
          red += (tint[0] - red) * mix
          green += (tint[1] - green) * mix
          blue += (tint[2] - blue) * mix
          context.fillStyle = `rgb(${Math.round(red)} ${Math.round(green)} ${Math.round(blue)})`

          const centerX = column * cell + cell / 2
          const centerY = top + cell / 2
          const dx = centerX - pointer.x
          const dy = centerY - pointer.y
          const distance = Math.hypot(dx, dy)
          const strength = distance < radius ? (1 - distance / radius) * influence : 0
          let offsetX = 0
          let offsetY = 0
          if (strength > 0 && distance > 0) {
            const direction = distortionMode === 'repel' ? 1 : distortionMode === 'attract' ? -1 : 0
            if (direction) {
              offsetX = (dx / distance) * distortionStrength * strength * direction
              offsetY = (dy / distance) * distortionStrength * strength * direction
            } else {
              offsetX = (-dy / distance) * distortionStrength * strength
              offsetY = (dx / distance) * distortionStrength * strength
            }
            offsetX += Math.sin(time * 0.001 * jitterSpeed + index) * jitterStrength * strength * 0.15
            offsetY += Math.cos(time * 0.001 * jitterSpeed + index) * jitterStrength * strength * 0.15
          }

          const size = fittedCell
          const x = column * cell + (cell - size) / 2 + offsetX
          const y = top + (cell - size) / 2 + offsetY
          if (shape === 'circle') {
            context.beginPath()
            context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
            context.fill()
          } else {
            context.fillRect(x, y, size, size)
          }
        }
      }
    }

    const animate = (time: number) => {
      if (disposed) return
      const interval = 1000 / clamp(maxFps, 1, 60)
      if (time - lastFrame >= interval) {
        draw(time)
        lastFrame = time
      }
      if (canInteract && (target.active || pointer.strength > 0.01)) {
        frameId = requestAnimationFrame(animate)
      } else {
        frameId = 0
      }
    }
    const requestDraw = () => {
      if (!frameId) frameId = requestAnimationFrame(animate)
    }
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width) * canvasWidth
      target.y = ((event.clientY - rect.top) / rect.height) * canvasHeight
      target.active = true
      window.clearTimeout(pointerTimer)
      pointerTimer = window.setTimeout(() => {
        target.active = false
        requestDraw()
      }, 100)
      requestDraw()
    }
    const onPointerLeave = () => {
      window.clearTimeout(pointerTimer)
      target.active = false
      requestDraw()
    }

    image.onload = () => {
      try {
        prepareSamples()
        draw()
      } catch (error) {
        console.error(`Unable to render pixelated image from "${src}".`, error)
      }
    }
    image.onerror = () => console.error(`Unable to load pixelated image from "${src}".`)
    image.src = src

    if (canInteract) {
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerleave', onPointerLeave)
    }
    if (responsive) window.addEventListener('resize', requestDraw)

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      window.clearTimeout(pointerTimer)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', requestDraw)
      image.onload = null
      image.onerror = null
    }
  }, [
    backgroundColor,
    cellSize,
    distortionMode,
    distortionRadius,
    distortionStrength,
    dropoutStrength,
    dotScale,
    fadeOnLeave,
    fadeSpeed,
    grayscale,
    height,
    interactive,
    jitterSpeed,
    jitterStrength,
    maxFps,
    objectFit,
    responsive,
    sampleAverage,
    shape,
    src,
    tintColor,
    tintStrength,
    width,
    followSpeed,
  ])

  return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />
}
