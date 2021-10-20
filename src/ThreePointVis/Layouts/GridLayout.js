export default function (data) {
  const numPoints = data.length;
  const numCols = Math.ceil(Math.sqrt(numPoints));
  const numRows = numCols;

  for (let i = 0; i < numPoints; ++i) {
    const datum = data[i];
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numRows / 2;

    datum.x = col * 1.05;
    datum.y = row * 1.05;
    datum.z = 0;

    datum.scaleX = 1;
    datum.scaleY = 1;
    datum.scaleZ = 1;
  }
}
