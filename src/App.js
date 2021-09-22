import * as React from 'react';
import ThreePointVis from './ThreePointVis/ThreePointVis';
import './styles.css';

let data = new Array(8000).fill(0).map((d, id) => ({ id }));

export default function App() {
  const [layout, setLayout] = React.useState('grid');
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const visRef = React.useRef();
  const handleResetCamera = () => {
    visRef.current.resetCamera();
  };

  //

  return (
    <div className="App">
      <div className="vis-container">
        <ThreePointVis
          ref={visRef}
          data={data}
          layout={layout}
          selectedPoint={selectedPoint}
          onSelectPoint={setSelectedPoint}
        />
      </div>
      <button className="reset-button" onClick={handleResetCamera}>
        Reset Camera
      </button>
      <div className="controls">
        <strong>Layouts</strong>
        <br />
        <button
          onClick={() => setLayout('grid')}
          className={layout === 'grid' ? 'active' : undefined}
        >
          Grid
        </button>
        <button
          onClick={() => setLayout('spiral')}
          className={layout === 'spiral' ? 'active' : undefined}
        >
          Spiral
        </button>
        <button
          onClick={() => setLayout('solid-sphere')}
          className={layout === 'solid-sphere' ? 'active' : undefined}
        >
          Solid Sphere
        </button>
        <hr />
        {selectedPoint && (
          <div className="selected-point">
            <strong>
              ({selectedPoint.x.toFixed(2)},{selectedPoint.y.toFixed(2)},
              {selectedPoint.z.toFixed(2)})
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}
