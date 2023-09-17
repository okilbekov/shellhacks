import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const [currDate, setCurrDate] = useState(new Date());
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysOfMonth = [31, getFebDays(currYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDay = new Date(currYear, currMonth, 1).getDay();
    const daysArray = [];

    for (let i = 0; i <= daysOfMonth[currMonth] + firstDay - 1; i++) {
      if (i >= firstDay) {
        daysArray.push(i - firstDay + 1);
      } else {
        daysArray.push(null);
      }
    }

    setDays(daysArray);
  }, [currMonth, currYear]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <span className="month-picker" id="month-picker" onClick={() => {/* Show month list */}}>
          {monthNames[currMonth]}
        </span>
        <div className="year-picker">
          <span className="year-change" id="prev-year" onClick={() => setCurrYear(currYear - 1)}>
            <pre>&lt;</pre>
          </span>
          <span id="year">{currYear}</span>
          <span className="year-change" id="next-year" onClick={() => setCurrYear(currYear + 1)}>
            <pre>&gt;</pre>
          </span>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-week-day">
          {/* Weekday labels */}
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-days">
          {days.map((day, index) => (
            <div key={index} className={`calendar-day ${day === currDate.getDate() && currMonth === currDate.getMonth() && currYear === currDate.getFullYear() ? 'curr-date' : ''}`}>
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="month-list">
        {/* Month list */}
      </div>
    </div>
  );
};

export default Calendar;