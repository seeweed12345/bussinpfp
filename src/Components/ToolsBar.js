import React from "react";
import { tools } from '../Data/tools';

// list of tools imported from /Data/tools.js

function ToolsBar(props) {
  function _openSidebar() {
    props.openSidebar()
  }
  return (
    <div className="toolsBarWrap">
      <div className="toolsBarBody">
        <div className="toolsItemsWrap">
          {tools.map((tool, i) => (
            <div
              className="toolsItem"
              key={i}
              onClick={() => {
                _openSidebar()
                props.changeSelectedTool(i)
              }}
              >
              <div className="toolsItemContent">
                <span className="toolIcon">
               <img src={tool.icon} alt="icon" className={tool.title === "Save" ||  tool.title === "Text" ? "tool-icon-img hair-img": "tool-icon-img"}></img>
                </span>
                <span className="toolTitle">
                  {tool.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolsBar;
