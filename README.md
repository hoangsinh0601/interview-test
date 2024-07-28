Problem 6
Scoreboard API Module

# Overview

This module is responsible for managing and updating the scoreboard of a website. The scoreboard displays the top 10 user scores and updates in real-time as users complete certain actions. The API ensures secure score updates and prevents unauthorized score manipulation.

## Features

- Scoreboard Retrieval: Fetches the top 10 user scores.
- Score Update: Updates user scores upon the completion of an action.
- Real-Time Updates: Pushes live updates to the scoreboard.
- Security: Prevents unauthorized score increases.

## API Endpoints

1. Get Top 10 Scores

- Endpoint: /api/scores/top10
- Method: GET
- Description: Retrieves the top 10 user scores.
- Response:
  - 200 OK: Returns a JSON array of the top 10 scores.
  - Example:
  ```json
  [
    {"userId": 1, "score": 1500},
    {"userId": 2, "score": 1400},
    ...
  ]
  ```

2. Update Score

- Endpoint: /api/scores/update
- Method: POST
- Description: Updates the user's score upon action completion.
- Request Body:
  - Example:
  ```json
  {
    "userId": 1,
    "scoreIncrement": 50,
    "actionToken": "abc123"
  }
  ```
- Response:
  - 200 OK: Score updated successfully.
  - 400 Bad Request: Invalid request data.
  - 401 Unauthorized: Invalid or missing actionToken.

## WebSocket

- Endpoint: /ws/scores
- Description: Real-time updates for the scoreboard.
- Usage: Clients connect to this WebSocket to receive live updates.

## Security

- Action Token Validation: Each score update request must include a valid actionToken. The server validates this token to ensure the request is legitimate.
- Rate Limiting: Implement rate limiting on score update endpoints to prevent abuse.
- Input Validation: Ensure all inputs are properly sanitized and validated.

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

## Testing

- Run the tests:

  ```bash
  npm test
  ```

## Improvements

- Implement caching for the top 10 scores to reduce database load.
- Enhance security by implementing JWT authentication for API requests.
- Add more detailed logging and monitoring for better observability.
- Optimize WebSocket performance for large-scale real-time updates.

## Contributing

Please submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
Execution Flow Diagram

```
+------------------+
|     Client       |
+--------+---------+
     |
     v
+--------+---------+
| Load Balancer   |
+--------+---------+
     |
     v
+--------+---------+
| Application     |
| Server          |
+--------+---------+
     |
     v
+--------------------+--------------------+
|                    |                    |
v                    v
+--------+---------+ +----------+----------+
| Score Update API | | Score Retrieval API |
| - Validate Token | | - Fetch Top 10     |
| - Update Score   | | Scores             |
+--------+---------+ +----------+----------+
     |                    |
     v                    v
+---+-------------+ +-----+-----------+
| Real-Time Score | | Database        |
| Updates         | | - User Scores   |
| (WebSocket)     |                    |
+------------------+ +-----------------+
```

This diagram illustrates the execution flow for both retrieving the top 10 scores and updating a user's score. The load balancer distributes the requests to the application server, which then processes the requests accordingly. Score updates are validated and processed, and live updates are pushed to connected clients via WebSocket.
