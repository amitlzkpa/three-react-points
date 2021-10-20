import * as React from 'react';
import { useSpring } from 'react-spring/three';
import gridLayout from './Layouts/GridLayout';
import spiralLayout from './Layouts/SpiralLayout';
import solidSphereLayout from './Layouts/SolidSphereLayout';
import ellipsoidLayout from './Layouts/EllipsoidLayout';
import hyperboloidOneLayout from './Layouts/HyperboloidOneLayout';
import hyperbolicParaboloidLayout from './Layouts/HyperbolicParaboloidLayout';

// ----------------------------------------------------------------------------

export const useLayout = ({ data, layout = 'grid' }) => {
  React.useEffect(() => {
    switch (layout) {
      case 'spiral':
        spiralLayout(data);
        break;
      case 'solid-sphere':
        solidSphereLayout(data);
        break;
      case 'ellipsoid':
        ellipsoidLayout(data);
        break;
      case 'hyperboloid-1':
        hyperboloidOneLayout(data);
        break;
      case 'hyperbolic-paraboloid':
        hyperbolicParaboloidLayout(data);
        break;
      case 'grid':
      default: {
        gridLayout(data);
      }
    }
  }, [data, layout]);
};

function useSourceTargetLayout({ data, layout }) {
  // prep for new animation by storing source
  React.useEffect(() => {
    console.log(data[0]);
    for (let i = 0; i < data.length; ++i) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
    }
  }, [data, layout]);

  // run layout
  useLayout({ data, layout });

  // store target
  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].targetX = data[i].x;
      data[i].targetY = data[i].y;
      data[i].targetZ = data[i].z;
    }
  }, [data, layout]);
}

function interpolateSourceTarget(data, progress) {
  for (let i = 0; i < data.length; ++i) {
    data[i].posX =
      (1 - progress) * data[i].sourceX + progress * data[i].targetX;
    data[i].posY =
      (1 - progress) * data[i].sourceY + progress * data[i].targetY;
    data[i].posZ =
      (1 - progress) * data[i].sourceZ + progress * data[i].targetZ;
  }
}

export function useAnimatedLayout({ data, layout, onFrame }) {
  // compute layout remembering initial position as source and
  // end position as target
  useSourceTargetLayout({ data, layout });

  // do the actual animation when layout changes
  const prevLayout = React.useRef(layout);
  const animProps = useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: layout !== prevLayout.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      interpolateSourceTarget(data, animationProgress);
      // callback to indicate data has updated
      onFrame({ animationProgress });
    },
  });
  prevLayout.current = layout;

  return animProps;
}

// ----------------------------------------------------------------------------
