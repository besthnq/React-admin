import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

const MOCK_BASE_URL = `http://localhost:9527${BASE_URL}`;

// 获取一级分类分页列表数据
export function reqGetSubjectList(page, limit) {
  return request({
    method: "GET",
    url: `${MOCK_BASE_URL}/${page}/${limit}`,
  });
}

// 获取二级分类分页列表数据
export function reqGetSubSubjectList(parentId) {
  return request({
    method: "GET",
    url: `${MOCK_BASE_URL}/get/${parentId}`,
  });
}

// 添加课程分类
export function reqAddSubject(title, parentId) {
  return request({
    url: `${MOCK_BASE_URL}/save`,
    method: "POST",
    data: {
      // 请求参数
      title,
      parentId,
    },
  });
}
