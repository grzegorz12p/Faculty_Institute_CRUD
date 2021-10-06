import http from "../http-common";

class InstituteDataService {
  getAll(facultyId) {
    return http.get(`/faculty/${facultyId}/institute`);
  }

  get(facultyId,id) {
    return http.get(`/faculty/${facultyId}/institute/${id}`);
  }

  create(facultyId,data) {
    return http.post(`/faculty/${facultyId}/institute`, data);
  }

  update(facultyId,id, data) {
    return http.put(`/faculty/${facultyId}/institute/${id}`, data);
  }

  delete(facultyId,id) {
    return http.delete(`/faculty/${facultyId}/institute/${id}`);
  }
}

export default new InstituteDataService();