"use client";
import React from "react";
import styles from "./ViewJson.module.css";
import JsonView from "@uiw/react-json-view";
import JsonViewEditor from "@uiw/react-json-view/editor";
import { lightTheme } from "@uiw/react-json-view/light";

const ViewJson = ({ jsonData, folderName, fileName }) => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newJsonData = JSON.parse(event.target.jsonData.value);
    const dataToSubmit = {
      folderName: folderName,
      fileName: fileName,
      data: newJsonData,
    };

    const Response = await fetch("/api/saveModified", {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else {
      console.log("Success");
      alert("Success! The tab will now be closed.");
      window.close();
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      {/* <textarea
        name="jsonData"
        className={styles.textarea}
        defaultValue={JSON.stringify(jsonData, null, 2)}
      ></textarea> */}
      <JsonView  className={styles.textarea} value={jsonData} displayDataTypes={false} collapsed={1} 
      shortenTextAfterLength ={0}
      quotes= '' 
      />
      {/* <div className={styles.buttonWrap}>
        <button type="submit" className={styles.button}>
          Save
        </button>
      </div> */}
    </form>
  );
};

export default ViewJson;
