import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/EmployeeCard.css";

const UPLOADS_URL = "http://localhost:3000/uploads/";

function EmployeeCard({ employee, onDelete }) {
  const navigate = useNavigate();
  const { _id, EmployeeName, Department, EmployeeSalary, ProfilePhoto } =
    employee;

  let photoUrl;
  if (ProfilePhoto) {
    photoUrl = UPLOADS_URL + ProfilePhoto;
  } else {
    photoUrl = PLACEHOLDER_IMAGE;
  }

  return (
   <>
    <Card className="employee-card h-100">
      <Card.Body>
        <div className="employee-profile">
          <img src={photoUrl} alt={EmployeeName} className="employee-photo" />

          <div className="employee-info">
            <h5 className="employee-name">{EmployeeName}</h5>
            <p className="employee-department">{Department}</p>
          </div>
        </div>

        <div className="employee-salary-section">
          <p className="salary-label">Monthly Salary</p>
          <h4 className="employee-salary">
            ₹{Number(EmployeeSalary || 0).toLocaleString("en-IN")}
          </h4>
        </div>

        <div className="employee-actions">
          <Button
            className="update-icon-button"
            onClick={() => navigate(`/update/${_id}`)}
            aria-label={`Update ${EmployeeName}`}
            title="Update Employee"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="update-icon"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M436.7 74.7L448 85.4 448 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l47.9 0-7.6-7.2c-.2-.2-.4-.4-.6-.6-75-75-196.5-75-271.5 0s-75 196.5 0 271.5 196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c99.9-99.9 261.7-100 361.7-.3z"
              />
            </svg>
          </Button>

          <Button
            className="delete-icon-button"
            onClick={() => onDelete(employee)}
            aria-label={`Delete ${EmployeeName}`}
            title="Delete Employee"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="delete-icon"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"
              />
            </svg>
          </Button>
        </div>
      </Card.Body>
    </Card>
   </>
  );
}

export default EmployeeCard;
