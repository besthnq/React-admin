const express = require("express");
const Mock = require("mockjs");

const app = express();

// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();

// 使用cors 解决跨域  app.use() 中间件，代表接受所有请求
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/admin/edu/subject/:page/:limit", (req, res) => {
  const { page, limit } = req.params;

  const data = Mock.mock({
    total: Random.integer(+limit + 1, limit * 2),
    [`items|${limit}`]: [
      {
        "_id|+1": 1,
        title: "@ctitle(2,5)",
        parentId: 0,
      },
    ],
  });

  res.json({
    code: 20000,
    success: true,
    data,
    message: "",
  });
});

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("服务器响应失败", err);
    return;
  }
  console.log("服务器启动成功");
});
