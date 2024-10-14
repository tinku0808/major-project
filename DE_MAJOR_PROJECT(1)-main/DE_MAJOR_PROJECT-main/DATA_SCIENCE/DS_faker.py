import pandas as pd
from faker import Faker
import random

# Initialize Faker
faker = Faker()

# Parameters
num_unique_employees = 240
total_entries = 25000
unique_departments = ['FULL STACK', 'DATA SCIENCE', 'DATA ENGINEERING']

# Generating 240 unique employees with ids and names
unique_employees = []
for i in range(1, num_unique_employees + 1):
    name = faker.name()
    employee = {
        'employeeId': i,
        'name_feedback': name,
        'name_engagement': name,  # Assuming name_feedback and name_engagement are the same
        'department': random.choice(unique_departments)
    }
    unique_employees.append(employee)

# Generate 25,000 rows with random data
reporting_data = []
for _ in range(total_entries):
    employee = random.choice(unique_employees)
    total_feedback_count = random.randint(1, 10)
    average_rating = round(random.uniform(1.0, 5.0), 2)
    total_quizzes_taken = random.randint(1, 10)
    total_score = random.randint(0, 500)
    average_score = round(random.uniform(0, 100), 2)
    total_time_spent = random.randint(30, 500)

    # Normalize each field to 0-1
    normalized_feedback_count = total_feedback_count / 10  # Max = 10
    normalized_average_rating = average_rating / 5.0  # Max = 5
    normalized_quizzes_taken = total_quizzes_taken / 10  # Max = 10
    normalized_total_score = total_score / 500  # Max = 500
    normalized_average_score = average_score / 100  # Max = 100
    normalized_total_time_spent = total_time_spent / 500  # Max = 500

    # Calculate engagement score from 0 to 100
    engagement_score = (
        normalized_feedback_count * 20 +  # Scaled to a max of 20
        normalized_average_rating * 20 +  # Scaled to a max of 20
        normalized_quizzes_taken * 20 +  # Scaled to a max of 20
        normalized_total_score * 20 +  # Scaled to a max of 20
        normalized_average_score * 10 +  # Scaled to a max of 10
        normalized_total_time_spent * 10  # Scaled to a max of 10
    )

    reporting_data.append({
        'employeeId': employee['employeeId'],
        'name_feedback': employee['name_feedback'],
        'total_feedback_count': total_feedback_count,
        'average_rating': average_rating,
        'name_engagement': employee['name_engagement'],
        'department': employee['department'],
        'total_quizzes_taken': total_quizzes_taken,
        'total_score': total_score,
        'average_score': average_score,
        'total_time_spent': total_time_spent,
        'engagement_score': engagement_score,  # Final engagement score on a scale of 0-100
    })

# Convert to DataFrame
df = pd.DataFrame(reporting_data)

# Save to CSV
df.to_csv('DS_reporting_table.csv', index=False)

print("Data generation complete.")
