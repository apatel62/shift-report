import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleAddEntryPress = () => {
    setShowSuccessModal(false);
    //window.location.reload(); //reloads the page so form can be filled out again
    window.location.assign('/') ;
    //save data to db
  };

  const handleConfirmModalPress = () => {
    setShowSuccessModal(false);
    setShowEmailModal(true);
    //save data to db
  };

  const handleEmailRequest = () => {
    //call Mailgun API
  };


  return (
    <>
      <div
        className={`app-container ${
          showSuccessModal || showEmailModal ? "body-blur" : ""
        }`}
      >
        <Nav />
        <Outlet
          context={{
            showSuccessModal,
            showEmailModal,
            setShowSuccessModal,
            setShowEmailModal,
          }}
        />
      </div>
      {/* Boostrap modals 
      {/* Success filling out form modal  */}
      <div
        className={`modal fade ${showSuccessModal ? "show" : ""}`}
        id="successModal"
        tabIndex={-1}
        style={{ display: showSuccessModal ? "block" : "none" }}
        aria-labelledby="validationModalLabel"
        aria-hidden={!showSuccessModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h5 className="modal-title text-white" id="validationModalLabel">
                Success!
              </h5>
            </div>
            <div className="modal-body">
              <p>
                Thank you for filling out the form! Would you like to add
                another machine to your shift report?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="add-extra-entryButton"
                onClick={handleAddEntryPress}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                id="end-shiftButton"
                onClick={handleConfirmModalPress}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of shift modal  */}
      <div
        className={`modal fade ${showEmailModal ? "show" : ""}`}
        id="endModal"
        tabIndex={-1}
        style={{ display: showEmailModal ? "block" : "none" }}
        aria-labelledby="validationModalLabel"
        aria-hidden={!showEmailModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="validationModalLabel">
                End of shift
              </h5>
            </div>
            <div className="modal-body">
              <p> Press Ok to send an email to everyone about today's shift.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="redirectButton"
                onClick={handleEmailRequest}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
