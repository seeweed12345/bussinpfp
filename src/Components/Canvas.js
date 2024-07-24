import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';
import './Styles/canvas.css';
import ItemsList from './ItemsList';
import ImageComponent from './ImageComponent';
import CanvasBackground from './CanvasBackground';

function Canvas() {
  const stageWidth = 900;
  const stageHeight = 900;
  const [stageDimensions, setStageDimensions] = useState({
    width: stageWidth,
    height: stageHeight,
    scale: 0.5,
  });
  const stageRef = useRef();
  const containerRef = useRef();
  const [dragUrl, setDragUrl] = useState();
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedItem, setSelectedItem] = useState(null);
  const [texts, setTexts] = useState([]);

  const watermarkText = 'ZOOMER.MONEY';
  const watermarkConfig = {
    x: 50,
    y: 570,
    text: watermarkText,
    fontSize: 90,
    opacity: 0.2,
    draggable: false,
    fontFamily: 'Arial',
    fill: 'rgba(255, 255, 255, 0.5)',
    stroke: 'rgba(0, 0, 0, 0.5)',
    strokeWidth: 1,
    rotation: -45,
    listening: false,
  };

  const handleResize = () => {
    let sceneWidth = containerRef.current.clientWidth;
    let scale = sceneWidth / stageWidth;
    setStageDimensions({
      width: stageWidth * scale,
      height: stageHeight * scale,
      scale: scale,
    });
  };

  const changeText = (value) => {
    const newTextAtts = {
      x: 50,
      y: 70,
      text: value,
      fontSize: 50,
      draggable: true,
      fontFamily: 'Impact',
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
    };
    setTexts((prevTexts) => [...prevTexts, newTextAtts]);
  };

  function deleteText(textIndex) {
    setTexts([...texts.slice(0, textIndex), ...texts.slice(textIndex + 1)]);
  }

  function changeFontSize(size, textIndex) {
    const newTextAtts = { ...texts[textIndex], fontSize: size };
    setTexts((prevTexts) => [
      ...prevTexts.slice(0, textIndex),
      newTextAtts,
      ...prevTexts.slice(textIndex + 1),
    ]);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  }, []);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    const clickedOnBackground = e.target.getId() === 'canvasBackground';
    if (clickedOnEmpty || clickedOnBackground) {
      setSelectedId(null);
      setSelectedItem(null);
    }
  };

  const removeSelectedLayer = () => {
    let newImages = images.filter((image, i) => `image${i}` !== selectedItem);
    let newTexts = texts.filter((text, i) => `text${i}` !== selectedItem);

    setImages(newImages);
    setTexts(newTexts);
    setSelectedItem(null);
  };

  const onChangeDragUrl = (dragUrl) => {
    setDragUrl(dragUrl);
  };

  const handleTransformChange = (newAttrs, i) => {
    let imagesToUpdate = images;
    let singleImageToUpdate = imagesToUpdate[i];
    singleImageToUpdate = newAttrs;
    imagesToUpdate[i] = singleImageToUpdate;
    setImages([...imagesToUpdate]);
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);
    setImages(
      images.concat([
        {
          ...stageRef.current.getPointerPosition(),
          src: dragUrl,
        },
      ])
    );
  };

  const handleAddOnClick = (src) => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
    const newImage = {
      x: 0,
      y: 0,
      src: src,
      width: 300,
      height: 300,
    };

    setImages(images.concat([newImage]));
  };

  const addToBackground = (backgroundUrl) => {
    setBackgroundImage(backgroundUrl);
  };

  const removeBackground = () => {
    setBackgroundImage(null);
  };

  const passImageWithId = (image, id) => {
    const imageWithId = {
      ...image,
      id: id,
    };
    return imageWithId;
  };

  const removeSelected = () => {
    setSelectedId(null);
  };

  function clearCanvas() {
    setImages([]);
    setBackgroundImage(null);
    setSelectedId(null);
    setTexts([]);
  }

  const resizeCanvasOnSidebarChange = () => {
    setTimeout(() => {
      handleResize();
    }, 420);
  };

  function closeSidebar() {
    setSidebarCollapse(false);
  }

  return (
    <div className='workContainer'>
      <ItemsList
        dragUrl={dragUrl}
        onChangeDragUrl={onChangeDragUrl}
        handleAddOnClick={handleAddOnClick}
        addToBackground={addToBackground}
        removeBackground={removeBackground}
        resizeCanvasOnSidebarChange={resizeCanvasOnSidebarChange}
        stageRef={stageRef}
        setSidebarCollapse={setSidebarCollapse}
        sidebarCollapse={sidebarCollapse}
        removeSelected={removeSelected}
        changeText={changeText}
        texts={texts}
        changeFontSize={changeFontSize}
        deleteText={deleteText}
      />
      <div className='canvasWrap'>
        <div
          className='canvasBody'
          ref={containerRef}
          onDrop={handleOnDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className='canvas-buttons'>
            <input
              type='color'
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button onClick={clearCanvas}>Clear Canvas</button>
            <button onClick={removeSelectedLayer}>Delete Selected Layer</button>
          </div>

          <Stage
            width={stageDimensions.width}
            height={stageDimensions.height}
            scaleX={stageDimensions.scale}
            scaleY={stageDimensions.scale}
            className='canvasStage'
            ref={stageRef}
            onMouseDown={checkDeselect}
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                width={stageWidth}
                height={stageHeight}
                fill={backgroundColor}
                listening={false}
              />
            </Layer>
            <Layer>
              {typeof backgroundImage === 'string' && (
                <CanvasBackground
                  backgroundUrl={backgroundImage}
                  width={stageWidth}
                  height={stageHeight}
                />
              )}
              {images.map((image, i) => (
                <ImageComponent
                  image={image}
                  shapeProps={passImageWithId(image, `image${i}`)}
                  id={`image${i}`}
                  key={i}
                  isSelected={i === selectedId}
                  onSelect={() => {
                    setSelectedId(i);
                    setSelectedItem(`image${i}`);
                  }}
                  onChange={(newAttrs) => {
                    handleTransformChange(newAttrs, i);
                  }}
                />
              ))}
            </Layer>
            <Layer>
              {texts.map((text, i) => (
                <Text
                  key={i}
                  {...text}
                  id={`text${i}`}
                  onClick={() => {
                    setSelectedId(i);
                    setSelectedItem(`text${i}`);
                  }}
                />
              ))}
            </Layer>
            <Layer>
              <Text {...watermarkConfig} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default Canvas;