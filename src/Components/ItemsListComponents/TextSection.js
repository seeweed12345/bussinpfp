import React, { useState } from "react";
import items from "../../Data/items.json";
import FilterBar from "./filterBar";

import ExpandLessRoundedIcon from "@mui/icons-material/DeleteForever";
// images can be dragged or cliked for adding it to canvas

function TextSection(props) {
  const [text, setText] = useState("")
  const textsArray = props.texts
  function editText() {
    props.changeText(text)
    setText("")
  
  }
  function changeFontSize(size, i) {
    props.changeFontSize(size, i)
  }
  
  
function deleteText(i) {

  props.deleteText(i)
}

  return (
    <div className="itemsSection">
      <div className="text-section-top">
        <div className="text-input-container">
        <input
        onChange={(e) => {
          setText(e.target.value);
          
          }}
          className="input-text-container"
        value={text}
      placeholder="Enter text"
      ></input>
          </div>
    
      
      <button className="downloadImage" onClick={editText}>Add Text</button>

      </div>
   

      <div className="texts-wrapper">
        {textsArray.map((item, i) => (
          <div className="text-container" key={i}>
            <div className="text-items-title">{item.text}</div>
            <div className="text-container-bottom">
              <div>
                <input
                  
                  className="font-size-input"
              onChange={(e) => {
                changeFontSize(e.target.value, i);
              }
              }
              value={item.fontSize}
              type="number"
            ></input>
                </div>
                <div className="delete-button" onClick={() =>{deleteText(i)}}><ExpandLessRoundedIcon /></div>
            </div>
           

          </div>
        ))}
      </div>
    </div>
   

   
  );
}

export default TextSection;
