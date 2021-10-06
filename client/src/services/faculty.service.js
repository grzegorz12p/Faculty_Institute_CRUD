import http from "../http-common";

class FacultyDataService {
  getAll() {
    return http.get("/faculty");
  }

  get(id) {
    return http.get(`/faculty/${id}`);
  }

  create(data) {
    return http.post("/faculty", data);
  }

  update(id, data) {
    return http.put(`/faculty/${id}`, data);
  }

  delete(id) {
    return http.delete(`/faculty/${id}`);
  }
}

export default new FacultyDataService();