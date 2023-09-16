import json
import random
from datetime import datetime

# Load tasks from tasks.json
with open('../tasks_with_priority.json', 'r') as f:
    tasks = json.load(f)

# Define sorting function. Tasks with no deadline will be given a far future date for sorting purposes.
def sort_by_deadline(task):
    if task['deadline']:
        return datetime.strptime(task['deadline'], '%Y-%m-%d %H:%M:%S')
    else:
        return datetime(9999, 12, 31)  # Distant future date

# Sort tasks based on their deadline
tasks.sort(key=sort_by_deadline)

# Define actions
def view_task(task):
    return {
        "action": "viewed",
        "task_id": task["description"],
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

def complete_task(task):
    return {
        "action": "completed",
        "task_id": task["description"],
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

# Simulate user behavior and log actions
logs = []
completed_tasks = set()

for task in tasks:
    # Skip already completed tasks
    if task["description"] in completed_tasks:
        continue
    
    logs.append(view_task(task))
    
    # The Deadline-Driven Doer has a high chance of completing a task immediately after viewing if it has an impending deadline
    completion_chance = 0.9 if task['deadline'] else 0.5  # 90% chance for tasks with a deadline, 50% otherwise
    if random.random() < completion_chance:
        logs.append(complete_task(task))
        completed_tasks.add(task["description"])

# Save logs to deadline_driven_doer_logs.json
with open('./logs/deadline_driven_doer_logs.json', 'w') as f:
    json.dump(logs, f, indent=4)

print("Deadline-Driven Doer logs generated and saved to deadline_driven_doer_logs.json")
