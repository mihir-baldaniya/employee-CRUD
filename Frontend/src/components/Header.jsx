import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../assets/css/Header.css";

function Header() {
  return (
    <>
      <Navbar className="app-header">
        {" "}
        <Container>
          <Navbar.Brand as={Link} to="/" className="header-brand">
            Employee Management
          </Navbar.Brand>

          <div className="header-right">
            <Navbar.Text className="header-subtitle">
              Employee Directory
            </Navbar.Text>

            <Button as={Link} to="/insert" className="header-button">
              + Add Employee
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
