import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditModal = ({ show, onHide, idNumber, setIdNumber }) => {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    date_of_birth: "",
    date_of_issue: "",
    date_of_expiry: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://thai-card.onrender.com/api/citizen/${idNumber}`
        );

        const userDataFromApi = response.data;
        setUserData(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show, idNumber]);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `https://thai-card.onrender.com/api/citizen/${idNumber}`,
        {
          // Adjust the data structure based on your API requirements
          name: userData.name,
          last_name: userData.last_name,
          date_of_birth: userData.date_of_birth,
          date_of_issue: userData.date_of_issue,
          date_of_expiry: userData.date_of_expiry,
        }
      );

      onHide();
      setIdNumber("");
      window.location.reload()
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <label htmlFor="firstName">Last Name:</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={userData.last_name}
              onChange={(e) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
            />
            <label htmlFor="firstName">Date of Birth:</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={userData.date_of_birth}
              onChange={(e) =>
                setUserData({ ...userData, date_of_birth: e.target.value })
              }
            />
            <label htmlFor="firstName">Date of Issue:</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={userData.date_of_issue}
              onChange={(e) =>
                setUserData({ ...userData, date_of_issue: e.target.value })
              }
            />
            <label htmlFor="firstName">Date of Expiry:</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={userData.date_of_expiry}
              onChange={(e) =>
                setUserData({ ...userData, date_of_expiry: e.target.value })
              }
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
