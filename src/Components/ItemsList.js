import React, { useState, useEffect } from 'react';
import './Styles/itemsList.css';
import { tools } from '../Data/tools';

import ImagesSection from './ItemsListComponents/ImagesSection';
import BackgroundsSection from './ItemsListComponents/BackgroundsSection';
import UploadSection from "./ItemsListComponents/UploadSection";
import TextSection from "./ItemsListComponents/TextSection";
import ShareSection from "./ItemsListComponents/ShareSection";
import ToolsBar from './ToolsBar';

import ExpandLessRoundedIcon from "@mui/icons-material/ExpandMore";

function ItemsList(props) {
  const [selectedTools, setSelectedTools] = useState(0);
  // componentsMap keys must be same with components key value in /Data/tools.js
  const componentsMap = {
    imagesSection: ImagesSection,
    backgroundsSection: BackgroundsSection,
    uploadSection: UploadSection,
    shareSection: ShareSection,
    textSection: TextSection,
  };
  

  const changeSelectedTool = (id) => {
    setSelectedTools(id)
  }

  const openMenuOnClick = () => {
    props.sidebarCollapse ? props.setSidebarCollapse(false) : props.setSidebarCollapse(true);
  }

  const handleCanvasResizeOnSidebarChange = () => {
    props.resizeCanvasOnSidebarChange();
  }
  function _changeFontSize(size, i) {
    props.changeFontSize(size, i)
  }
  function _deleteText(i) {
    props.deleteText(i)
  
  }
  // everytime when sidebar state changes function in Canvas.js is being called for resizing canvas dimensions
  useEffect(() => {
    handleCanvasResizeOnSidebarChange();
  }, [props.sidebarCollapse]);

  function openSidebar() {
    props.setSidebarCollapse(true)
  }
  function _changeText(value) {
    props.changeText(value)
  }
  return (
    <div
      className={`itemsListWrap ${
        props.sidebarCollapse ? "sidebarOpen" : "sidebarClosed"
      }`}
    >
      <div className="expandButton" onClick={() => openMenuOnClick()}><ExpandLessRoundedIcon /></div>
      <div className="itemsListBody">
        <ToolsBar changeSelectedTool={changeSelectedTool} openSidebar={openSidebar} />

        {tools.map((val) => {
          if (val.id === selectedTools) {
            const Component = componentsMap[val.component];
            return (
              <Component
                key={val.id}
                removeSelected={props.removeSelected}
                onChangeDragUrl={props.onChangeDragUrl}
                handleAddOnClick={props.handleAddOnClick}
                dragUrl={props.dragUrl}
                addToBackground={props.addToBackground}
                removeBackground={props.removeBackground}
                stageRef={props.stageRef}
                changeText={_changeText}
                texts={props.texts}
                changeFontSize={_changeFontSize}
                deleteText={_deleteText}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default ItemsList;
