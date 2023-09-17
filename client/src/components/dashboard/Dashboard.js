import TaskList from "./TaskList";
import Sidebar from "./Sidebar";
import TaskAdd from "./TaskAdd";
import Calendar from "./Calendar";
import TasksGreet from "./TaskGreet";

const tasks = [
    {
        "title": "Finish the project proposal",
        "importance": "High",
        "deadline": "2023-09-18",
        "duration": 120,
        "frequency": {
            "once": true,
            "daily": false,
            "weekly": [],
            "monthly": []
        }
    },
    {
        "title": "Daily stand-up meeting",
        "importance": "Medium",
        "deadline": "2023-09-17",
        "duration": 15,
        "frequency": {
            "once": false,
            "daily": true,
            "weekly": [],
            "monthly": []
        }
    },
    {
        "title": "Check emails",
        "importance": "Medium",
        "deadline": "2023-09-17",
        "duration": 30,
        "frequency": {
            "once": false,
            "daily": true,
            "weekly": [],
            "monthly": []
        }
    },
    {
        "title": "Attend the workshop on Saturday",
        "importance": "Low",
        "deadline": "2023-09-23",
        "duration": 180,
        "frequency": {
            "once": true,
            "daily": false,
            "weekly": [6],
            "monthly": []
        }
    },
    {
        "title": "Pay the monthly office rent",
        "importance": "High",
        "deadline": "2023-09-30",
        "duration": 10,
        "frequency": {
            "once": false,
            "daily": false,
            "weekly": [],
            "monthly": [30]
        }
    },
    {
        "title": "Update the team on project progress every Friday",
        "importance": "Medium",
        "deadline": "2023-09-22",
        "duration": 20,
        "frequency": {
            "once": false,
            "daily": false,
            "weekly": [5],
            "monthly": []
        }
    }
]

const userName = "John Doe";
const dateObj = new Date();
const weekDay = dateObj.toLocaleString('en-US', { weekday: 'long' });
const dateNumber = dateObj.getDate();
const dateMonth = dateObj.toLocaleString('en-US', { month: 'long' });

const Dashboard = () => {
	return (
		<div className="container">
			
        <div>
            <Sidebar/>
        </div>
           <div> 
            <TasksGreet 
            userName={userName} 
            weekDay={weekDay} 
            dateNumber={dateNumber} 
            dateMonth={dateMonth}
            />
			<TaskList tasks={tasks} />
            <TaskAdd/>
            </div>
            <div className="calendar">
            <Calendar/>
            </div>
            

		</div>
  	);
}

export default Dashboard;