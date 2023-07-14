// page.js
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { convertBase, calculateConversion } from "./utils/baseConversion";
import BaseSelect from "./components/baseConvert/BaseSelect";
import ValueInput from "./components/baseConvert/ValueInput";
import Result from "./components/baseConvert/Result";
import CalculateResult from "./components/baseCalculate/CalculateResult";
import RootLayout from "./layout";
import BaseCalculator from "./components/baseCalculate/BaseCalculator";
import BooleanCalculator from "./components/booleanCalculate/BooleanCalculator";
import OperationTypeSelect from "./components/baseConvert/OperationTypeSelect";
import LogarithmCalculator from "./components/logCalculate/LogarithmCalculator";
import ExponentialCalculator from "./components/expCalculate/ExponentialCalculator";
import MatrixCalculator from "./components/matrixCalculate/MatrixCalculator";
import NumberConverter from "./components/signedNumber/NumberConverter";
import MiniFloatConverter from "./components/floatConvert/MiniFloatConverter";
import MiniFloatCalculator from "./components/floatCalculate/MiniFloatCalculator";
import BooleanSimplifier from "./components/booleanSimplifier/BooleanSimplifier";

export default function App() {
  const [value, setValue] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(10);
  const [result, setResult] = useState("");
  const [calculation, setCalculation] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);
  const [view, setView] = useState(null);
  const [shouldRenderImage, setShouldRenderImage] = useState(false);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [base, setBase] = useState(10);

  const [boolValue1, setBoolValue1] = useState(false);
  const [boolValue2, setBoolValue2] = useState(false);
  const [boolOperation, setBoolOperation] = useState("AND");

  const [logBase, setLogBase] = useState(10);
  const [logValue, setLogValue] = useState("");
  const [operationType, setOperationType] = useState("logarithm");
  const [expBase, setExpBase] = useState(10);
  const [expValue, setExpValue] = useState("");

  const [matrix1, setMatrix1] = useState("");
  const [matrix2, setMatrix2] = useState("");

  const [booleanExpression, setBooleanExpression] = useState("");
  const [simplifiedBooleanExpression, setSimplifiedBooleanExpression] =
    useState("");

  useEffect(() => {
    setView("image");
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

  const operationStyles = {
    display: "inline-block",
    position: "relative",
    textAlign: "center",
    width: "100px",
    height: "45px",
    padding: "5px 5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg fill='%232C3E50' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5em center",
    backgroundSize: "0.9em 0.9em",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  };

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
          <Image
            src="/img/comp_1113.png"
            alt="COMP1113"
            width={400}
            height={400}
          />
          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            COMP 1113 - Applied Mathematics for Computing
          </p>
          <p
            style={{
              textAlign: "center",
            }}
          >
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
      {view === "baseCalculator" && (
        <div>
          <BaseCalculator
            base={base}
            setBase={setBase}
            num1={num1}
            setNum1={setNum1}
            num2={num2}
            setNum2={setNum2}
            operation={operation}
            setOperation={setOperation}
            operationStyle={operationStyles}
            calculationResult={calculationResult}
            setCalculationResult={setCalculationResult}
          />
          <CalculateResult result={calculationResult} />
        </div>
      )}
      {view === "miniFloatConverter" && <MiniFloatConverter />}
      {view === "miniFloatCalculator" && <MiniFloatCalculator />}
      {view === "numberConverter" && <NumberConverter />}
      {view === "booleanCalculator" && (
        <BooleanCalculator
          value1={boolValue1}
          setValue1={setBoolValue1}
          value2={boolValue2}
          setValue2={setBoolValue2}
          operation={boolOperation}
          setOperation={setBoolOperation}
        />
      )}
      {view === "booleanSimplifier" && (
        <div>
          <BooleanSimplifier
            expression={booleanExpression}
            setSimplifiedExpression={setSimplifiedBooleanExpression}
          />
        </div>
      )}
      {view === "exponentialOrLogarithm" && (
        <>
          <OperationTypeSelect
            operationType={operationType}
            setOperationType={setOperationType}
            options={["logarithm", "exponential"]}
          />
          {operationType === "logarithm" && (
            <LogarithmCalculator
              base={logBase}
              value={logValue}
              setValue={setLogValue}
              setBase={setLogBase}
              selectStyles={selectStyles}
              setResult={setResult}
              result={result}
            />
          )}
          {operationType === "exponential" && (
            <ExponentialCalculator
              base={expBase}
              value={expValue}
              setValue={setExpValue}
              setBase={setExpBase}
              selectStyles={selectStyles}
              setResult={setResult}
              result={result}
            />
          )}
        </>
      )}
      {view === "matrixCalculator" && (
        <MatrixCalculator
          matrix1={matrix1}
          setMatrix1={setMatrix1}
          matrix2={matrix2}
          setMatrix2={setMatrix2}
          matrixOperation={operation}
          setMatrixOperation={setOperation}
        />
      )}
    </RootLayout>
  );
}
