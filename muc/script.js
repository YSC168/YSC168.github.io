/*
 * Noel Delgado | @pixelia_me
 *
 * Music by Term and Conditions Mixes
 * https://soundcloud.com/term-and-conditions-mixes/new-year-dubstep-minimix
*/

var media = ["https://jihulab.com/ysc168/mp3/-/raw/master/"+Math.round( Math.random() * 150 )+".mp3"


    // "https://music.yscblog.top/117.mp3"
  ],
  fftSize = 1024,
  // [32, 64, 128, 256, 512, 1024, 2048]

  background_color = "rgba(0, 0, 1, 1)",
  background_gradient_color_1 = "#000",
  background_gradient_color_2 = "#000",
  background_gradient_color_3 = "#000",
  stars_color = "#FF3354",
  stars_color_2 = "#FD7F93",
  stars_color_special = "#F451BA",
  TOTAL_STARS = 1500,
  STARS_BREAK_POINT = 140,
  stars = [],
  waveform_color = "rgba(255, 51, 84, 0.05)",
  waveform_color_2 = "rgba(255,0,0,0)",
  waveform_line_color = "rgba(255, 0, 0, 0.11)",
  waveform_line_color_2 = "rgba(255, 0, 0, 0.8)",
  waveform_tick = 0.05,
  TOTAL_POINTS = fftSize / 2,
  points = [],
  bubble_avg_color = "rgba(255, 51, 84, 0.1)",
  bubble_avg_color_2 = "rgba(255, 51, 84, 0.05)",
  bubble_avg_line_color = "rgba(255, 51, 84, 1)",
  bubble_avg_line_color_2 = "rgba(255, 51, 84, 1)",
  bubble_avg_tick = 0.001,
  TOTAL_AVG_POINTS = 64,
  AVG_BREAK_POINT = 100,
  avg_points = [],
  SHOW_STAR_FIELD = true,
  SHOW_WAVEFORM = true,
  SHOW_AVERAGE = true,
  AudioContext = window.AudioContext || window.webkitAudioContext,
  floor = Math.floor,
  round = Math.round,
  random = Math.random,
  sin = Math.sin,
  cos = Math.cos,
  PI = Math.PI,
  PI_TWO = PI * 2,
  PI_HALF = PI / 180,
  w = 0,
  h = 0,
  cx = 0,
  cy = 0,
  playing = false,
  startedAt,
  pausedAt,
  rotation = 0,
  msgElement = document.querySelector("#loading .msg"),
  avg,
  ctx,
  actx,
  asource,
  gainNode,
  analyser,
  frequencyData,
  frequencyDataLength,
  timeData;

window.addEventListener("load", initialize, false);
window.addEventListener("resize", resizeHandler, false);

function initialize() {
  if (!AudioContext) {
    return featureNotSupported();
  }

  ctx = document.createElement("canvas").getContext("2d");
  actx = new AudioContext();

  document.body.appendChild(ctx.canvas);

  resizeHandler();
  initializeAudio();
}

function featureNotSupported() {
  hideLoader();
  return (document.getElementById("no-audio").style.display = "block");
}

function hideLoader() {
  return (document.getElementById("loading").className = "hide");
}

function updateLoadingMessage(text) {
  msgElement.textContent = text;
}

function initializeAudio() {
  var xmlHTTP = new XMLHttpRequest();

  updateLoadingMessage("- 缓冲音频中 -");

  xmlHTTP.open("GET", media[0], true);
  xmlHTTP.responseType = "arraybuffer";

  xmlHTTP.onload = function(e) {
    updateLoadingMessage("- 解析音频数据 -");
    analyser = actx.createAnalyser();
    analyser.fftSize = fftSize;
    analyser.minDecibels = -100;
    analyser.maxDecibels = -30;
    analyser.smoothingTimeConstant = 0.8;

    actx.decodeAudioData(
      this.response,
      function(buffer) {
        console.timeEnd("decoding audio data");

        msgElement.textContent = "- 开始 -";

        audio_buffer = buffer;
        gainNode = actx.createGain();

        gainNode.connect(analyser);
        analyser.connect(actx.destination);

        frequencyDataLength = analyser.frequencyBinCount;
        frequencyData = new Uint8Array(frequencyDataLength);
        timeData = new Uint8Array(frequencyDataLength);

        createStarField();
        createPoints();
        createAudioControls();
      },
      function(e) {
        alert("解析错误" + e.err);
      }
    );
  };

  xmlHTTP.send();
}

