/**
 *
 * 抖腿么 - main.js
 *
 * @author  MaiCong <i@maicong.me>
 * @link    https://github.com/maicong/doutuime
 * @since   0.1.0
 *
 */

import { musicCDN, musicList } from '../config.json'

(() => {
  const fftSize = 1024
  const stars = []
  const points = []
  const avg_points = []
  const background_gradient_color_1 = '#000011'
  const background_gradient_color_2 = '#060D1F'
  const background_gradient_color_3 = '#02243F'
  const stars_color = '#465677'
  const stars_color_2 = '#B5BFD4'
  const stars_color_special = '#F451BA'
  const waveform_tick = 0.05
  const waveform_color = 'rgba(29, 36, 57, 0.05)'
  const waveform_color_2 = 'rgba(0,0,0,0)'
  const waveform_line_color = 'rgba(157, 242, 157, 0.11)'
  const waveform_line_color_2 = 'rgba(157, 242, 157, 0.8)'
  const bubble_avg_tick = 0.001
  const bubble_avg_color = 'rgba(29, 36, 57, 0.1)'
  const bubble_avg_color_2 = 'rgba(29, 36, 57, 0.05)'
  const bubble_avg_line_color = 'rgba(77, 218, 248, 1)'
  const bubble_avg_line_color_2 = 'rgba(77, 218, 248, 1)'
  const sin = Math.sin
  const cos = Math.cos
  const random = Math.random
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const msgElement = document.querySelector('#loading .msg')
  const TOTAL_STARS = 1500
  const STARS_BREAK_POINT = 140
  const TOTAL_POINTS = fftSize / 2
  const TOTAL_AVG_POINTS = 64
  const AVG_BREAK_POINT = 100
  const SHOW_STAR_FIELD = true
  const SHOW_WAVEFORM = true
  const SHOW_AVERAGE = true
  const PI = Math.PI
  const PI_TWO = PI * 2
  const PI_HALF = PI / 180
  let w = 0
  let h = 0
  let cx = 0
  let cy = 0
  let rotation = 0
  let startedAt
  let pausedAt
  let avg
  let ctx
  let actx
  let asource
  let gainNode
  let analyser
  let frequencyData
  let frequencyDataLength
  let timeData
  let audio_buffer
  let musicIndex
  let isLoad = false
  let isPause = false
  let playing = false

  window.addEventListener('load', initialize, false)
  window.addEventListener('resize', resizeHandler, false)

  function $ (id) {
    return document.getElementById(id)
  }

  function initialize () {
    if (!AudioContext) {
      return featureNotSupported()
    }

    if (!ctx) {
      ctx = document.createElement('canvas').getContext('2d')
      document.body.appendChild(ctx.canvas)
    }

    actx = new AudioContext()

    resizeHandler()
    initializeAudio()
  }

  function featureNotSupported () {
    hideLoader()
    return ($('no-audio').style.display = 'block')
  }

  function hideLoader () {
    return ($('loading').className = 'hide')
  }

  function initializeAudio () {
    if (isLoad) return
    musicIndex = Math.floor(Math.random() * musicList.length)
    if (!musicList[musicIndex]) {
      msgElement.textContent = '- Failed to load -'
      return
    }
    isLoad = true
    const xmlHTTP = new window.XMLHttpRequest()
    const mp3URL = `${
      process.env.NODE_ENV === 'production' && musicCDN ? musicCDN : 'music/'
    }${musicList[musicIndex]}`

    xmlHTTP.open('GET', mp3URL, true)
    xmlHTTP.responseType = 'arraybuffer'

    xmlHTTP.onprogress = function (e) {
      if (e.lengthComputable) {
        $('control').classList.remove('active')
        $('loading').classList.remove('hide')
        msgElement.textContent = `- ${Math.round((e.loaded / e.total) * 100)} % -`
      }
    }
    xmlHTTP.onload = function (e) {
      $('control').classList.add('active')
      $('loading').classList.add('hide')

      isLoad = false
      analyser = actx.createAnalyser()
      analyser.fftSize = fftSize
      analyser.minDecibels = -100
      analyser.maxDecibels = -30
      analyser.smoothingTimeConstant = 0.8

      actx.decodeAudioData(
        this.response,
        buffer => {
          msgElement.textContent = '- Ready -'

          audio_buffer = buffer
          gainNode = actx.createGain()

          gainNode.connect(analyser)
          analyser.connect(actx.destination)

          frequencyDataLength = analyser.frequencyBinCount
          frequencyData = new Uint8Array(frequencyDataLength)
          timeData = new Uint8Array(frequencyDataLength)

          createStarField()
          createPoints()
          createAudioControls()
        },
        e => {
          window.alert(e)
        }
      )
    }

    xmlHTTP.send()
  }

  function createAudioControls () {
    const control = $('control')
    control.addEventListener('click', function (e) {
      e.preventDefault()
      toggleAudio()
    })

    control.classList.add('active')

    isPause = false
    playAudio()
    hideLoader()
  }

  function toggleAudio () {
    playing ? pauseAudio() : playAudio()
  }

  function playAudio () {
    playing = true
    startedAt = pausedAt ? Date.now() - pausedAt : Date.now()
    asource = null
    asource = actx.createBufferSource()
    asource.buffer = audio_buffer
    asource.loop = false
    asource.onended = function () {
      if (isPause) return
      stopAudio()
      clearCanvas()
      initialize()
    }
    asource.connect(gainNode)
    pausedAt ? asource.start(0, pausedAt / 1000) : asource.start()
    if (musicList[musicIndex]) {
      document.title = `抖腿么: ${musicList[musicIndex].replace('.mp3', '')}`
    }
    animate()
  }

  function pauseAudio () {
    playing = false
    isPause = true
    pausedAt = Date.now() - startedAt
    asource.stop()
  }

  function stopAudio () {
    playing = false
    isPause = true
    pausedAt = null
    asource.stop()
  }

  function getAvg (values) {
    let value = 0

    values.forEach(v => {
      value += v
    })

    return value / values.length
  }

  function clearCanvas () {
    let gradient = ctx.createLinearGradient(0, 0, 0, h)

    gradient.addColorStop(0, background_gradient_color_1)
    gradient.addColorStop(0.96, background_gradient_color_2)
    gradient.addColorStop(1, background_gradient_color_3)

    ctx.beginPath()
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
    ctx.fill()
    ctx.closePath()

    gradient = null
  }

  function drawStarField () {
    let i
    let len
    let p
    let tick

    for (i = 0, len = stars.length; i < len; i++) {
      p = stars[i]
      tick = avg > AVG_BREAK_POINT ? avg / 20 : avg / 50
      p.x += p.dx * tick
      p.y += p.dy * tick
      p.z += p.dz

      p.dx += p.ddx
      p.dy += p.ddy
      p.radius = 0.2 + (p.max_depth - p.z) * 0.1

      if (p.x < -cx || p.x > cx || p.y < -cy || p.y > cy) {
        stars[i] = new Star()
        continue
      }

      ctx.beginPath()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = p.color
      ctx.arc(p.x + cx, p.y + cy, p.radius, PI_TWO, false)
      ctx.fill()
      ctx.closePath()
    }

    i = len = p = tick = null
  }

  function drawAverageCircle () {
    let i
    let len
    let p
    let value
    let xc
    let yc

    if (avg > AVG_BREAK_POINT) {
      rotation += -bubble_avg_tick
      value = avg + random() * 10
      ctx.strokeStyle = bubble_avg_line_color_2
      ctx.fillStyle = bubble_avg_color_2
    } else {
      rotation += bubble_avg_tick
      value = avg
      ctx.strokeStyle = bubble_avg_line_color
      ctx.fillStyle = bubble_avg_color
    }

    let width = (value || 100) - 100
    $('control').style.transform = `translateZ(0) scale(${value / 100 * 1.5})`
    $('control').style.filter = `drop-shadow(0 0 ${(width < 0 ? 0 : width) + 5}px #fff)`

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.lineCap = 'round'

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.translate(-cx, -cy)

    ctx.moveTo(avg_points[0].dx, avg_points[0].dy)

    for (i = 0, len = TOTAL_AVG_POINTS; i < len - 1; i++) {
      p = avg_points[i]
      p.dx = p.x + value * sin(PI_HALF * p.angle)
      p.dy = p.y + value * cos(PI_HALF * p.angle)
      xc = (p.dx + avg_points[i + 1].dx) / 2
      yc = (p.dy + avg_points[i + 1].dy) / 2

      ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    }

    p = avg_points[i]
    p.dx = p.x + value * sin(PI_HALF * p.angle)
    p.dy = p.y + value * cos(PI_HALF * p.angle)
    xc = (p.dx + avg_points[0].dx) / 2
    yc = (p.dy + avg_points[0].dy) / 2

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    ctx.quadraticCurveTo(xc, yc, avg_points[0].dx, avg_points[0].dy)

    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    i = len = p = value = xc = yc = null
  }

  function drawWaveform () {
    let i
    let len
    let p
    let value
    let xc
    let yc

    if (avg > AVG_BREAK_POINT) {
      rotation += waveform_tick
      ctx.strokeStyle = waveform_line_color_2
      ctx.fillStyle = waveform_color_2
    } else {
      rotation += -waveform_tick
      ctx.strokeStyle = waveform_line_color
      ctx.fillStyle = waveform_color
    }

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.lineCap = 'round'

    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)
    ctx.translate(-cx, -cy)

    ctx.moveTo(points[0].dx, points[0].dy)

    for (i = 0, len = TOTAL_POINTS; i < len - 1; i++) {
      p = points[i]
      value = timeData[i]
      p.dx = p.x + value * sin(PI_HALF * p.angle)
      p.dy = p.y + value * cos(PI_HALF * p.angle)
      xc = (p.dx + points[i + 1].dx) / 2
      yc = (p.dy + points[i + 1].dy) / 2

      ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    }

    value = timeData[i]
    p = points[i]
    p.dx = p.x + value * sin(PI_HALF * p.angle)
    p.dy = p.y + value * cos(PI_HALF * p.angle)
    xc = (p.dx + points[0].dx) / 2
    yc = (p.dy + points[0].dy) / 2

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc)
    ctx.quadraticCurveTo(xc, yc, points[0].dx, points[0].dy)

    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    i = len = p = value = xc = yc = null
  }

  function animate () {
    if (!playing) return

    window.requestAnimationFrame(animate)
    analyser.getByteFrequencyData(frequencyData)
    analyser.getByteTimeDomainData(timeData)
    avg = getAvg([].slice.call(frequencyData)) * gainNode.gain.value

    clearCanvas()

    if (SHOW_STAR_FIELD) {
      drawStarField()
    }

    if (SHOW_AVERAGE) {
      drawAverageCircle()
    }

    if (SHOW_WAVEFORM) {
      drawWaveform()
    }
  }

  function Star () {
    let xc
    let yc

    this.x = Math.random() * w - cx
    this.y = Math.random() * h - cy
    this.z = this.max_depth = Math.max(w / h)
    this.radius = 0.2

    xc = this.x > 0 ? 1 : -1
    yc = this.y > 0 ? 1 : -1

    if (Math.abs(this.x) > Math.abs(this.y)) {
      this.dx = 1.0
      this.dy = Math.abs(this.y / this.x)
    } else {
      this.dx = Math.abs(this.x / this.y)
      this.dy = 1.0
    }

    this.dx *= xc
    this.dy *= yc
    this.dz = -0.1

    this.ddx = 0.001 * this.dx
    this.ddy = 0.001 * this.dy

    if (this.y > cy / 2) {
      this.color = stars_color_2
    } else {
      if (avg > AVG_BREAK_POINT + 10) {
        this.color = stars_color_2
      } else if (avg > STARS_BREAK_POINT) {
        this.color = stars_color_special
      } else {
        this.color = stars_color
      }
    }

    xc = yc = null
  }

  function createStarField () {
    let i = -1

    while (++i < TOTAL_STARS) {
      stars.push(new Star())
    }

    i = null
  }

  function Point (config) {
    this.index = config.index
    this.angle = this.index * 360 / TOTAL_POINTS

    this.updateDynamics = function () {
      this.radius = Math.abs(w, h) / 10
      this.x = cx + this.radius * sin(PI_HALF * this.angle)
      this.y = cy + this.radius * cos(PI_HALF * this.angle)
    }

    this.updateDynamics()

    this.value = Math.random() * 256
    this.dx = this.x + this.value * sin(PI_HALF * this.angle)
    this.dy = this.y + this.value * cos(PI_HALF * this.angle)
  }

  function AvgPoint (config) {
    this.index = config.index
    this.angle = this.index * 360 / TOTAL_AVG_POINTS

    this.updateDynamics = function () {
      this.radius = Math.abs(w, h) / 10
      this.x = cx + this.radius * sin(PI_HALF * this.angle)
      this.y = cy + this.radius * cos(PI_HALF * this.angle)
    }

    this.updateDynamics()

    this.value = Math.random() * 256
    this.dx = this.x + this.value * sin(PI_HALF * this.angle)
    this.dy = this.y + this.value * cos(PI_HALF * this.angle)
  }

  function createPoints () {
    let i

    i = -1
    while (++i < TOTAL_POINTS) {
      points.push(new Point({index: i + 1}))
    }

    i = -1
    while (++i < TOTAL_AVG_POINTS) {
      avg_points.push(new AvgPoint({index: i + 1}))
    }

    i = null
  }

  function resizeHandler () {
    w = window.innerWidth
    h = window.innerHeight
    cx = w / 2
    cy = h / 2

    ctx.canvas.width = w
    ctx.canvas.height = h

    points.forEach(p => {
      p.updateDynamics()
    })

    avg_points.forEach(p => {
      p.updateDynamics()
    })
  }
})()
