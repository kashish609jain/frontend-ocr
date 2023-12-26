import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import EditModal from "../components/EditModal";
import axios from "axios";

const HistoryModal = ({ show, onHide }) => {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [idNumber, setIdNumber] = useState();
  const [modalEdit, setModalEditShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://thai-card.onrender.com/api/citizen/"
        );
        setHistoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history data:", error.message);
        setLoading(false);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show]);

  useEffect(() => {
    // Filter data based on search term
    const filtered = historyData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, historyData]);

  const handleDelete = async (identification_number) => {
    try {
      await axios.delete(
        `https://thai-card.onrender.com/api/citizen/${identification_number}`
      );
      const updatedData = filteredData.filter(
        (item) => item.identification_number !== identification_number
      );
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error during data deletion:", error.message);
    }
  };

  const handleEdit = async (identification_number) => {
    setIdNumber(identification_number);
    setModalEditShow(true);
  };

  

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl" // set the size to large
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="searchTerm">
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <EditModal
          show={modalEdit}
          onHide={() => setModalEditShow(false)}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
        />
        {loading ? (
          <p>Loading history data...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Date of Issue</th>
                <th>Date of Expiry</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id}>
                  <td>{item.identification_number}</td>
                  <td>{item.name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.date_of_birth}</td>
                  <td>{item.date_of_issue}</td>
                  <td>{item.date_of_expiry}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleEdit(item.identification_number)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.identification_number)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryModal;
