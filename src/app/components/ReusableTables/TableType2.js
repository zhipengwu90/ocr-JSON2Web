import React from "react";
import styles from "./TableType2.module.css";
import EditableFieldDate2 from "../EditableField/EditableFieldDate2";
import Link from "next/link";
const TableType2 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
  insideStyle,
  isEditingTable,
  formSettingIndex,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const itemName = formSetting.itemName;
  const insideTableName = formSetting.insideTableName;

  const dates = items[itemName];
  console.log("dates", dates.map((date) => date));


  let updateJson = { ...items };
  const handleDateChange = (event) => {
    const index = event.target.getAttribute("index");
    const { name, value } = event.target;
    // updateJson[itemName][index][name] = value;
    updateJson[itemName][index][name][0] = value;
    onEdit(updateJson);
  };

  const addDateHandler = () => {
    if (!updateJson[itemName]) {
      updateJson[itemName] = [];
    }
    let newDate = {};

    // tableData.map((data, index) => (newDate[data.key] = data.fieldName));
    tableData.map(
      (data, index) => (newDate[data.key] = [data.fieldName, {}, null])
    );

    updateJson[itemName].push(newDate);
    onEdit(updateJson);
  };

  const removeDateHandler = (index) => {
    updateJson[itemName].splice(index, 1);
    onEdit(updateJson);
  };


  const onDelete = async () => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if (confirmDelete) {
      const Response = await fetch("/api/DeleteTable", {
        method: "POST",
        body: JSON.stringify({
          folderName: folderName,
          formSettingIndex: formSettingIndex,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!Response.ok) {
        alert("Error");
      } else {
        alert("Success");
        window.location.reload();
      }
    }
  };
  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}

      <div className={styles.myTable} style={insideStyle}>
        {insideTableName && (
          <div className={styles.title2}>{insideTableName}</div>
        )}
        <button className={styles.addRemoveButton} onClick={addDateHandler}>
          +
        </button>

        <div className={styles.dateDisplay}>
          {dates
            ? dates.map((date, arrayIndex) => {
                return (
                  <div key={arrayIndex}>
                    {tableData.map((data, index) => {
                      return (
                        <EditableFieldDate2
                          key={index}
                          index={arrayIndex}
                          fieldName={data.key}
                          // fieldValue={date[data.key]}
                          fieldValue={
                            date && date[data.key] ? date[data.key][0] : ""
                          }
                          isFlag=""
                          handleChange={handleDateChange}
                        />
                      );
                    })}
                    <button
                      className={styles.addRemoveButton}
                      onClick={() => removeDateHandler(arrayIndex)}
                    >
                      -
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
   
      {isEditingTable && (
        <div>
          <Link
            className={styles.linkButton}
            rel="noopener noreferrer"
            target="_blank"
            href={{
              pathname: "/editSingleTable/",
              query: {
                formSettingIndex: formSettingIndex,
                folderName: folderName,
              },
            }}
          >
            Edit
          </Link>
          <button onClick={onDelete} className={styles.button}>
            Delete
          </button>
        </div>
      )}
   
   
    </div>
  );
};

export default TableType2;
