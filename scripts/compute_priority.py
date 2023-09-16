import json
from datetime import datetime

# Initial weights
weights = {
    "attributes": {
        "deadline": {
            "noDeadline": 10,
            "weight": 1
        },
        "estimatedDuration": {
            "shortTask": 1,
            "mediumTask": 2,
            "longTask": 3,
            "weight": 2
        },
        "importanceTag": {
            "High": 3,
            "Medium": 2,
            "Low": 1,
            "weight": 3
        },
        "frequency": {
            "Daily": 4,
            "Weekly": 3,
            "Monthly": 2,
            "One-time": 1,
            "weight": 1
        }
    }
}

def compute_priority(task, weights):
    priority = 0

    # Deadline
    if not task["deadline"]:
        priority += weights["attributes"]["deadline"]["noDeadline"]
    else:
        time_remaining = (datetime.strptime(task["deadline"], '%Y-%m-%d %H:%M:%S') - datetime.now()).total_seconds() / 60
        priority += time_remaining * weights["attributes"]["deadline"]["weight"]
    
    # Duration
    if task["duration"] <= 60:
        priority += weights["attributes"]["estimatedDuration"]["shortTask"] * weights["attributes"]["estimatedDuration"]["weight"]
    elif 60 < task["duration"] <= 180:
        priority += weights["attributes"]["estimatedDuration"]["mediumTask"] * weights["attributes"]["estimatedDuration"]["weight"]
    else:
        priority += weights["attributes"]["estimatedDuration"]["longTask"] * weights["attributes"]["estimatedDuration"]["weight"]

    # Importance
    priority += weights["attributes"]["importanceTag"][task["importance"]] * weights["attributes"]["importanceTag"]["weight"]

    # Frequency
    if task["frequency"]["isOnce"]:
        priority += weights["attributes"]["frequency"]["One-time"] * weights["attributes"]["frequency"]["weight"]
    elif task["frequency"]["recurrence"].get("daily", False):
        priority += weights["attributes"]["frequency"]["Daily"] * weights["attributes"]["frequency"]["weight"]
    elif task["frequency"]["recurrence"].get("weekly", False):
        priority += weights["attributes"]["frequency"]["Weekly"] * weights["attributes"]["frequency"]["weight"]
    elif task["frequency"]["recurrence"].get("monthly", False):
        priority += weights["attributes"]["frequency"]["Monthly"] * weights["attributes"]["frequency"]["weight"]

    return priority


# Reading tasks from tasks.json
with open('tasks.json', 'r') as f:
    tasks = json.load(f)

# Compute priority for each task
for task in tasks:
    task["priority"] = compute_priority(task, weights)

# Saving back the updated tasks with their priorities
with open('tasks_with_priority.json', 'w') as f:
    json.dump(tasks, f, indent=4)
