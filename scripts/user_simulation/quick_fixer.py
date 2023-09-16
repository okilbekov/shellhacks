import json
import random
from datetime import datetime

# Load tasks from tasks.json
with open('../tasks_with_priority.json', 'r') as f:
    tasks = json.load(f)

# Define sorting function based on task duration
def sort_by_duration(task):
    return task['duration']

# Sort tasks based on their duration
tasks.sort(key=sort_by_duration)

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
    
    # The Quick-Fixer has a high chance of completing shorter tasks immediately after viewing
    if task['duration'] <= 15:  # Very short task
        completion_chance = 0.9
    elif task['duration'] <= 30:  # Short task
        completion_chance = 0.8
    else:
        completion_chance = 0.5  # Medium or long task
    
    if random.random() < completion_chance:
        logs.append(complete_task(task))
        completed_tasks.add(task["description"])

# Save logs to quick_fixer_logs.json
with open('./logs/quick_fixer_logs.json', 'w') as f:
    json.dump(logs, f, indent=4)

print("Quick-Fixer logs generated and saved to quick_fixer_logs.json")
