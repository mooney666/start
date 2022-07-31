function DrawLine(context, [x1, x2, y1, y2] = [], [width, color] = []) {
  // 开启路径
  context.beginPath();
  // 确定起始点
  context.moveTo(x1, y1);
  // 确定结束点
  context.lineTo(x2, y2);

  /* 在着色之前设置颜色和线宽 */
  context.strokeStyle = color;
  context.lineWidth = width;

  // 着色
  context.stroke();
  // 关闭路径
  context.closePath();
}
export default DrawLine;
