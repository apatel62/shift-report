import React, { useState } from "react";

const ShiftHistory = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isM1Checked, setIsM1Checked] = useState<boolean>(false);
  const [isM2Checked, setIsM2Checked] = useState<boolean>(false);
  const [isM3Checked, setIsM3Checked] = useState<boolean>(false);
  const [isM4Checked, setIsM4Checked] = useState<boolean>(false);
  const [isM5Checked, setIsM5Checked] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState<number>(0);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [isSubmitVisible, setIsSubmitVisible] = useState<boolean>(false);

  const [isDownloadVisible, setIsDownloadVisible] = useState<boolean>(false);
  const [isTableVisible, setIsTableVisible] = useState<boolean>(false);

  const isValidDateFormat = (date: string) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    //console.log(e.target.value);
    console.log(isValidDateFormat(e.target.value));
    if (isValidDateFormat(e.target.value) && isValidDateFormat(endDate)) {
      setIsCheckboxVisible(true);
    } else {
      setIsCheckboxVisible(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsAllChecked(false);
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    if (isValidDateFormat(startDate) && isValidDateFormat(e.target.value)) {
      setIsCheckboxVisible(true);
    } else {
      setIsCheckboxVisible(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsAllChecked(false);
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleAllChange = () => {
    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      if (isAllChecked) {
        setIsAllChecked(false);
        setIsFilterVisible(false);
        setFilterValue(0);
        setIsSubmitVisible(false);
        setIsDownloadVisible(false);
        setIsTableVisible(false);
      } else {
        if (
          isM1Checked ||
          isM2Checked ||
          isM3Checked ||
          isM4Checked ||
          isM5Checked
        ) {
          setIsAllChecked(true);
          setIsFilterVisible(true);
          setIsM1Checked(false);
          setIsM2Checked(false);
          setIsM3Checked(false);
          setIsM4Checked(false);
          setIsM5Checked(false);
        } else {
          setIsAllChecked(true);
          setIsFilterVisible(true);
        }
      }
    } else {
      setIsAllChecked(false);
      setIsCheckboxVisible(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleM1Change = () => {
    const newM1Checked = !isM1Checked;
    setIsM1Checked(newM1Checked);

    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      if (!newM1Checked) {
        if (isM2Checked || isM3Checked || isM4Checked || isM5Checked) {
          setIsFilterVisible(true);
        } else {
          setIsFilterVisible(false);
          setFilterValue(0);
          setIsSubmitVisible(false);
          setIsDownloadVisible(false);
          setIsTableVisible(false);
        }
      } else {
        if (isM2Checked && isM3Checked && isM4Checked && isM5Checked) {
          setIsAllChecked(true);
          setIsM1Checked(false);
          setIsM2Checked(false);
          setIsM3Checked(false);
          setIsM4Checked(false);
          setIsM5Checked(false);
        } else {
          setIsAllChecked(false);
          setIsFilterVisible(true);
        }
      }
    } else {
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleM2Change = () => {
    const newM2Checked = !isM2Checked;
    setIsM2Checked(newM2Checked);

    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      if (!newM2Checked) {
        if (isM1Checked || isM3Checked || isM4Checked || isM5Checked) {
          setIsFilterVisible(true);
        } else {
          setIsFilterVisible(false);
          setFilterValue(0);
          setIsSubmitVisible(false);
          setIsDownloadVisible(false);
          setIsTableVisible(false);
        }
      } else {
        if (isM1Checked && isM3Checked && isM4Checked && isM5Checked) {
          setIsAllChecked(true);
          setIsM1Checked(false);
          setIsM2Checked(false);
          setIsM3Checked(false);
          setIsM4Checked(false);
          setIsM5Checked(false);
        } else {
          setIsAllChecked(false);
          setIsFilterVisible(true);
        }
      }
    } else {
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleM3Change = () => {
    const newM3Checked = !isM3Checked;
    setIsM3Checked(newM3Checked);

    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      if (!newM3Checked) {
        if (isM1Checked || isM2Checked || isM4Checked || isM5Checked) {
          setIsFilterVisible(true);
        } else {
          setIsFilterVisible(false);
          setFilterValue(0);
          setIsSubmitVisible(false);
          setIsDownloadVisible(false);
          setIsTableVisible(false);
        }
      } else {
        if (isM1Checked && isM2Checked && isM4Checked && isM5Checked) {
          setIsAllChecked(true);
          setIsM1Checked(false);
          setIsM2Checked(false);
          setIsM3Checked(false);
          setIsM4Checked(false);
          setIsM5Checked(false);
        } else {
          setIsAllChecked(false);
          setIsFilterVisible(true);
        }
      }
    } else {
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleM4Change = () => {
    const newM4Checked = !isM4Checked;
    setIsM4Checked(newM4Checked);

    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      if (!newM4Checked) {
        if (isM1Checked || isM2Checked || isM3Checked || isM5Checked) {
          setIsFilterVisible(true);
        } else {
          setIsFilterVisible(false);
          setFilterValue(0);
          setIsSubmitVisible(false);
          setIsDownloadVisible(false);
          setIsTableVisible(false);
        }
      } else {
        if (isM1Checked && isM2Checked && isM3Checked && isM5Checked) {
          setIsAllChecked(true);
          setIsM1Checked(false);
          setIsM2Checked(false);
          setIsM3Checked(false);
          setIsM4Checked(false);
          setIsM5Checked(false);
        } else {
          setIsAllChecked(false);
          setIsFilterVisible(true);
        }
      }
    } else {
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleM5Change = () => {
    const newM5Checked = !isM5Checked;
    setIsM5Checked(newM5Checked);

    if (isValidDateFormat(startDate) && isValidDateFormat(endDate)) {
      if (!newM5Checked) {
        if (isM1Checked || isM2Checked || isM3Checked || isM4Checked) {
          setIsFilterVisible(true);
        } else {
          setIsFilterVisible(false);
          setFilterValue(0);
          setIsSubmitVisible(false);
          setIsDownloadVisible(false);
          setIsTableVisible(false);
        }
      } else {
        if (isM1Checked && isM2Checked && isM3Checked && isM4Checked) {
          setIsAllChecked(true);
          setIsM1Checked(false);
          setIsM2Checked(false);
          setIsM3Checked(false);
          setIsM4Checked(false);
          setIsM5Checked(false);
        } else {
          setIsAllChecked(false);
          setIsFilterVisible(true);
        }
      }
    } else {
      setIsM1Checked(false);
      setIsM2Checked(false);
      setIsM3Checked(false);
      setIsM4Checked(false);
      setIsM5Checked(false);
      setIsFilterVisible(false);
      setFilterValue(0);
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = Number(e.target.value);
    setFilterValue(selectedFilter);
    if (selectedFilter !== 0) {
      setIsSubmitVisible(true);
    } else {
      setIsSubmitVisible(false);
      setIsDownloadVisible(false);
      setIsTableVisible(false);
    }
  };

  const handleSubmitPress = () => {
    //create filtered table by grabbing data from database
    setIsDownloadVisible(true);
    setIsTableVisible(true);
  };

  const handlePdfDownload = () => {
    //call DynamicDoc API to convert fitlered table to pdf & download it to user's PC
  };

  return (
    <>
      <main className="flex-shrink-0">
        <div className="datepicker">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <label htmlFor="startDate">From</label>
              <input
                id="startDate"
                className="form-control"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <span id="startDateSelected">{startDate}</span>
            </div>
            <div className="col-lg-3 col-sm-6">
              <label htmlFor="endDate">To</label>
              <input
                id="endDate"
                className="form-control"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
              <span id="endDateSelected">{endDate}</span>
            </div>
          </div>
        </div>
        {/* Filter by machine checkbox question */}
        <div
          className="filter-checkbox"
          style={{ display: isCheckboxVisible ? "block" : "none" }}
        >
          <h2>Fitler by machine:</h2>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="all"
              checked={isAllChecked}
              onChange={handleAllChange}
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
              value="Machine 1"
              checked={isM1Checked}
              onChange={handleM1Change}
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
              value="Machine 2"
              checked={isM2Checked}
              onChange={handleM2Change}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              Machine 2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox4"
              value="Machine 3"
              checked={isM3Checked}
              onChange={handleM3Change}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox4">
              Machine 3
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox5"
              value="Machine 4"
              checked={isM4Checked}
              onChange={handleM4Change}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox5">
              Machine 4
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox6"
              value="Machine 5"
              checked={isM5Checked}
              onChange={handleM5Change}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox6">
              Machine 5
            </label>
          </div>
        </div>
        {/* Filter by daily, weekly, or monthly select question  */}
        <div
          className="filter-by"
          style={{ display: isFilterVisible ? "block" : "none" }}
        >
          <h2>Filter by daily, weekly, or monthly:</h2>
          <select
            id="filter-select"
            className="form-select form-select-lg mb-3 form-custom"
            aria-label=".form-select-lg example"
            value={filterValue}
            onChange={handleFilterChange}
          >
            <option value={0} disabled selected className="select-placeholder">
              Select option
            </option>
            <option value={1}>Daily</option>
            <option value={2}>Weekly</option>
            <option value={3}>Monthly</option>
          </select>
        </div>
        {/* Submit button  */}
        <button
          type="submit"
          className="btn btn-success btn-lg btn-block btn-custom"
          style={{ display: isSubmitVisible ? "block" : "none" }}
          onClick={handleSubmitPress}
        >
          View Table
        </button>
        {/* PDF download link  */}
        <a
          href="#"
          onClick={handlePdfDownload}
          style={{ display: isDownloadVisible ? "block" : "none" }}
        >
          {" "}
          Download Filtered History{" "}
        </a>
        {/* Filtered table  */}
        <table
          className="table table-bordered table-custom"
          style={{ display: isTableVisible ? "block" : "none" }}
        >
          <thead>
            <tr>
              <td>Date</td>
              <td>Machine</td>
              <td>Parts Produced</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </main>
    </>
  );
};

export default ShiftHistory;
