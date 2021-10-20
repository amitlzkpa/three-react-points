// import * as THREE from 'three';

let STATE = {
  isEvaluating: true,
  resolution: 8000,
  sideLen: 30,
  A: 12,
  B: 8,
  C: 6,
};

export default function (data) {
  function evaluateFunction(datum) {
    datum.d = 0;
    datum.d =
      Math.pow(datum.x, 2) / Math.pow(STATE.A, 2) +
      Math.pow(datum.y, 2) / Math.pow(STATE.B, 2) -
      Math.pow(datum.z, 2) / Math.pow(STATE.C, 2);
  }

  // points in a 3d grid
  STATE.resolution = Math.floor(Math.cbrt(data.length));
  let idx = 0;
  for (let i = 0; i < STATE.resolution; i++) {
    for (let j = 0; j < STATE.resolution; j++) {
      for (let k = 0; k < STATE.resolution; k++) {
        let datum = data[idx];
        if (STATE.isEvaluating) {
          datum.x = (i / STATE.resolution - 0.5) * STATE.sideLen;
          datum.y = (j / STATE.resolution - 0.5) * STATE.sideLen;
          datum.z = (k / STATE.resolution - 0.5) * STATE.sideLen;

          evaluateFunction(datum);

          let val = Math.abs(1 - datum.d) < 0.1 ? 2 : 0.4;
          datum.scaleX = val;
          datum.scaleY = val;
          datum.scaleZ = val;
        }
        idx++;
      }
    }
  }
}
