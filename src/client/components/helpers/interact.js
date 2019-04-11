import interact from 'interactjs';

const setScaledFont = (targetElement, scale) => {
  const size = targetElement.offsetWidth;
  const fs = size * scale;

  /* eslint-disable no-param-reassign */
  targetElement.style.fontSize = `${fs}%`;
};

const onResizeMove = (event) => {
  const targetElement = event.target;
  let x = (parseFloat(targetElement.getAttribute('data-x')) || 0);
  let y = (parseFloat(targetElement.getAttribute('data-y')) || 0);

  // update the element's style
  targetElement.style.width = `${event.rect.width}px`;
  targetElement.style.height = `${event.rect.height}px`;

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  targetElement.style.transform = `'translate(${x}px, ${y}px)`;
  targetElement.style.border = '3px dashed #4c8ade';
  targetElement.setAttribute('data-x', x);
  targetElement.setAttribute('data-y', y);

  // Scale font size
  setScaledFont(targetElement, 0.35);
};

const onResizeEnd = (event) => {
  const targetElement = event.target;
  targetElement.style.border = '3px dashed transparent';
};

const dragMoveListener = (event) => {
  const targetElement = event.target;
  const x = (parseFloat(targetElement.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(targetElement.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  targetElement.style.transform = `translate(${x}px, ${y}px)`;

  // update the posiion attributes
  targetElement.setAttribute('data-x', x);
  targetElement.setAttribute('data-y', y);
};

const interactElement = (element) => {
  interact(element)
    .draggable({
      snap: {
        targets: [
          interact.createSnapGrid({ x: 10, y: 10 })
        ],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
      },
      restrict: {
        restriction: 'parent',
        elementRect: { 
          top: 0, 
          left: 0, 
          bottom: 1, 
          right: 1 
        }
      },
      onmove: dragMoveListener
    })
    .pointerEvents({
      ignoreFrom: '[no-pointer-event]'
    })
    .resizable({
      edges: { 
        left: true, 
        right: true, 
        bottom: true, 
        top: true 
      },
      restrictEdges: {
        outer: 'parent',
        endOnly: true
      },
      inertia: true
    })
    .on('resizemove', onResizeMove)
    .on('resizeend', onResizeEnd);
};

export default interactElement;
