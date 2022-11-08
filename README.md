# Samudai Assignment

Technologies used :

1. React + Typescript
2. Redux(redux-toolkit) for state management
3. Etherscan API to fetch relevant data
4. Sign in with ethereum
5. OAuth to get calendar events

Deployed to : [link](https://samudai-assignment.netlify.app/)

## Error I face in src/components/Dashboard.jsx :

Once logged in using OAuth, I receive the required credentials and set it as JWT in localStorage.
I use it as authorization head to get calendarId and calendar events, but results in error. The docs are confusing 😅.
