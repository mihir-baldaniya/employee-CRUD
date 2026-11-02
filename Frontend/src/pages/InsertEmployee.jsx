import { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAllEmployees,
  insertEmployeeWithImage,
  updateEmployee,
} from "../services/employeeService";

import "../assets/css/InsertEmployee.css";

const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing", "Sales", "Design"];

function InsertEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const title = isUpdate ? "Update" : "Add";

  const [formData, setFormData] = useState({
    EmployeeName: "",
    EmployeeSalary: "",
    Department: "",
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isUpdate);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load employee details for updating
  useEffect(() => {
    if (!isUpdate) return;

    getAllEmployees().then(({ data }) => {
      const { EmployeeName, EmployeeSalary, Department } = data.find(
        (item) => item._id === id,
      );
      setFormData({ EmployeeName, EmployeeSalary, Department });
      setLoading(false);
    });
  }, [id, isUpdate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isUpdate) {
        await updateEmployee(id, formData);
      } else {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
          data.append(key, value),
        );
        if (profile) data.append("profile", profile);

        await insertEmployeeWithImage(data);
      }

      navigate("/");
    } catch {
      setError(`Failed to ${title.toLowerCase()} employee.`);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="loading-container">
        <Spinner animation="border" variant="secondary" />
        <p>Loading employee details...</p>
      </Container>
    );
  }

  return (
    <Container className="insert-container">
      <div className="insert-card">
        <h2>{title} Employee</h2>
        <p className="insert-description">Enter the employee details below.</p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              name="EmployeeName"
              placeholder="Enter employee name"
              value={formData.EmployeeName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Employee Salary</Form.Label>
            <Form.Control
              type="number"
              name="EmployeeSalary"
              placeholder="Enter monthly salary"
              value={formData.EmployeeSalary}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="insert-button flex-grow-1"
              disabled={submitting}
            >
              {submitting ? "Saving..." : `${title} Employee`}
            </Button>

            <Button
              variant="outline-secondary"
              onClick={() => navigate("/")}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default InsertEmployee;