import axios from "axios";

const API_URL = "http://localhost:3000";

// Search employees by department
export const searchEmployeesByDepartment = (department) => {
  return axios.get(
    `${API_URL}/search/${encodeURIComponent(department)}`
  );
};

// get all data
export const getAllEmployees = () => {
return axios.get(`${API_URL}/get`);
};

// Insert employee with image
export const insertEmployeeWithImage = (formData) => {
  return axios.post(`${API_URL}/insertimage`, formData);
};

// // insert data
// export const insertEmployee = (employeeData) => {
// return axios.post(`${API_URL}/post`, employeeData);
// };

// delete data 
export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// update data 
export const updateEmployee = (id, employeeData) => {
  return axios.patch(`${API_URL}/${id}`, employeeData);
};