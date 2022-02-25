import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [alertDanger, setAlertDanger] = useState(false);
  const [alertAddItem, setAlertAddItem] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [alertRemove, setAlertRemove] = useState(false);
  const [alertValueChanged, setAlertValueChanged] = useState(false);

  const deleteItem = (id) => {
    const newItems = [];

    for (let i = 0; i < items.length; i++) {
      if (i == id) continue;
      newItems.push(items[i]);
    }

    setItems(newItems);
    setAlertRemove(true);
  };

  const updateItem = (id, value) => {
    const newItems = [];

    for (let i = 0; i < items.length; i++) {
      if (i == id) {
        newItems.push(value);
        continue;
      }
      newItems.push(items[i]);
    }

    setItems(newItems);
    /* setUpdate(false); */
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setAlertDanger(true);
      return;
    }

    if (update) {
      updateItem(updateId, inputValue);
      setUpdate(false);
      setAlertValueChanged(true);
      setInputValue("");
      return;
    }
    setItems([...items, inputValue]);
    setInputValue("");
    setAlertAddItem(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setAlertDanger(false), 2000);

    return () => clearTimeout(timeout);
  }, [alertDanger]);

  useEffect(() => {
    const timeout = setTimeout(() => setAlertAddItem(false), 2000);

    return () => clearTimeout(timeout);
  }, [alertAddItem]);

  useEffect(() => {
    const timeout = setTimeout(() => setAlertRemove(false), 2000);

    return () => clearTimeout(timeout);
  }, [alertRemove]);

  useEffect(() => {
    const timeout = setTimeout(() => setAlertValueChanged(false), 2000);

    return () => clearTimeout(timeout);
  }, [alertValueChanged]);

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alertDanger ? (
            <p className="alert alert-danger">PLease Enter Value</p>
          ) : (
            ""
          )}

          {alertRemove ? (
            <p className="alert alert-danger">Item removed</p>
          ) : (
            ""
          )}

          {alertValueChanged ? (
            <p className="alert alert-success">Value Changed</p>
          ) : (
            ""
          )}

          {alertAddItem ? (
            <p className="alert alert-success">Item tem added to the list</p>
          ) : (
            ""
          )}
          <h3>Grocery Bud</h3>
          <div className="form-control">
            <input
              value={inputValue}
              className="grocery"
              type="text"
              placeholder="e.g. eggs"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>

        <div className="grocery-container">
          <div className="grocery-list">
            {
              <List
                items={items}
                fnDeleteItem={deleteItem}
                setUpdate={setUpdate}
                setUpdateId={setUpdateId}
                setInputValue={setInputValue}
              />
            }
          </div>
          {items.length > 0 ? (
            <button className="clear-btn" onClick={() => setItems([])}>
              Clear items
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}

export default App;