function createAudioControls() {
  var playButton = document.createElement("a");

  playButton.setAttribute("id", "playcontrol");
  playButton.textContent = "暂停";
  document.body.appendChild(playButton);

  playButton.addEventListener("click", function(e) {
    e.preventDefault();
    this.textContent = playing ? "播放" : "暂停";
    toggleAudio();
  });

  playAudio();
  hideLoader();
}

function toggleAudio() {
  playing ? pauseAudio() : playAudio();
}

function playAudio() {
  playing = true;
  startedAt = pausedAt ? Date.now() - pausedAt : Date.now();
  asource = null;
  asource = actx.createBufferSource();
  asource.buffer = audio_buffer;
  asource.loop = true;
  asource.connect(gainNode);
  pausedAt ? asource.start(0, pausedAt / 1000) : asource.start();

  animate();
}

function pauseAudio() {
  playing = false;
  pausedAt = Date.now() - startedAt;
  asource.stop();
}

function getAvg(values) {
  var value = 0;

  values.forEach(function(v) {
    value += v;
  });

  return value / values.length;
}

function clearCanvas() {
  var gradient = ctx.createLinearGradient(0, 0, 0, h);

  gradient.addColorStop(0, background_gradient_color_1);
  gradient.addColorStop(0.96, background_gradient_color_2);
  gradient.addColorStop(1, background_gradient_color_3);

  ctx.beginPath();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  ctx.fill();
  ctx.closePath();

  gradient = null;
}

function drawStarField() {
  var i, len, p, tick;

  for (i = 0, len = stars.length; i < len; i++) {
    p = stars[i];
    tick = avg > AVG_BREAK_POINT ? avg / 20 : avg / 50;
    p.x += p.dx * tick;
    p.y += p.dy * tick;
    p.z += p.dz;

    p.dx += p.ddx;
    p.dy += p.ddy;
    p.radius = 0.2 + (p.max_depth - p.z) * 0.1;

    if (p.x < -cx || p.x > cx || p.y < -cy || p.y > cy) {
      stars[i] = new Star();
      continue;
    }

    ctx.beginPath();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = p.color;
    ctx.arc(p.x + cx, p.y + cy, p.radius, PI_TWO, false);
    ctx.fill();
    ctx.closePath();
  }

  i = len = p = tick = null;
}

function drawAverageCircle() {
  var i, len, p, value, xc, yc;

  if (avg > AVG_BREAK_POINT) {
    rotation += -bubble_avg_tick;
    value = avg + random() * 10;
    ctx.strokeStyle = bubble_avg_line_color_2;
    ctx.fillStyle = bubble_avg_color_2;
  } else {
    rotation += bubble_avg_tick;
    value = avg;
    ctx.strokeStyle = bubble_avg_line_color;
    ctx.fillStyle = bubble_avg_color;
  }

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.lineCap = "round";

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.translate(-cx, -cy);

  ctx.moveTo(avg_points[0].dx, avg_points[0].dy);

  for (i = 0, len = TOTAL_AVG_POINTS; i < len - 1; i++) {
    p = avg_points[i];
    p.dx = p.x + value * sin(PI_HALF * p.angle);
    p.dy = p.y + value * cos(PI_HALF * p.angle);
    xc = (p.dx + avg_points[i + 1].dx) / 2;
    yc = (p.dy + avg_points[i + 1].dy) / 2;

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
  }

  p = avg_points[i];
  p.dx = p.x + value * sin(PI_HALF * p.angle);
  p.dy = p.y + value * cos(PI_HALF * p.angle);
  xc = (p.dx + avg_points[0].dx) / 2;
  yc = (p.dy + avg_points[0].dy) / 2;

  ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
  ctx.quadraticCurveTo(xc, yc, avg_points[0].dx, avg_points[0].dy);

  ctx.stroke();
  ctx.fill();
  ctx.restore();
  ctx.closePath();

  i = len = p = value = xc = yc = null;
}

