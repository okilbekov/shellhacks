import json
import random
from datetime import datetime, timedelta

# Generate random string for task description
def random_string(length):
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return ''.join(random.choice(letters) for i in range(length))

# Generate random task
def generate_task():
    # Randomly assign a future deadline or no deadline
    has_deadline = random.choice([True, False])
    
    if has_deadline:
        deadline_minutes = random.randint(1, 10080)  # maximum is 7 days (10080 minutes)
        deadline = (datetime.now() + timedelta(minutes=deadline_minutes)).strftime('%Y-%m-%d %H:%M:%S')
    else:
        deadline_minutes = None
        deadline = None
    
    # Random duration in minutes (ensuring it's less than the deadline)
    if deadline_minutes:
        duration = random.randint(10, deadline_minutes - 1)
    else:
        duration = random.randint(10, 240)
    
    # Random importance tag
    importance = random.choice(["High", "Medium", "Low"])

    # Random frequency
    frequency = {}
    freq_type = random.choice(["One-time", "Daily", "Weekly", "Monthly"])
    if freq_type == "One-time":
        frequency["isOnce"] = True
    else:
        frequency["isOnce"] = False
        if freq_type == "Daily":
            frequency["recurrence"] = {"daily": True}
        elif freq_type == "Weekly":
            frequency["recurrence"] = {"weekly": [random.choice(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])]}
        elif freq_type == "Monthly":
            frequency["recurrence"] = {"monthly": True}

    task = {
        "description": random_string(10),
        "deadline": deadline,
        "duration": duration,
        "importance": importance,
        "frequency": frequency
    }

    return task

# Generate list of tasks
tasks = [generate_task() for _ in range(100)]

# Save tasks to tasks.json
with open('tasks.json', 'w') as f:
    json.dump(tasks, f, indent=4)
