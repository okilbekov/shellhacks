import AddTagButton from "./AddTagButton";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <p className="sidebar-name">
                Persons name
            </p>
            <div className="sidebar-items">
                <p className="sidebar-items__text">Day</p>
                <p className="sidebar-items__text">Week</p>
                <p className="sidebar-items__text">Month</p>
                <p className="sidebar-items__text">All</p>
            </div>
            <div className="tags">
                <p className="tags-title">
                    Tags
                </p>
                <p className="tags-text">Personal</p>
                <AddTagButton/>
            </div>

        </div>
    );
}

export default Sidebar;