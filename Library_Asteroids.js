//draw grid function##################################################################################################################
function drawGrid(ctx, minor, major, stroke, fill) {
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  let width = ctx.canvas.width,
    height = ctx.canvas.height;
  for (var x = 0; x < width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = x % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (x % major == 0) {
      ctx.fillText(x, x, 10);
    }
  }
  for (var y = 0; y < height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = y % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (y % major == 0) {
      ctx.fillText(y, 0, y + 10);
    }
  }
  ctx.restore();
}

//draw pacman function################################################################################################################
function drawPacman(ctx, radius, mouth) {
  angle = 0.2 * Math.PI * mouth;
  ctx.save();
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius, angle, -angle);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

// drawship function (very long)######################################################################################################
function drawShip(ctx, radius, options) {
  options = options || {};
  let angle = options.angle || (0.5 * Math.PI) / 2;
  // Now we have two curve arguments
  let curve1 = options.curve1 || 0.25;
  let curve2 = options.curve2 || 0.75;
  ctx.save();
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  // here we have the three curves
  ctx.quadraticCurveTo(
    Math.cos(angle) * radius * curve2,
    Math.sin(angle) * radius * curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.quadraticCurveTo(
    -radius * curve1,
    0,
    Math.cos(Math.PI + angle) * radius,

    Math.sin(Math.PI + angle) * radius
  );
  ctx.quadraticCurveTo(
    Math.cos(-angle) * radius * curve2,
    Math.sin(-angle) * radius * curve2,
    radius,
    0
  );
  ctx.fill();
  ctx.stroke();
  // the guide drawing code is getting complicated
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(-angle) * radius, Math.sin(-angle) * radius);
    ctx.lineTo(0, 0);
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      Math.cos(angle) * radius * curve2,
      Math.sin(angle) * radius * curve2,
      radius / 40,
      0,
      2 * Math.PI
    );

    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      Math.cos(-angle) * radius * curve2,
      Math.sin(-angle) * radius * curve2,
      radius / 40,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(radius * curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

//Draw asteroids function###########################################################################################################
//drawAsteroid(ctx, this.radius, this.shape, { guide: guide, noise: this.noise, c: this.color });
function drawAsteroid(ctx, radius, shape, options) {
  options = options || {};
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.c || "orange"; //1111111111111111111111111111111111111111111111111111111111111
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < shape.length; i++) {
    ctx.rotate((2 * Math.PI) / shape.length);
    ctx.lineTo(radius + radius * options.noise * shape[i], 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (options.guide) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

//animation functions###########################################################################################################
function frame(timestamp) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  if (!previous) previous = timestamp;
  elapsed = timestamp - previous;
  update(elapsed / 1000);
  draw(context, true);
  previous = timestamp;
  window.requestAnimationFrame(frame);
}

function draw(ctx, guide) {
  //console.log("...inside draw");
  if (guide) {
    drawGrid(ctx);
  }
  asteroids.forEach(function(asteroid) {
    asteroid.draw(context, guide);
  });
}
function update(elapsed) {
  //console.log("...inside update");
  asteroids.forEach(function(asteroid) {
    asteroid.update(elapsed);
  });
}

function Asteroid(segments, radius, noise) {
  console.log("creating asteroid");
  this.color = randomColor(); //3333333333333333333333333333333333333333333333333333333333333333333333
  this.x = context.canvas.width * Math.random();
  this.y = context.canvas.height * Math.random();
  this.angle = 0;
  this.x_speed = context.canvas.width * (Math.random() - 0.5);
  this.y_speed = context.canvas.height * (Math.random() - 0.5);
  this.rotation_speed = 2 * Math.PI * (Math.random() - 0.5);
  this.radius = radius;
  this.noise = noise;

  this.shape = [];
  for (let i = 0; i < segments; i++) {
    this.shape.push(Math.random() - 0.5);
  }
}

Asteroid.prototype.update = function(elapsed) {
  if (this.x - this.radius + elapsed * this.x_speed > context.canvas.width) {
    this.x = -this.radius;
  }
  if (this.x + this.radius + elapsed * this.x_speed < 0) {
    this.x = context.canvas.width + this.radius;
  }
  if (this.y - this.radius + elapsed * this.y_speed > context.canvas.height) {
    this.y = -this.radius;
  }
  if (this.y + this.radius + elapsed * this.y_speed < 0) {
    this.y = context.canvas.height + this.radius;
  }
  this.x += elapsed * this.x_speed;
  this.y += elapsed * this.y_speed;
  this.angle = (this.angle + this.rotation_speed * elapsed) % (2 * Math.PI);
};

Asteroid.prototype.draw = function(ctx, guide) {
  ctx.save();
  ctx.translate(this.x, this.y);

  ctx.rotate(this.angle);
  drawAsteroid(ctx, this.radius, this.shape, {
    guide: guide,
    noise: this.noise,
    c: this.color
  }); //2222222222222222222222222222222222222222222222222222
  ctx.restore();
};

//Random number
function randomNum(a, b) {
  var c = b - a;
  return c * Math.random() + a;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
