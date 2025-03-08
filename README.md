## Project Description
Real-Time Code Editor is a collaborative coding environment where multiple users can join a room and write code together in real time. The project leverages WebSockets for real-time communication and React for the frontend, while the backend is built using Express and Socket.IO.

### Key Features:
Real-Time Collaboration: Multiple users can join the same room and see each other's code changes in real-time.
Unique Room IDs: Each collaboration session has a unique room ID that users can share to join the session.
User Notifications: Users are notified when someone joins or leaves the room.
Code Synchronization: Code is synchronized among all connected clients in the room.

### Project Structure:
Frontend: Built with React, it includes components for the editor, client management, and user notifications.
Backend: Built with Node.js and Express, using Socket.IO for WebSocket communication to handle real-time events.

## How It Works:

### Client-Side:
Users can create or join a room by entering a unique room ID.
Once connected, they can start coding in the editor.
Any changes made in the editor are broadcasted to all users in the same room using WebSockets.

### Server-Side:
The server manages WebSocket connections and rooms using Socket.IO.
It handles events such as user joining, user leaving, and code synchronization.
When a user makes a change in the code, the server broadcasts the change to all other users in the room.

## Technologies Used:
React: For building the user interface.
Codemirror: As the code editor component.
Socket.IO: For real-time bi-directional communication.
Express: For setting up the server.
UUID: For generating unique room IDs.

## Images

### Image 1

![Image 1 Description](https://raw.githubusercontent.com/Adarsh1singh/realtime-code-editor/main/assets/img1.png)

### Image 2
![Image 2 Description](https://raw.githubusercontent.com/Adarsh1singh/realtime-code-editor/main/assets/img2.png)

### Image 3
![Image 3 Description](https://raw.githubusercontent.com/Adarsh1singh/realtime-code-editor/main/assets/img3.png)

### Image 4
![Image 4 Description](https://raw.githubusercontent.com/Adarsh1singh/realtime-code-editor/main/assets/img4.png)

### Image 5
![Image 5 Description](https://raw.githubusercontent.com/Adarsh1singh/realtime-code-editor/main/assets/img5.png)


To run this project on docker: 
 docker build -t react/app .  ||
  docker run -p 3000:3000 -p 5000:5000 --name realtime-editor-container react/app

