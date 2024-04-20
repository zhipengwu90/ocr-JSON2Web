import React, { useState } from "react";
import styles from "./EditableField.module.css";

const EditableField = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
  // onMouseEnter,
  // onMouseLeave
}) => {
  const [isEditing, setIsEditing] = useState(false);

  let stylingClass = "";
  switch (isFlag) {
    case 0:
      break;
    case 1:
      stylingClass = styles.isRed;
      break;
    case 2:
      stylingClass = styles.isGreen;
      break;
    default:
      // Handle other cases if needed
      break;
  }
  return (
    <div
      className={`${!fieldValue && styles.content} ${stylingClass}`}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
      }}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
    >
      {isEditing ? (
        <input
          className={styles.input}
          type="text"
          name={fieldName}
          defaultValue={fieldValue}
          onBlur={() => setIsEditing(false)}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <span className={` ${stylingClass}`}> {fieldValue || "\u00A0"} </span>
      )}
    </div>
  );
};

export default EditableField;
