import TaskList from "./TaskList";
import TaskAdd from "./TaskAdd";
import Calendar from "./Calendar";
import TasksGreet from "./TaskGreet";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBars } from 'react-icons/fa'; // Example icons
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

// const userName = "John Doe";
const dateObj = new Date();
const weekDay = dateObj.toLocaleString('en-US', { weekday: 'long' });
const dateNumber = dateObj.getDate();
const dateMonth = dateObj.toLocaleString('en-US', { month: 'long' });

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();

    return (
        <div className="container">

            <Sidebar
                collapsed={sidebarOpen}
                className="sidebar"
            >
                <div onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <FaBars />
                </div>
                <Menu iconShape="square">
                    <MenuItem>Dashboard</MenuItem>
                    <SubMenu title="Tasks">
                        <MenuItem>Day</MenuItem>
                        <MenuItem>Week</MenuItem>
                        <MenuItem>Month</MenuItem>
                        <MenuItem>All</MenuItem>
                    </SubMenu>
                    <SubMenu title="Tags">
                        <MenuItem>Personal</MenuItem>
                        <MenuItem>Work</MenuItem>
                        <MenuItem>Family</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>

            <div>
                <TasksGreet
                    userName={user.username}
                    weekDay={weekDay}
                    dateNumber={dateNumber}
                    dateMonth={dateMonth}
                />
                <TaskList/>
                <TaskAdd />
            </div>
            <div className="calendar">
                <Calendar />
            </div>


        </div>
    );
}

export default Dashboard;