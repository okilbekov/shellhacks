const TasksGreet = ({ userName, weekDay, dateNumber, dateMonth }) => {
    return (
      <div className="tasks-greet">
        <h2 className="title">
          Hey {userName} !
        </h2>
  
     
  
        <div className="date-info">
          <p className="week-day">
            {weekDay}
          </p>
          <p className="date-number">
            {dateNumber}
          </p>
          <p className="date-month">
            {dateMonth}
          </p>
        </div>
      </div>
    );
  }
  
  export default TasksGreet;