import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const CustomDateRangePicker: React.FC<{
  fromDate: Date | null;
  setFromDate: (date: Date | null) => void;
  toDate: Date | null;
  setToDate: (date: Date | null) => void;
}> = ({ fromDate, setFromDate, toDate, setToDate }) => {
  const handleStartDateChange = (date: Date | null) => {
    const formattedDate = date ? moment(date).format('MM/DD/YYYY') : null;
    setFromDate(formattedDate ? new Date(formattedDate) : null);
  };

  const handleEndDateChange = (date: Date | null) => {
    const formattedDate = date ? moment(date).format('MM/DD/YYYY') : null;
    setToDate(formattedDate ? new Date(formattedDate) : null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-gray-300">Start Date:</h4>
        <DatePicker
          selected={fromDate ? new Date(fromDate) : null}
          onChange={handleStartDateChange}
          selectsStart
          startDate={fromDate ? new Date(fromDate) : null}
          endDate={toDate ? new Date(toDate) : null}
          placeholderText={moment().format('MM/DD/YYYY')}
        />
      </div>
      <div>
        <h4 className="text-gray-300">End Date:</h4>
        <DatePicker
          selected={toDate ? new Date(toDate) : null}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={fromDate ? new Date(fromDate) : null}
          endDate={toDate ? new Date(toDate) : null}
          placeholderText={moment().format('MM/DD/YYYY')}
        />
      </div>
    </div>
  );
};

export default CustomDateRangePicker;
