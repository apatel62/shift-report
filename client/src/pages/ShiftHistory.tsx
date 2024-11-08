//import { useState, useEffect } from 'react';

const ShiftHistory = () => {
  return (
    <>
      <main className="flex-shrink-0">
        <div className="datepicker">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <label htmlFor="startDate">From</label>
              <input id="startDate" className="form-control" type="date" />
              <span id="startDateSelected"></span>
            </div>
            <div className="col-lg-3 col-sm-6">
              <label htmlFor="endDate">To</label>
              <input id="endDate" className="form-control" type="date" />
              <span id="endDateSelected"></span>
            </div>
          </div>
        </div>
        {/* Filter by machine checkbox question */}
        <div className="filter-checkbox">
          <h2>Fitler by machine:</h2>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="up"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              ALL
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
              Machine 1
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox3"
              value="down"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Machine 2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox4"
              value="down"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Machine 3
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox5"
              value="down"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Machine 4
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox6"
              value="down"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Machine 5
            </label>
          </div>
        </div>
        {/* Filter by daily, weekly, or monthly select question  */}
        <div className="filter-by">
          <h2>Filter by daily, weekly, or monthly:</h2>
          <select
            id="filter-select"
            className="form-select form-select-lg mb-3 form-custom"
            aria-label=".form-select-lg example"
          >
            <option value="0" disabled selected className="select-placeholder">
              Select option
            </option>
            <option value="1">Daily</option>
            <option value="2">Weekly</option>
            <option value="3">Monthly</option>
          </select>
        </div>
      </main>
    </>
  );
};

export default ShiftHistory;
