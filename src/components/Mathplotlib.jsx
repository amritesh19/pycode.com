import React, { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';
import { createPythonClient } from "../services/pythonService";
import { Container, Row, Col, Button } from "react-bootstrap";


const initialCode = `# Note that matplotlib.pyplot as plt is pre-imported
import numpy as np

plt.clf() # Clear existing plot
plt.plot([0, 1], [0, 1], label="Line")
nx = 101
x = np.linspace(0.0, 1.0, nx)
y = 0.3*np.sin(x*8) + 0.4
plt.plot(x, y, label="Curve")
plt.legend()
plt.show()`

const plotElementId = 'plot'
// Python code that is preloaded before the user's code is run
// <- [reference](https://stackoverflow.com/a/59571016/1375972)
const preloadMatplotlibCode = `
import matplotlib.pyplot as plt
from js import document

f = plt.figure()

def get_render_element(self):
    return document.getElementById('${plotElementId}')

f.canvas.create_root_element = get_render_element.__get__(
    get_render_element, f.canvas.__class__
)`

const Mathplotlib = () => {
    const [output, setOutput] = useState("");
    const [input, setInput] = useState(initialCode);
    const [pyodide, setPyodide] = useState(null);

    async function preloadMatplotlib(pyodide) {
    await pyodide.loadPackage('matplotlib')
    pyodide.runPython(preloadMatplotlibCode)
    return pyodide
  }

  async function runCode(code) {
    //console.log(pythonClient);
    let pythonClient = createPythonClient(pyodide)
    const out = await pythonClient.run({ code });
    setOutput(out);
  }

    useEffect(() => {
    window
      .loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
      })
      .then((pyodide) => {
        console.log('Loading matplotlib')
        return preloadMatplotlib(pyodide)
      },
      (ex)=>{
        console.log(ex)
        if(ex ===Error("Pyodide is already loading."))
          console.log("hi")
      }
      )
      .then((pyodide) => {
        setPyodide(pyodide)
      })

      // if(!pyodide)
      //   toast("Reload to load pyodide.");
  }, [])

  return (
    <div>
    <Container style={{ width: "900px" , height: "1000px"}}>
      <Row><Col>
      <div className="p-2 box">
    <Editor     
              value={initialCode}
              onChange={(data)=>setInput(data)}
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
      
      <Row><Col>
      <div className="center">
    <Button  variant="dark" style={{borderRadius: "20px", margin: "10px"}} onClick={()=>runCode(input)}>{pyodide?"Run Code ":"Loading Matplotlib..."}</Button>
    </div>
    </Col></Row>

      <Row><Col>
      {!output&&<div id={plotElementId} style={{ marginTop: "10px", marginBottom: "100px"}}/>}
      {output&&
      <div className="p-2 box" style={{ marginTop: "10px", marginBottom: "30px"}}>
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
            </div>}
            </Col>
          </Row>
      </Container>
        </div>
    )
};

export default Mathplotlib;