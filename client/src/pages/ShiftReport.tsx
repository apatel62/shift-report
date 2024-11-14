import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

import { useOutletContext } from "react-router-dom";
import { login } from "../api/authAPI";
import { ReportData } from "../interfaces/ReportData";
import { MachineData } from "../interfaces/MachineData";
import { createReport, updateReport } from "../api/reportAPI";

interface ModalContextType {
  showSuccessModal: boolean;
  showEmailModal: boolean;
  setShowSuccessModal: (value: boolean) => void;
  setShowEmailModal: (value: boolean) => void;
}

import auth from "../utils/auth";

const ShiftReport = () => {
  const [newReport, setNewReport] = useState<ReportData | undefined>({
    id: null,
    shiftNumber: "",
    date: null,
    assignedUserId: null,
    assignedUser: null,
  });

  const [newMachine, setNewMachine] = useState<MachineData | undefined>({
    id: null,
    machine: "",
    machineStatus: "",
    partsMade: null,
    comments: null,
    assignedReportId: null,
    assignedReport: null,
  });

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

  const { setShowSuccessModal } = useOutletContext<ModalContextType>();

  const [loginCheck, setLoginCheck] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const checkLogin = () => {
    const isLoggedIn = auth.loggedIn();
    console.log(`Login Successful: ${isLoggedIn}`);
    if (isLoggedIn) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();

    const createNewReport = async () => {
      if (newReport) {
        await createReport(newReport);
      }
    };

    if (loginCheck) {
      setNewReport((prev) =>
        prev
          ? {
              ...prev,
              assignedUserId: Number.parseInt(
                localStorage.getItem("userId") as string
              ),
              date: new Date(),
            }
          : undefined
      );

      createNewReport();
    }
  }, []);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLoginError(false);
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      //console.log(`trying data: ${data}`);
      if (data.token) {
        auth.login(data.token);
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoginSubmit(e);
    }
  };

  const handleShiftChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShift = Number(event.target.value);
    setShiftValue(selectedShift);
    setNewReport((prev) =>
      prev ? { ...prev, shiftNumber: selectedShift.toString() } : undefined
    );
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

    setNewMachine((prev) => (prev ? { ...prev, machine: value } : undefined));

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
    if (machineValue !== "") {
      setIsUpChecked(true);
      setIsDownChecked(false);
      setIsPartsVisible(true);
    } else {
      setIsUpChecked(false);
      setIsPartsVisible(false);
    }
  };

  const handleDownChange = () => {
    if (machineValue !== "") {
      setIsUpChecked(false);
      setIsDownChecked(true);
      setIsPartsVisible(true);
    } else {
      setIsDownChecked(false);
      setIsPartsVisible(false);
    }
  };

  useEffect(() => {
    if (!isUpChecked && !isDownChecked && machineValue !== "") {
      setPartsMade("");
      setIsComButVisible(false);
    }
    if (isUpChecked) {
      setNewMachine((prev) =>
        prev ? { ...prev, machineStatus: "UP" } : undefined
      );
    } else {
      setNewMachine((prev) =>
        prev ? { ...prev, machineStatus: "DOWN" } : undefined
      );
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
    setNewMachine((prev) =>
      prev
        ? { ...prev, partsMade: Number.parseInt(event.target.value) }
        : undefined
    );
  };

  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComments(event.target.value);
    setNewMachine((prev) =>
      prev ? { ...prev, comments: event.target.value } : undefined
    );
  };

  const handleSubmitPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <>
      {/* Main content where the form questions are presented */}
      <main className="flex-shrink-0">
        {!loginCheck ? (
          <div className="login-notice">
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h4>Username</h4>
              <input
                type="text"
                name="username"
                className="form-control form-custom-1"
                value={loginData.username || ""}
                onKeyDown={handleKeyDown}
                onChange={handleLoginChange}
              />
              <h4>Password</h4>
              <input
                type="password"
                name="password"
                className="form-control form-custom-1"
                value={loginData.password || ""}
                onKeyDown={handleKeyDown}
                onChange={handleLoginChange}
              />
            </form>
            <h3
              className="login-error"
              style={{ display: loginError ? "block" : "none" }}
            >
              Invalid username and/or password!
            </h3>
            <button
              type="submit"
              className="btn btn-info  btn-lg btn-block btn-custom-1"
              onClick={handleLoginSubmit}
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <h2>Shift:</h2>
            {/* Shift select question */}
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

            {/* Machine filter & select question */}
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

            {/* Up Down checkbox question */}
            <div
              className="up-down"
              style={{ display: isUpDownVisible ? "block" : "none" }}
            >
              <h2>Up or Down:</h2>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio1"
                  value="up"
                  checked={isUpChecked}
                  onChange={handleUpChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Up
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  value="down"
                  checked={isDownChecked}
                  onChange={handleDownChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
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

            {/* Comments & submit button questions */}
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
                placeholder="Any additional comments..."
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
          </div>
        )}
      </main>
    </>
  );
};

export default ShiftReport;
