import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { createPythonClient } from "../services/pythonService";
import { Container, Row, Col, Button } from "react-bootstrap";

const initialCode = `# Note that numpy as np is pre-imported

# Creating array object
arr = np.array( [[ 1, 2, 3],[ 4, 2, 5]] )

# Printing type of arr object
print("Array is of type: ", type(arr))

# Printing array dimensions (axes)
print("No. of dimensions: ", arr.ndim)

# Printing shape of array
print("Shape of array: ", arr.shape)

# Printing size (total number of elements) of array
print("Size of array: ", arr.size)

# Printing type of elements in array
print("Array stores elements of type: ", arr.dtype)`;

// Python code that is preloaded before the user's code is run
// <- [reference](https://stackoverflow.com/a/59571016/1375972)
const preloadNumpyCode = `
import numpy as np`;

const Numpy = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState(initialCode);
  const [pyodide, setPyodide] = useState(null);

  async function preloadNumpy(pyodide) {
    await pyodide.loadPackage("numpy");
    pyodide.runPython(preloadNumpyCode);
    return pyodide;
  }

  async function runCode(code) {
    //console.log(pythonClient);
    let pythonClient = createPythonClient(pyodide);
    const out = await pythonClient.run({ code });
    setOutput(out);
  }

  useEffect(() => {
    window
      .loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      })
      .then((pyodide) => {
        console.log("Loading numpy");
        return preloadNumpy(pyodide);
      })
      .then((pyodide) => {
        setPyodide(pyodide);
      });
  }, []);

  return (
    <div>
      <Container style={{ width: "900px", height: "1000px" }}>
        <Row>
          <Col>
            <div className="p-2 box">
              <Editor
                value={initialCode}
                onChange={(data) => setInput(data)}
                height="20rem"
                defaultLanguage="python"
                theme="vs-dark"
                options={{
                  readOnly: false,
                  fontSize: 13,
                  minimap: { enabled: false },
                  padding: { top: 16 },
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="center">
              <Button
                variant="dark"
                style={{ borderRadius: "20px", margin: "10px" }}
                onClick={() => runCode(input)}
              >
                {pyodide ? "Run Code " : "Loading Numpy..."}
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="p-2 box"
              style={{ marginTop: "10px", marginBottom: "30px" }}
            >
              <Editor
                value={output.toString()}
                height="20rem"
                defaultLanguage="Markdown"
                theme="vs-dark"
                options={{
                  readOnly: false,
                  fontSize: 13,
                  minimap: { enabled: false },
                  padding: { top: 16 },
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Numpy;
