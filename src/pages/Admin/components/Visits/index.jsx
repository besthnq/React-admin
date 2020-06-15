import React from "react";
import { Col, Row, Progress } from "antd";
import { AreaChart, ColumnChart } from "bizcharts";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import Card from "@comps/Card";
import "./index.less";

const layout = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
};

const data1 = [
  { year: "1991", value: 3 },
  { year: "1992", value: 14 },
  { year: "1993", value: 6 },
  { year: "1994", value: 10 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 10 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

const data2 = [
  {
    type: "家具家电",
    sales: 38,
  },
  {
    type: "粮油副食",
    sales: 52,
  },
  {
    type: "生鲜水果",
    sales: 61,
  },
  {
    type: "美容洗护",
    sales: 145,
  },
  {
    type: "母婴用品",
    sales: 48,
  },
  {
    type: "进口食品",
    sales: 38,
  },
  {
    type: "食品饮料",
    sales: 38,
  },
  {
    type: "家庭清洁",
    sales: 38,
  },
];

export default function Visits() {
  return (
    <div>
      <Row gutter={16}>
        <Col {...layout}>
          <Card
            title="总销售额"
            number="￥123456"
            content={
              <>
                <span>
                  周同比 12% &nbsp;
                  <CaretUpOutlined style={{ color: "red" }} />
                </span>
                <span>
                  日同比 10% &nbsp;
                  <CaretDownOutlined style={{ color: "green" }} />
                </span>
              </>
            }
            footer="日销售额 ￥123456"
          ></Card>
        </Col>
        <Col {...layout}>
          <Card
            title="title"
            number="123456"
            content={
              <div className="charts-container">
                <AreaChart
                  data={data1}
                  forceFit
                  xField="year"
                  yField="value"
                  smooth
                  color="pink"
                  xAxis={{ visible: false }}
                  yAxis={{ visible: false }}
                />
              </div>
            }
            footer="footer..."
          ></Card>
        </Col>
        <Col {...layout}>
          <Card
            title="title"
            number="123456"
            content={
              <div className="charts-container">
                <ColumnChart
                  data={data2}
                  forceFit
                  padding="auto"
                  xField="type"
                  yField="sales"
                  meta={{
                    type: {
                      alias: "类别",
                    },
                    sales: {
                      alias: "销售额(万)",
                    },
                  }}
                  xAxis={{ visible: false }}
                  yAxis={{ visible: false }}
                />
              </div>
            }
            footer="footer..."
          ></Card>
        </Col>
        <Col {...layout}>
          <Card
            title="title"
            number="123456"
            content={
              <Progress
                 percent={60}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
            }
            footer="footer..."
          ></Card>
        </Col>
      </Row>
    </div>
  );
}
