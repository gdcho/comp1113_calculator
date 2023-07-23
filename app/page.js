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
import BooleanExpression from "./components/booleanAlgebra/SOPPOS";

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

  const operationStyles = {
    display: "inline-block",
    position: "relative",
    textAlign: "center",
    width: "80px",
    height: "30px",
    fontSize: "12px",
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
            width={300}
            height={300}
          />
        </div>
      )}
      {view === "baseConverter" && (
        <div>
          <ValueInput value={value} setValue={setValue} />
          <br />
          <div className="flex justify-around items-center">
            <BaseSelect
              base={fromBase}
              setBase={setFromBase}
              operationStyle={operationStyles}
            />
            <p>to</p>
            <BaseSelect
              base={toBase}
              setBase={setToBase}
              operationStyle={operationStyles}
            />
          </div>
          <Result result={result} calculation={calculation} toBase={toBase} />
          <br />
        </div>
      )}
      {view === "baseCalculator" && (
        <>
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
        </>
      )}
      {view === "miniFloatConverter" && <MiniFloatConverter />}
      {view === "miniFloatCalculator" && (
        <MiniFloatCalculator operationStyle={operationStyles} />
      )}
      {view === "numberConverter" && (
        <NumberConverter operationStyle={operationStyles} />
      )}
      {view === "booleanExpression" && <BooleanExpression />}
      {view === "booleanCalculator" && (
        <BooleanCalculator
          value1={boolValue1}
          setValue1={setBoolValue1}
          value2={boolValue2}
          setValue2={setBoolValue2}
          operation={boolOperation}
          setOperation={setBoolOperation}
          operationStyle={operationStyles}
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
            operationStyle={operationStyles}
          />
          {operationType === "logarithm" && (
            <LogarithmCalculator
              base={logBase}
              value={logValue}
              setValue={setLogValue}
              setBase={setLogBase}
              setResult={setResult}
              result={result}
              style={operationStyles}
            />
          )}
          {operationType === "exponential" && (
            <ExponentialCalculator
              base={expBase}
              value={expValue}
              setValue={setExpValue}
              setBase={setExpBase}
              setResult={setResult}
              result={result}
              style={operationStyles}
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
          operationStyle={operationStyles}
        />
      )}
    </RootLayout>
  );
}
