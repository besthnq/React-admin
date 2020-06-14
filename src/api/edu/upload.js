import request from "@utils/request";

// 获取七牛上传凭证
export function reqGetUploadToken() {
  return request({
    method: "GET",
    url: "/uploadtoken",
  });
}
