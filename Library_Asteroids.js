console.log("Library 'matthews-army.github.io/comp-sci-b/Library_Asteroids.js' has just been accessed. Please note that calling functions from this library costs money. You can see how much you owe by calling the function 'owedAmount' at the end of your code.")

let amountOwed= 0.00;

//draw grid function##################################################################################################################
function drawGrid(ctx, minor, major, stroke, fill) {
  console.log("Function 'drawGrid' was just accessed from 'matthews-army.github.io/comp-sci-b/Library_Asteroids'. This action will cost you $0.01. Send through 'Google Pay' to 'matthew.weir999@gmail.com' as a reward for the time he took to write this function!");
  amountOwed+= 0.01;
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  let width = ctx.canvas.width, height = ctx.canvas.height
  for(var x = 0; x< width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
    ctx.stroke();
    if(x % major == 0 ) {
      ctx.fillText(x, x, 10);
    }
  }
  for(var y = 0; y < height; y += minor) {
    ctx.beginPath(); ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
    ctx.stroke();
    if(y % major == 0 ) {
      ctx.fillText(y, 0, y + 10);
    }
  }
  ctx.restore();
}


//draw pacman function################################################################################################################
function drawPacman(ctx, radius, mouth) {
  console.log("Function 'drawPacman' was just accessed from 'matthews-army.github.io/comp-sci-b/Library_Asteroids'. This action will cost you $0.01. Send through 'Google Pay' to 'matthew.weir999@gmail.com' as a reward for the time he took to write this function!");
  amountOwed+= 0.01;
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
  console.log("Function 'drawShip' was just accessed from 'matthews-army.github.io/comp-sci-b/Library_Asteroids'. This action will cost you $0.01. Send through 'Google Pay' to 'matthew.weir999@gmail.com' as a reward for the time he took to write this function!");
  amountOwed+= 0.01;
  options = options || {};
  let angle = (options.angle || 0.5 * Math.PI / 2);
  // Now we have two curve arguments
  let curve1 = options.curve1 || 0.25;
  let curve2 = options.curve2 || 0.75;
  ctx.save();
  if(options.guide) {
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
  ctx.beginPath(); ctx.moveTo(radius, 0);
  // here we have the three curves
  ctx.quadraticCurveTo(
    Math.cos(angle) * radius * curve2,
    Math.sin(angle) * radius * curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.quadraticCurveTo(-radius * curve1, 0,
                       Math.cos(Math.PI + angle) * radius,

                       Math.sin(Math.PI + angle) * radius
                      );
  ctx.quadraticCurveTo(
    Math.cos(-angle) * radius * curve2,
    Math.sin(-angle) * radius * curve2,
    radius, 0
  );
  ctx.fill();
  ctx.stroke();
  // the guide drawing code is getting complicated
  if(options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(
      Math.cos(-angle) * radius,
      Math.sin(-angle) * radius
    );
    ctx.lineTo(0, 0);
    ctx.lineTo(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      Math.cos(angle) * radius * curve2,
      Math.sin(angle) * radius * curve2,
      radius/40, 0, 2 * Math.PI
    );

    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      Math.cos(-angle) * radius * curve2,
      Math.sin(-angle) * radius * curve2,
      radius/40, 0, 2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(radius * curve1 - radius, 0, radius/50, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}


//Draw asteroids function###########################################################################################################
function drawAsteroid(ctx, radius, shape, options) {
  console.log("Function 'drawAsteroid' was just accessed from 'matthews-army.github.io/comp-sci-b/Library_Asteroids'. This action will cost you $0.01. Send through 'Google Pay' to 'matthew.weir999@gmail.com' as a reward for the time he took to write this function!");
  amountOwed+= 0.01;
  options = options || {};
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  ctx.save();
  ctx.beginPath();
  for(let i = 0; i < shape.length; i++) {
    ctx.rotate(2 * Math.PI / shape.length);
    ctx.lineTo(radius + radius * options.noise * shape[i], 0);
  }
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  if(options.guide) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}


//animation functions (under construction)###########################################################################################
function frame (timestamp) {
context.clearRect(0, 0, context.canvas.width, context.canvas. height);
if (!previous)
previous = timestamp;
elapsed = timestamp - previous;
update(elapsed / 1000);
draw(context, true);
previous = timestamp;
window.requestAnimationFrame(frame);
}


function update(elapsed) {
if(x - radius + elapsed * x_speed > context.canvas.width) {
x = -radius;
}
if(x + radius + elapsed * x_speed < 0) {
x = context.canvas. width + radius;
}
if(y - radius + elapsed * y_speed > context.canvas.height) {
y = -radius;
}
if(y + radius + elapsed * y_speed < 0) {
y = context.canvas. height + radius;
}
x += elapsed * x_speed;
y += elapsed * y_speed;
angle = (angle + elapsed * rotation_speed) % (2 * Math.PI);
}


function draw(ctx, guide) {
if(guide) {
drawGrid(ctx);
}
ctx.save();
ctx.translate(x, y);
ctx.rotate(angle);
drawAsteroid(ctx, radius, shape, { guide: guide, noise: noise });
ctx.restore();
}






function owedAmount() {
  console.log("You owe $" + amountOwed + ", send to 'matthew.weir999@gmail.com' via 'Google Pay'."); 
}
