import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const MOCK_BASE_URL = `http://localhost:9527${BASE_URL}`;

// 获取一级分类分页列表数据
export function reqGetSubjectList(page, limit) {
  return request({
    method: "GET",
    url: `${BASE_URL}/${page}/${limit}`,
  });
}

// 获取二级分类分页列表数据
export function reqGetSubSubjectList(parentId) {
  return request({
    method: "GET",
    url: `${BASE_URL}/get/${parentId}`,
  });
}

// 添加课程分类
export function reqAddSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      // 请求参数
      title,
      parentId,
    },
  });
}

// 更新课程分类
export function reqUpdateSubject(title, id) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      // 请求参数
      title,
      id,
    },
  });
}

// 删除课程分类
export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}

// 获取所有一级课程分类
export function reqGetAllSubjectList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}
