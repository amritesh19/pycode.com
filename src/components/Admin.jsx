import React, { useEffect, useState } from "react";
import { Card, Title, LineChart } from "@tremor/react";
import { Container, Row, Col } from "react-bootstrap";
import userService from "../services/userService";

const Admin = () => {
  const [users, setUsers] = useState(null);

  const fetchdata = async () => {
    try {
      const data = await userService.getAllDates();
      // console.log(data.docs);
      setUsers(
        data.docs.map((doc) => ({
          date: doc.id,
          counter:
            doc._document.data.value.mapValue.fields.counter.integerValue,
        }))
      );
      // console.log(data.docs[0]._document.data.value.mapValue.fields.counter.integerValue);
      // console.log(users);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchdata();
    // console.log(users);
  }, []);

  return (
    <Container style={{ width: "900px", height: "700px" }}>
      <Row>
        <Col>
          <div className="p-2 box">
            <Card>
              <Title>Number of Users</Title>
              <LineChart
                data={users}
                dataKey="date"
                categories={["counter"]}
                colors={["blue"]}
                marginTop="mt-6"
                yAxisWidth="w-10"
                showTooltip={true}
                showLegend={true}
                showGridLines={true}
                showAnimation={true}
                maxValue={20}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
