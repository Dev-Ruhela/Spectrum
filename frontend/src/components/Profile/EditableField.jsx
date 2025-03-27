import React, { useState } from "react";

const EditableField = ({ label, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const save = () => {
    setEditing(false);
    onChange(inputValue);
  };

  return (
    <div className="my-2">
      {label && <p className="text-sm text-gray-500">{label}</p>}
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            className="border px-2 py-1 rounded w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="text-blue-500" onClick={save}>
            Save
          </button>
        </div>
      ) : (
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setEditing(true)}
        >
          <p>{value}</p>
          <span className="text-blue-500">Edit</span>
        </div>
      )}
    </div>
  );
};

export default EditableField;
