import { Stage, Layer, Image, Circle, Text } from 'react-konva';
import { useState, useRef } from 'react';
import useImage from 'use-image';

function DeviceStateCanvas({ deviceState, onChange }) {
  const [image] = useImage('/phone-template.png'); // Placeholder for the phone template
  const stageRef = useRef();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [comment, setComment] = useState('');

  const handleStageClick = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    const newMark = {
      x: pos.x,
      y: pos.y,
      comment: ''
    };
    
    setSelectedPoint(newMark);
    // Show comment input modal/popup
  };

  const addComment = (comment) => {
    if (selectedPoint && comment) {
      const newState = [...deviceState, { ...selectedPoint, comment }];
      onChange(newState);
      setSelectedPoint(null);
      setComment('');
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Estado del Dispositivo</h3>
      <Stage
        width={300}
        height={600}
        ref={stageRef}
        onClick={handleStageClick}
        className="border"
      >
        <Layer>
          {image && (
            <Image
              image={image}
              width={300}
              height={600}
            />
          )}
          {deviceState.map((mark, i) => (
            <>
              <Circle
                key={`circle-${i}`}
                x={mark.x}
                y={mark.y}
                radius={5}
                fill="red"
              />
              <Text
                key={`text-${i}`}
                x={mark.x + 10}
                y={mark.y}
                text={mark.comment}
                fontSize={12}
              />
            </>
          ))}
        </Layer>
      </Stage>
      
      {selectedPoint && (
        <div className="mt-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Agregar comentario..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={() => addComment(comment)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Agregar Marca
          </button>
        </div>
      )}
    </div>
  );
}

export default DeviceStateCanvas;