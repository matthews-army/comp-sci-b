function drawPacman (x, y, radius, mouth) {
  context.beginPath();
  context.arc(x, y, radius, 0.2 * Math.PI * mouth, 1.8 * Math.PI * mouth);
  context. lineTo(x, y);
  context.fillStyle = "yellow";
  context.fill();
  context.closePath();
  context.stroke();
}
