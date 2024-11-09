import React, { useState, useEffect } from "react";

const ShiftReport = () => {
  const [shiftValue, setShiftValue] = useState<number>(0);
  const [machineValue, setMachineValue] = useState<string>("");
  const [isUpChecked, setIsUpChecked] = useState<boolean>(false);
  const [isDownChecked, setIsDownChecked] = useState<boolean>(false);
  const [partsMade, setPartsMade] = useState("");
  const [comments, setComments] = useState<string>("");

  const [isMachineVisible, setIsMachineVisible] = useState<boolean>(false);
  const [isUpDownVisible, setIsUpDownVisible] = useState<boolean>(false);
  const [isPartsVisible, setIsPartsVisible] = useState<boolean>(false);
  const [isComButVisible, setIsComButVisible] = useState<boolean>(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleShiftChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShift = Number(event.target.value);
    setShiftValue(selectedShift);
    if (selectedShift !== 0) {
      setIsMachineVisible(true);
    } else {
      setIsMachineVisible(false);
    }
  };

  const handleMachineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const validMachineOptions = [
      "Machine 1",
      "Machine 2",
      "Machine 3",
      "Machine 4",
      "Machine 5",
    ];

    const isValidMachine = validMachineOptions.includes(value);
    setMachineValue(value);

    if (value !== "" && isValidMachine) {
      setIsUpDownVisible(true);
    } else {
      setIsUpDownVisible(false);
      setIsUpChecked(false);
      setIsDownChecked(false);
      setIsPartsVisible(false);
      setPartsMade("");
      setIsComButVisible(false);
    }
  };

  const handleUpChange = () => {
    setIsUpChecked((prev) => {
      const val = !prev; //changes from false to true and vice versa as prev grabs the previous state value
      setIsPartsVisible((val || isDownChecked) && machineValue !== "");
      return val;
    });
  };

  const handleDownChange = () => {
    setIsDownChecked((prev) => {
      const val = !prev;
      setIsPartsVisible((val || isUpChecked) && machineValue !== "");
      return val;
    });
  };

  useEffect(() => {
    if (!isUpChecked && !isDownChecked && machineValue !== "") {
      setPartsMade("");
      setIsComButVisible(false);
    }
  }, [isUpChecked, isDownChecked, machineValue]);

  const handlePartsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //const value = Number(event.target.value);
    setPartsMade(event.target.value);
    if (event.target.value === "") {
      setIsComButVisible(false);
    } else {
      setIsComButVisible(true);
    }
  };

  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComments(event.target.value);
  };

  const handleSubmitPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSuccessModal(true);
  };

  const handleAddEntryPress = () => {
    setShowSuccessModal(false);
    window.location.reload(); //reloads the page so form can be filled out again
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
      {/* Main content where the form questions are presented*/}
      <main
        className={`flex-shrink-0 ${
          showSuccessModal || showEmailModal ? "body-blur" : ""
        }`}
      >
        <h2>Shift:</h2>
        {/* Shift select question     */}
        <select
          id="shift-option"
          className="form-select form-select-lg mb-3 form-custom"
          aria-label=".form-select-lg example"
          value={shiftValue}
          onChange={handleShiftChange}
        >
          <option value={0} disabled className="select-placeholder">
            Select shift
          </option>
          <option value={1}>Shift 1</option>
          <option value={2}>Shift 2</option>
        </select>
        {/* Machine filter & select question  */}
        <div
          className="machine"
          style={{ display: isMachineVisible ? "block" : "none" }}
        >
          <h2>Machine:</h2>
          <input
            className="form-control form-custom"
            list="machineOptions"
            id="machine-option"
            placeholder="Type to search category..."
            value={machineValue}
            onChange={handleMachineChange}
          />
          <datalist id="machineOptions">
            <option value="Machine 1" />
            <option value="Machine 2" />
            <option value="Machine 3" />
            <option value="Machine 4" />
            <option value="Machine 5" />
          </datalist>
        </div>
        {/* Up Down checkbox question  */}
        <div
          className="up-down"
          style={{ display: isUpDownVisible ? "block" : "none" }}
        >
          <h2>Up or Down:</h2>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="up"
              checked={isUpChecked}
              onChange={handleUpChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Up
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="down"
              checked={isDownChecked}
              onChange={handleDownChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Down
            </label>
          </div>
        </div>
        {/* Parts Made question */}
        {isPartsVisible && (
          <div className="parts-produced">
            <h2>Parts Made:</h2>
            <div className="production">
              <input
                id="parts-made"
                type="number"
                className="form-control form-custom"
                step="1"
                value={partsMade}
                onChange={handlePartsChange}
              />
            </div>
          </div>
        )}
        {/* <!--Comments & submit button questions-->  */}
        <div
          className="comments-button"
          style={{ display: isComButVisible ? "block" : "none" }}
        >
          <h2>Comments:</h2>
          <textarea
            id="comments"
            className="form-control form-custom-2"
            rows={3}
            cols={50}
            placeholder="Any additonal comments..."
            value={comments}
            onChange={handleCommentsChange}
          ></textarea>
          <button
            type="submit"
            className="btn btn-success btn-lg btn-block btn-custom"
            onClick={handleSubmitPress}
          >
            Submit
          </button>
        </div>
      </main>
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
};

export default ShiftReport;
