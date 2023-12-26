/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import MyVerticallyCenteredModal from "../components/Modal";
import EditModal from "../components/EditModal";
import HistoryModal from "../components/History";
import axios from "axios";

import Img from "../assets/img/hero-img.png";
const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState();
  const [isImageUploaded, setIsImageUploaded] = useState(null);
  const [name, setName] = useState("name");
  const [idNumber, setIdNumber] = useState();
  // const [identification_number, setIdentification_number] = useState();
  const [last_name, setLastName] = useState("lastname");
  const [date_of_birth, setDOB] = useState("date of birth");
  const [date_of_issue, setDOI] = useState("date of issue");
  const [date_of_expiry, setDOE] = useState("date of expiry");
  const [imageloading, setImageLoading] = useState(false);
  const [isFindingID, setisFindingID] = useState(false);
  const [modalEdit, setModalEditShow] = useState(false);
  const [error, setError] = useState(null);
  const [showModalHistory, setShowModalHistory] = useState(false);

  // const handleUpdateID = () => {
  //   setModalEditShow(true);
  //   setisFindingID(false);
  // };

  const handleSave = async () => {
    setIsImageUploaded(false);

    try {
      const response = await axios.post(
        "https://thai-card.onrender.com/api/citizen",
        {
          idNumber,
          name,
          last_name,
          date_of_birth,
          date_of_issue,
          date_of_expiry,
        }
      );

      // Debugging: Log the response data to see what is received
      console.log("Response Data:", response.data);

      // Check if the response contains the expected data
      if (!response.data || Object.keys(response.data).length === 0) {
        // Debugging: Log a message to see if this block is reached
        console.log("Invalid image. Cannot save.");

        // Display an error message
        alert("Image invalid. Cannot save.");

        // Debugging: Log a message to see if the alert is shown
        console.log("Alert displayed.");

        // Return without further processing
        return;
      }

      // Continue with further processing or UI updates as needed
      setIdNumber("");
    } catch (error) {
      console.error("Error saving user data:", error.message);
      // Handle other error cases if needed
    }
  };

  const handleUploadID = () => {
    setModalShow(true);
    setisFindingID(false);
  };
  const handleHistory = () => {
    setShowModalHistory(true);
    setisFindingID(false);
  };

  // const handleCancel = () => {
  //   setIsImageUploaded(false);
  //   setisFindingID(false);
  //   setIdNumber("");
  // };

  // const handleDelete = async () => {
  //   setIsImageUploaded(false);
  //   setisFindingID(false);

  //   console.log("IN DELETE CALL", idNumber);
  //   console.log(idNumber);
  //   try {
  //     const response = await axios.delete(
  //       `https://thai-card.onrender.com/api/citizen/${idNumber}`
  //     );
  //     setIdNumber("");
  //   } catch (error) {
  //     console.error("Error during data deletion:", error.message);
  //   }
  // };

  // const handleFind = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://thai-card.onrender.com/api/citizen/${idNumber}`
  //     );
  //     if (Object.keys(response.data).length === 0) {
  //       // Set an error or handle it as appropriate for your application
  //       setError("Citizen Not Found With The Provided ID");
  //       return;
  //     }
  //     const {
  //       name,
  //       identification_number,
  //       last_name,
  //       date_of_birth,
  //       date_of_issue,
  //       date_of_expiry,
  //     } = response.data;
  //     setIdentification_number(identification_number);
  //     setDOB(date_of_birth);
  //     setDOE(date_of_expiry);
  //     setName(name);
  //     setLastName(last_name);
  //     setDOI(date_of_issue);
  //     setisFindingID(true);
  //     setError(null);
  //   } catch (error) {
  //     console.error("Error during data retrieval:", error.message);
  //     setError(null);
  //   }
  // };

  return (
    <>
      <div
        style={{ margin: "auto", textAlign: "center", marginBottom: "50px" }}
      >
        <section id="hero" className="d-flex align-items-center py-5">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h1>THAI CARD OCR FOR QOALA</h1>
                <h2>MADE BY KASHISH JAIN - 19DEC011</h2>

                <div className="d-flex justify-content-center justify-content-lg-start">
                  <Button
                    variant="light"
                    onClick={handleUploadID}
                    style={{ marginLeft: "60px", marginRight: "10px" }}
                  >
                    Upload ID Card
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleHistory}
                    style={{ marginLeft: "100px", marginRight: "10px" }}
                  >
                    History
                  </Button>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img src={Img} className="img-fluid animated" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-5">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              {isImageUploaded && !imageloading ? <h2>Card Details</h2> : null}
            </div>

            <div className="row content">
              <div className="col-lg-6">
                {isImageUploaded && !imageloading ? (
                  <div div className="d-flex flex-column align-items-center">
                    <Image
                      src={image}
                      thumbnail
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                ) : // The third case can be left empty or filled with another component or text
                null}
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0">
                {!imageloading && isImageUploaded ? (
                  <div className="">
                    <h6 className="my-2">Name: {name}</h6>
                    <h6 className="my-2">Last Name: {last_name}</h6>
                    <h6 className="my-2">ID Number: {idNumber}</h6>
                    <h6 className="my-2">Date Of Birth: {date_of_birth}</h6>
                    <h6 className="my-2">Date Of Issue: {date_of_issue}</h6>
                    <h6 className="my-2">Date Of Expiry: {date_of_expiry}</h6>
                    <div className="my-3 p-3 ">
                      {name &&
                        last_name &&
                        date_of_birth &&
                        date_of_issue &&
                        date_of_expiry && (
                          <Button
                            className="mt-3 ml-2"
                            variant="success"
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                        )}

                      <Button
                        className="mt-3  mx-auto mr-2"
                        variant="primary"
                        onClick={() => setIsImageUploaded(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : !isImageUploaded && imageloading ? (
                  <h2 className="text-align-start">
                    Loading Details....
                  </h2>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="container bg-body-secondary ">
          <div className="form_outline">
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setImage={setImage}
              setIsImageUploaded={setIsImageUploaded}
              setDOB={setDOB}
              setDOE={setDOE}
              setDOI={setDOI}
              setIdNumber={setIdNumber}
              setLastName={setLastName}
              setName={setName}
              setImageLoading={setImageLoading}
            />

            <EditModal
              show={modalEdit}
              onHide={() => setModalEditShow(false)}
              idNumber={idNumber}
              setIdNumber={setIdNumber}
            />
            <HistoryModal
              show={showModalHistory}
              onHide={() => setShowModalHistory(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
