import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Modal,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

import EmployeeCard from "../components/EmployeeCard";
import {
  getAllEmployees,
  searchEmployeesByDepartment,
  deleteEmployee,
} from "../services/employeeService";

import "../assets/css/Home.css";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  // Load all employees
  const loadEmployees = () => {
    getAllEmployees().then((response) => {
      setEmployees(response.data);
    });
  };

  // Search employees by department
  const handleSearch = (value) => {
    setSearch(value);

    if (value) {
      searchEmployeesByDepartment(value).then((response) => {
        setEmployees(response.data);
      });
    } else {
      loadEmployees();
    }
  };

  // Delete selected employee
  const handleDelete = () => {
    deleteEmployee(selectedEmployee._id).then(() => {
      setEmployees(employees.filter((e) => e._id !== selectedEmployee._id));
      setMessage("Employee deleted successfully.");
      setSelectedEmployee(null);
    });
  };

  // Message shown when no employees are found
  let emptyMessage = "";

  if (search) {
    emptyMessage = `No employees found in the "${search}" department.`;
  } else {
    emptyMessage = "There are currently no employees to display.";
  }

  return (
    <>
      <Container className="home-container">
        <div className="page-heading">
          <div>
            <h2>All Employees</h2>
            <p>View and manage your employee directory.</p>
          </div>

          <div className="employee-count">{employees.length} Employees</div>
        </div>

        <div className="employee-search">
          <InputGroup>
            <InputGroup.Text>⌕</InputGroup.Text>

            <Form.Control
              placeholder="Search by department (e.g. IT, HR, Sales)"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {search && (
              <Button
                variant="outline-secondary"
                onClick={() => handleSearch("")}
              >
                Clear
              </Button>
            )}
          </InputGroup>
        </div>

        {message && (
          <Alert variant="success" dismissible onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}

        {employees.length === 0 && (
          <div className="empty-state">
            <h5>No Employees Found</h5>
            <p>{emptyMessage}</p>
          </div>
        )}

        {employees.length > 0 && (
          <Row className="g-4">
            {employees.map((employee) => (
              <Col key={employee._id} xs={12} sm={6} lg={4}>
                <EmployeeCard
                  employee={employee}
                  onDelete={setSelectedEmployee}
                />
              </Col>
            ))}
          </Row>
        )}

        <Modal
          show={Boolean(selectedEmployee)}
          onHide={() => setSelectedEmployee(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to delete{" "}
            <strong>{selectedEmployee?.EmployeeName}</strong>? This action
            cannot be undone.
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setSelectedEmployee(null)}
            >
              Cancel
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
