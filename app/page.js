// page.js
"use client";
import React, { useState, useEffect } from "react";
import { convertBase, calculateConversion } from "./utils/baseConversion";
import BaseSelect from "./components/BaseSelect";
import ValueInput from "./components/ValueInput";
import Result from "./components/Result";
import RootLayout from "./layout";

export default function App() {
  const [value, setValue] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(10);
  const [result, setResult] = useState("");
  const [calculation, setCalculation] = useState("");
  const [view, setView] = useState(null); // Set the initial view to null
  const [shouldRenderImage, setShouldRenderImage] = useState(false); // new state variable

  useEffect(() => {
    setView("image"); // Set the view after the initial render
  }, []);

  useEffect(() => {
    const converted = convertBase(value, fromBase, toBase);
    setResult(converted);
    setCalculation(calculateConversion(value, fromBase, toBase));
  }, [value, fromBase, toBase]);

  useEffect(() => {
    setShouldRenderImage(true);
  }, []);

  const selectStyles = {
    display: "inline-block",
    position: "relative",
    width: "200px",
    height: "30px",
    padding: "5px 5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    appearance: "none",
    backgroundColor: "#fff",
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg fill='%232C3E50' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5em center",
    backgroundSize: "0.8em 0.8em",
  };

  // Don't render anything until the view state is set
  if (view === null) {
    return null;
  }

  return (
    <RootLayout view={view} setView={setView}>
      {shouldRenderImage && view === "image" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/img/comp_1113.png"
            alt="COMP1113"
            width={400}
            height={400}
          />
          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "23px",
            }}
          >
            COMP 1113 - Applied Mathematics for Computing
          </p>
          <p
            style={{
              textAlign: "center"
            }}
          >
          COMP 1113 calculator is to help students with the course.
          <br />
          The course is divided into three parts: 
          <br />
          (1) Boolean algebra and design of logic circuits; 
          <br />
          (2) number systems and data representation; and 
          <br />
          (3) functions, linear equations, vectors and matrices. 
          </p>
        </div>
      )}
      {view === "baseConverter" && (
        <div>
          <ValueInput value={value} setValue={setValue} />
          <br />
          <BaseSelect
            base={fromBase}
            setBase={setFromBase}
            style={selectStyles}
          />
          <p>to</p>
          <br />
          <BaseSelect base={toBase} setBase={setToBase} style={selectStyles} />
          <br />
          <br />
          <Result result={result} calculation={calculation} toBase={toBase} />
          <br />
        </div>
      )}
    </RootLayout>
  );
}
