export const backendUrls = {
  hospitals: "http://localhost:8000/api/admin/hospitals/",
  hospitalById: "http://localhost:8000/api/admin/hospital/",
  hospitalSearch: "http://localhost:8000/api/admin/hospitals/search/",
  staffUser: "http://localhost:8000/api/admin/staffuser/",
  staffUserByHospital: (id) =>
    `http://localhost:8000/api/admin/hospital/${id}/superuser/`,
  staffUserById: (id) => `http://localhost:8000/api/admin/staffuser/${id}`,
};
