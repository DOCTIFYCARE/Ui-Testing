import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, ListItemText } from "@material-ui/core";
import ScienceIcon from "@mui/icons-material/Science";
import AddIcon from "@mui/icons-material/Add";
import ViewIcon from "@mui/icons-material/Visibility";
import "./Sidebar.css";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import {
  Business,
  Person,
  Schedule,
  LocalHotel,
  Description,
  LocalHospital,
  AssignmentInd,
  Event,
} from "@material-ui/icons";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? "" : index);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo-container" onClick={handleLinkClick}>
          <img src={'logo.png'} alt="Logo" className="sidebar-logo" />
        </Link>
      </div>
      <ul className="sidebar-menu">
        <li className={`sidebar-item ${activeSubMenu === "departmentSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("departmentSubMenu")}>
            <IconButton>
              <Business />
            </IconButton>
            <ListItemText primary="Department" className="sidebar-text sidebar-text-large" />
          </div>
          {activeSubMenu === "departmentSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/AddDepartment" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Add Department
                </Link>
              </li>
              <li>
                <Link to="/DepartmentList" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Departments
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "patientSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("patientSubMenu")}>
            <IconButton>
              <Person />
            </IconButton>
            <ListItemText primary="Patient" className="sidebar-text sidebar-text-small" />
          </div>
          {activeSubMenu === "patientSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/AddPatient" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Add Patient
                </Link>
              </li>
              <li>
                <Link to="/PatientList" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Patients
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "doctorSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("doctorSubMenu")}>
            <IconButton>
              <MedicalServicesIcon />
            </IconButton>
            <ListItemText primary="Doctor" />
          </div>
          {activeSubMenu === "doctorSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/addDoctor" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Add Doctor
                </Link>
              </li>
              <li>
                <Link to="/DoctorList" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Doctors
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "appointmentSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("appointmentSubMenu")}>
            <IconButton>
              <Schedule />
            </IconButton>
            <ListItemText primary="Appointment" />
          </div>
          {activeSubMenu === "appointmentSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/scheduleappointment" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Schedule Appointment
                </Link>
              </li>
              <li>
                <Link to="/viewappointments" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Appointments
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "bedmanagementSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("bedmanagementSubMenu")}>
            <IconButton>
              <LocalHotel />
            </IconButton>
            <ListItemText primary="Bed Management" />
          </div>
          {activeSubMenu === "bedmanagementSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/manage-beds" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Manage Beds
                </Link>
              </li>
              <li>
                <Link to="/view-bed-occupancy" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Bed Occupancy
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "billingSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("billingSubMenu")}>
            <IconButton>
              <Description />
            </IconButton>
            <ListItemText primary="Billing" />
          </div>
          {activeSubMenu === "billingSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/PatientSearch" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Patient Search
                </Link>
              </li>
              <li>
                <Link to="/GenerateInvoice" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  Generate Invoice
                </Link>
              </li>
              <li>
                <Link to="/PatientBillingDashboard" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  Billing Dashboard
                </Link>
              </li>
              <li>
                <Link to="/OutstandingBillsList" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  Outstanding Bills
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "pharmacySubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("pharmacySubMenu")}>
            <IconButton>
              <LocalHospital />
            </IconButton>
            <ListItemText primary="Pharmacy" />
          </div>
          {activeSubMenu === "pharmacySubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/manage-medication" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Manage Medication
                </Link>
              </li>
              <li>
                <Link to="/view-pharmacy-inventory" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Pharmacy Inventory
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "laboratorySubMenu" && "active"}`}>
          <Link to="/LaboratoryForm" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
            <div className="link-container">
              <IconButton>
                <ScienceIcon />
              </IconButton>
              <ListItemText primary="Laboratory" />
            </div>
          </Link>
        </li>
        <li className={`sidebar-item ${activeSubMenu === "humanresourceSubMenu" && "active"}`}>
          <div onClick={() => toggleSubMenu("humanresourceSubMenu")}>
            <IconButton>
              <AssignmentInd />
            </IconButton>
            <ListItemText primary="Human Resource" />
          </div>
          {activeSubMenu === "humanresourceSubMenu" && (
            <ul className="submenu">
              <li>
                <Link to="/manage-staff" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  Manage Staff
                </Link>
              </li>
              <li>
                <Link to="/view-employee-records" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                  View Employee Records
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-item ${activeSubMenu === "eventmanagementSubMenu" && "active"}`}>
          <Link to="/vital-events" style={{ textDecoration: "none", color: "black" }} onClick={handleLinkClick}>
            <div className="link-container">
              <IconButton>
                <Event />
              </IconButton>
              <ListItemText primary="Event Management" />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