function drawWaveform() {
  var i, len, p, value, xc, yc;

  if (avg > AVG_BREAK_POINT) {
    rotation += waveform_tick;
    ctx.strokeStyle = waveform_line_color_2;
    ctx.fillStyle = waveform_color_2;
  } else {
    rotation += -waveform_tick;
    ctx.strokeStyle = waveform_line_color;
    ctx.fillStyle = waveform_color;
  }

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.lineCap = "round";

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.translate(-cx, -cy);

  ctx.moveTo(points[0].dx, points[0].dy);

  for (i = 0, len = TOTAL_POINTS; i < len - 1; i++) {
    p = points[i];
    value = timeData[i];
    p.dx = p.x + value * sin(PI_HALF * p.angle);
    p.dy = p.y + value * cos(PI_HALF * p.angle);
    xc = (p.dx + points[i + 1].dx) / 2;
    yc = (p.dy + points[i + 1].dy) / 2;

    ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
  }

  value = timeData[i];
  p = points[i];
  p.dx = p.x + value * sin(PI_HALF * p.angle);
  p.dy = p.y + value * cos(PI_HALF * p.angle);
  xc = (p.dx + points[0].dx) / 2;
  yc = (p.dy + points[0].dy) / 2;

  ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
  ctx.quadraticCurveTo(xc, yc, points[0].dx, points[0].dy);

  ctx.stroke();
  ctx.fill();
  ctx.restore();
  ctx.closePath();

  i = len = p = value = xc = yc = null;
}

function animate() {
  if (!playing) return;

  window.requestAnimationFrame(animate);
  analyser.getByteFrequencyData(frequencyData);
  analyser.getByteTimeDomainData(timeData);
  avg = getAvg([].slice.call(frequencyData)) * gainNode.gain.value;

  clearCanvas();

  if (SHOW_STAR_FIELD) {
    drawStarField();
  }

  if (SHOW_AVERAGE) {
    drawAverageCircle();
  }

  if (SHOW_WAVEFORM) {
    drawWaveform();
  }
}

function Star() {
  var xc, yc;

  this.x = Math.random() * w - cx;
  this.y = Math.random() * h - cy;
  this.z = this.max_depth = Math.max(w / h);
  this.radius = 0.2;

  xc = this.x > 0 ? 1 : -1;
  yc = this.y > 0 ? 1 : -1;

  if (Math.abs(this.x) > Math.abs(this.y)) {
    this.dx = 1.0;
    this.dy = Math.abs(this.y / this.x);
  } else {
    this.dx = Math.abs(this.x / this.y);
    this.dy = 1.0;
  }

  this.dx *= xc;
  this.dy *= yc;
  this.dz = -0.1;

  this.ddx = 0.001 * this.dx;
  this.ddy = 0.001 * this.dy;

  if (this.y > cy / 2) {
    this.color = stars_color_2;
  } else {
    if (avg > AVG_BREAK_POINT + 10) {
      this.color = stars_color_2;
    } else if (avg > STARS_BREAK_POINT) {
      this.color = stars_color_special;
    } else {
      this.color = stars_color;
    }
  }

  xc = yc = null;
}

function createStarField() {
  var i = -1;

  while (++i < TOTAL_STARS) {
    stars.push(new Star());
  }

  i = null;
}

function Point(config) {
  this.index = config.index;
  this.angle = this.index * 360 / TOTAL_POINTS;

  this.updateDynamics = function() {
    this.radius = Math.abs(w, h) / 10;
    this.x = cx + this.radius * sin(PI_HALF * this.angle);
    this.y = cy + this.radius * cos(PI_HALF * this.angle);
  };

  this.updateDynamics();

  this.value = Math.random() * 256;
  this.dx = this.x + this.value * sin(PI_HALF * this.angle);
  this.dy = this.y + this.value * cos(PI_HALF * this.angle);
}

function AvgPoint(config) {
  this.index = config.index;
  this.angle = this.index * 360 / TOTAL_AVG_POINTS;

  this.updateDynamics = function() {
    this.radius = Math.abs(w, h) / 10;
    this.x = cx + this.radius * sin(PI_HALF * this.angle);
    this.y = cy + this.radius * cos(PI_HALF * this.angle);
  };

  this.updateDynamics();

  this.value = Math.random() * 256;
  this.dx = this.x + this.value * sin(PI_HALF * this.angle);
  this.dy = this.y + this.value * cos(PI_HALF * this.angle);
}

function createPoints() {
  var i;

  i = -1;
  while (++i < TOTAL_POINTS) {
    points.push(new Point({ index: i + 1 }));
  }

  i = -1;
  while (++i < TOTAL_AVG_POINTS) {
    avg_points.push(new AvgPoint({ index: i + 1 }));
  }

  i = null;
}

function resizeHandler() {
  w = window.innerWidth;
  h = window.innerHeight;
  cx = w / 2;
  cy = h / 2;

  ctx.canvas.width = w;
  ctx.canvas.height = h;

  points.forEach(function(p) {
    p.updateDynamics();
  });

  avg_points.forEach(function(p) {
    p.updateDynamics();
  });
}