const baseUrl = 'http://127.0.0.1:3000'
const api = {
  version: `1.0`,
  upload: `/file_v1/upload`,
  projectErrorInfoList: `/projectErrorInfo_v1/projectErrorInfoList`,
  addProjectErrorInfo: `/projectErrorInfo_v1/addProjectErrorInfo`,
  projectUpdate: `/project_v1/projectUpdate`,
  projectFindOne: `/project_v1/projectFindOne`,
  projectList: `/project_v1/projectList`,
  addProject: `/project_v1/addProject`,
  register: `/users_v1/register`,
  login: `/users_v1/login`,
  json: `/users_v1/json`
}
for (const key in api) {
  if (api.hasOwnProperty(key)) {
    api[key] = baseUrl + api[key]
  }
}
export default api
