from scipy.stats import kendalltau
from datetime import datetime, timedelta

def categorize_deadline(deadline_str):
	# Convert string to datetime object
	if deadline_str == "None":
		return "noDeadline"
	
	task_deadline = datetime.strptime(deadline_str, "%Y/%m/%d %H:%M")
	now = datetime.now()

	# Calculate the difference
	difference = task_deadline - now

	# Categorize the deadline
	if difference <= timedelta(days=1):
		return "dueToday"
	elif difference <= timedelta(days=3):
		return "in3Days"
	elif difference <= timedelta(days=7):
		return "thisWeek"
	else:
		return "thisMonth"

def categorize_duration(duration_minutes):
    if duration_minutes <= 30:
        return "shortTask"
    elif 30 < duration_minutes <= 120:
        return "mediumTask"
    else:
        return "longTask"

def compute_score(task, attributes, weights):
	# Extract the weights
	W_deadline, W_importance, W_duration, W_frequency = weights

	deadline_category = categorize_deadline(task["deadline"])
	duration_category = categorize_duration(task["duration"])
	# Compute score based on the provided attributes and weights
	Deadline_Score = attributes["deadline"][deadline_category] * W_deadline
	Importance_Score = attributes["importanceTag"][task["importance"]] * W_importance
	Duration_Score = attributes["estimatedDuration"][duration_category] * W_duration
	Frequency_Score = attributes["frequency"][task["frequency"]] * W_frequency

	Total_Score = Deadline_Score + Importance_Score + Duration_Score + Frequency_Score

	return Total_Score

def sort_tasks_by_score(tasks, attributes, weights):
	# Compute scores for each task
	scores = [compute_score(task, attributes, weights) for task in tasks]

	# Sort tasks by score
	sorted_tasks = sorted(tasks, key=lambda x: compute_score(x, attributes, weights), reverse=True)

	return sorted_tasks

def calculate_discrepancy(original_order, new_order):
	original_indices = [task["order"] for task in original_order]
	new_indices = [task["order"] for task in new_order]
	
	# Compute Kendall Tau distance
	_, distance = kendalltau(original_indices, new_indices)
	
	return distance
