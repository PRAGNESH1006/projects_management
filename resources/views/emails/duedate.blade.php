<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Due Date Reminder</title>
</head>
<body>
    <p>Dear {{ $task->assignedUser->name }},</p>

    <p>This is a friendly reminder that the due date for your task "<strong>{{ $task->title }}</strong>" has passed.</p>

    <p><strong>Task Details:</strong></p>
    <ul>
        <li><strong>Description:</strong> {{ $task->description }}</li>
        <li><strong>Start Date:</strong> {{ $task->start_date }}</li>
        <li><strong>End Date:</strong> {{ $task->end_date }}</li>
    </ul>

    <p>Please take the necessary actions regarding this task as soon as possible.</p>

    <p>Thank you!</p>
</body>
</html>