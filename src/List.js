import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  const items = props.items;
  return (
    <>
      {items.map((item, index) => {
        return (
          <article key={index} className="grocery-item">
            <p className="title">{item}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                type="button"
                onClick={() => {
                  props.setUpdate(true);
                  props.setUpdateId(index);
                  props.setInputValue(item);
                }}
              >
                {<FaEdit />}
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => props.fnDeleteItem(index)}
              >
                {<FaTrash />}
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
