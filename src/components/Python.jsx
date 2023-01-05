import React, { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';
import { createPythonClient } from "../services/pythonService";
import { Container, Row, Col, Button } from "react-bootstrap";

const initialCode = `# Diamond Shaped Pattern Program
def pattern(n):
     k = 2 * n - 2
     for i in range(0, n):
          for j in range(0 , k):
               print(end=" ")
          k = k - 1
          for j in range(0 , i + 1 ):
               print("* ", end="")
          print("\\r")
     k = n - 2
     for i in range(n , -1, -1):
          for j in range(k , 0 , -1): 
              print(end=" ")
          k = k + 1
          for j in range(0 , i + 1):
              print("* ", end="")
          print("\\r")
 
pattern(5)`

const Python = () => {
    const [output, setOutput] = useState("");
    const [input, setInput] = useState(initialCode);
    const [pyodide, setPyodide] = useState(null)

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
        setPyodide(pyodide)
      })
  }, [])

  return (
    <div>
    <Container style={{ width: "900px" , height: "900px"}}>
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
    <Button  variant="dark" style={{borderRadius: "20px", margin: "10px"}} onClick={()=>runCode(input)}>{pyodide?"Run Code ":"Loading Python..."}</Button>
    </div>
    </Col></Row>

      <Row><Col>
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
            </div>
            </Col>
          </Row>
      </Container>
        </div>
    )
};

export default Python;