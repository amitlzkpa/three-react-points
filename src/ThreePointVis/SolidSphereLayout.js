import * as THREE from 'three';

let STATE = {
  isEvaluating: true,
  resolution: 8000,
  sideLen: 30,
};

export default function solidSphereLayout(data) {
  function evaluateFunction(datum) {
    // TODO: evaluate here
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

          let d = new THREE.Vector3(datum.x, datum.y, datum.z).distanceTo(
            new THREE.Vector3()
          );
          let val = d < 10 ? 4 : 0.4;
          datum.scaleX = val;
          datum.scaleY = val;
          datum.scaleZ = val;
        }
        idx++;
      }
    }
  }
}
