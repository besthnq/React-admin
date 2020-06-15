import React, { Component } from "react";
import { Card, Button, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

// tab左侧内容
const tabList = [
  {
    key: "sales",
    tab: "销售量",
  },
  {
    key: "visits",
    tab: "访问量",
  },
];
const contentList = {
  sales: <p>sales content</p>,
  visits: <p>visits content</p>,
};

// 定制日期格式化
const dateFormat = "YYYY-MM-DD";

export default class Sales extends Component {
  state = {
    tabKey: "sales",
    datePicker: "day",
    rangeTime: [
      moment(moment().format(dateFormat), dateFormat),
      moment(moment().format(dateFormat), dateFormat),
    ],
  };

  onTabChange = (tabKey) => {
    this.setState({ tabKey });
  };
  //
  changeDatePicker = (datePicker) => {
    return () => {
      const time = moment(moment().format(dateFormat), dateFormat);
      let rangeTime = null;
      switch (datePicker) {
        case "year":
          rangeTime = [
            time,
            moment(moment().add(1, "y").format(dateFormat), dateFormat),
          ];
          break;
        case "month":
          rangeTime = [
            time,
            moment(moment().add(1, "M").format(dateFormat), dateFormat),
          ];
          break;
        case "week":
          rangeTime = [
            time,
            moment(moment().add(7, "d").format(dateFormat), dateFormat),
          ];
          break;

        default:
          rangeTime = [time, time];
          break;
      }
      this.setState({
        datePicker,
        rangeTime,
      });
    };
  };

  //
  rangePickerChange = (dates, dateString) => {
    console.log(dates);

    this.setState({
      rangeTime: dates,
    });
  };

  render() {
    const { tabKey, datePicker, rangeTime } = this.state;
    // tab右侧内容
    const extra = (
      <div>
        <Button
          type={datePicker === "day" ? "link" : "text"}
          onClick={this.changeDatePicker("day")}
        >
          今日
        </Button>
        <Button
          type={datePicker === "week" ? "link" : "text"}
          onClick={this.changeDatePicker("week")}
        >
          本周
        </Button>
        <Button
          type={datePicker === "month" ? "link" : "text"}
          onClick={this.changeDatePicker("month")}
        >
          本月
        </Button>
        <Button
          type={datePicker === "year" ? "link" : "text"}
          onClick={this.changeDatePicker("year")}
        >
          本年
        </Button>
        <RangePicker value={rangeTime} onChange={this.rangePickerChange} />
      </div>
    );
    return (
      <Card
        style={{ width: "100%", marginBottom: 20 }}
        tabList={tabList}
        activeTabKey={tabKey}
        tabBarExtraContent={extra}
        onTabChange={this.onTabChange}
      >
        {contentList[tabKey]}
      </Card>
    );
  }
}
