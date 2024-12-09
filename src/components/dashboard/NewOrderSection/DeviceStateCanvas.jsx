import { Stage, Layer, Image, Circle, Text } from 'react-konva';
import { useState, useRef } from 'react';
import useImage from 'use-image';

function DeviceStateCanvas({ deviceState = [], onChange }) {
  const [image] = useImage('/phone-template.jpg'); // Actualizado a .jpg
  const stageRef = useRef();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [comment, setComment] = useState('');

  const handleStageClick = (e) => {
    // Solo permitir clics directamente en la imagen
    if (e.target === e.target.getStage() || e.target.constructor.name === 'Image') {
      const pos = e.target.getStage().getPointerPosition();
      const newMark = {
        x: pos.x,
        y: pos.y,
        comment: ''
      };
      setSelectedPoint(newMark);
    }
  };

  const addComment = (comment) => {
    if (selectedPoint && comment) {
      const newState = [...deviceState, { ...selectedPoint, comment }];
      onChange(newState);
      setSelectedPoint(null);
      setComment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && comment) {
      addComment(comment);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-medium mb-4">Estado del Dispositivo</h3>
      <div className="flex flex-col items-center">
        <div className="relative">
          <Stage
            width={300}
            height={600}
            ref={stageRef}
            onClick={handleStageClick}
            className="border rounded-lg shadow-sm"
            style={{ background: '#ffffff' }}
          >
            <Layer>
              {image && (
                <Image
                  image={image}
                  width={300}
                  height={600}
                  listening={true}
                />
              )}
              {deviceState.map((mark, i) => (
                <React.Fragment key={i}>
                  <Circle
                    x={mark.x}
                    y={mark.y}
                    radius={6}
                    fill="rgba(234, 67, 53, 0.8)"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <Text
                    x={mark.x + 10}
                    y={mark.y - 6}
                    text={mark.comment}
                    fontSize={12}
                    fill="#333"
                    padding={2}
                    background="#fff"
                  />
                </React.Fragment>
              ))}
            </Layer>
          </Stage>
        </div>
        
        {selectedPoint && (
          <div className="mt-4 w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Agregar comentario sobre el daño..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={() => addComment(comment)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Agregar
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Presiona Enter o haz clic en Agregar para confirmar el comentario
            </p>
          </div>
        )}

        {deviceState.length > 0 && (
          <div className="mt-4 w-full">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Marcas registradas:</h4>
            <ul className="space-y-1">
              {deviceState.map((mark, i) => (
                <li key={i} className="text-sm text-gray-600">
                  • {mark.comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeviceStateCanvas;