//import { useState, useEffect } from 'react';

const ShiftReport = () => {
  return (
    <>
      {/* Main content where the form questions are presented*/}
      <main className="flex-shrink-0">
        <h2>Shift:</h2>
        {/* Shift select question     */}
        <select
          id="shift-option"
          className="form-select form-select-lg mb-3 form-custom"
          aria-label=".form-select-lg example"
        >
          <option value="0" disabled selected className="select-placeholder">
            Select shift
          </option>
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
        </select>
        {/* Machine filter & select question  */}
        <div className="machine">
          <h2>Machine:</h2>
          <input
            className="form-control form-custom"
            list="machineOptions"
            id="machine-option"
            placeholder="Type to search category..."
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
        <div className="up-down">
          <h2>Up or Down:</h2>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="up"
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
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Down
            </label>
          </div>
        </div>
        {/* Parts Made question */}
        <div className="parts-produced">
          <h2>Parts Made:</h2>
          <div className="production">
            <input
              id="parts-made"
              type="number"
              className="form-control form-custom"
              min="0"
              step="1"
            />
          </div>
        </div>
        {/* <!--Comments & submit button questions-->  */}
        <div className="comments-button">
          <h2>Comments:</h2>
          <textarea
            id="comments"
            className="form-control form-custom-2"
            rows={3}
            cols={50}
            placeholder="Any additonal comments..."
          ></textarea>
          <button
            type="submit"
            className="btn btn-success btn-lg btn-block btn-custom"
          >
            Submit
          </button>
        </div>
      </main>
      {/* Boostrap modals
    No machine selected modal   */}
      <div
        className="modal fade"
        id="machineModal"
        tabIndex={-1}
        aria-labelledby="validationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h5 className="modal-title text-white" id="validationModalLabel">
                Cannot submit form
              </h5>
            </div>
            <div className="modal-body">
              <p>Please select a machine!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  No parts made entered modal  */}
      <div
        className="modal fade"
        id="numberModal"
        tabIndex={-1}
        aria-labelledby="validationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h5 className="modal-title text-white" id="validationModalLabel">
                Cannot submit form
              </h5>
            </div>
            <div className="modal-body">
              <p>Please fill out parts made!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* No up down selected modal */}
      <div
        className="modal fade"
        id="upDownModal"
        tabIndex={-1}
        aria-labelledby="validationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h5 className="modal-title text-white" id="validationModalLabel">
                Cannot submit form
              </h5>
            </div>
            <div className="modal-body">
              <p>
                Please select if the machine is up or down! Please only select
                one either Up or Down.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Success filling out form modal  */}
      <div
        className="modal fade"
        id="successModal"
        tabIndex={-1}
        aria-labelledby="validationModalLabel"
        aria-hidden="true"
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
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                id="end-shiftButton"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of shift modal  */}
      <div
        className="modal fade"
        id="endModal"
        tabIndex={-1}
        aria-labelledby="validationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="validationModalLabel">
                End of shift
              </h5>
            </div>
            <div className="modal-body">
              <p> Press Ok to see end of shift results.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="redirectButton"
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
