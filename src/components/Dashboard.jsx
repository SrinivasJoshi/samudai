import { useState, useEffect } from 'react';

const Dashboard = () => {
	const [events, setEvents] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		//sign in code
		function handleCredentialResponse(response) {
			console.log(response);
			setIsLoggedIn(true);
			localStorage.setItem('JWT', response.credential);
			fetchEvents();
		}
		/* global google */
		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			callback: handleCredentialResponse,
		});
		google.accounts.id.renderButton(
			document.getElementById('buttonDiv'),
			{ theme: 'outline', size: 'large' } // customization attributes
		);
		google.accounts.id.prompt(); // also display the One Tap dialog
	}, []);

	const fetchEmail = async () => {
		//returns calendarId for fetching calendar events
		try {
			const myHeaders = new Headers();
			const jwtToken = localStorage.getItem('JWT');
			myHeaders.append('Authorization', `Bearer ${jwtToken}`);
			const res = await fetch(
				'https://www.googleapis.com/calendar/v3/users/me/calendarList',
				{
					headers: myHeaders,
				}
			);
			const response = await res.json();
			return response.items[0].id;
		} catch (error) {
			console.log(error);
		}
	};
	const fetchEvents = async () => {
		const emailId = await fetchEmail();
		try {
			const myHeaders = new Headers();
			const jwtToken = localStorage.getItem('JWT');
			myHeaders.append('Authorization', `Bearer ${jwtToken}`);
			const res = await fetch(
				`https://www.googleapis.com/calendar/v3/calendars/${emailId}/events`,
				{
					headers: myHeaders,
				}
			);
			const response = await res.json();
			console.log(response);
			if (response.error) {
				alert(`Error : ${response.error.message}`);
				return;
			}
			setEvents(response.items);
			setEvents((events) => events.reverse());
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='dashboard'>
			<h1>Dashboard Page</h1>
			<div className='events'>
				{events.map((event, i) => {
					if (i > 5) {
						return '';
					}
					return (
						<div className='dashboard-event'>
							<li>Event summary : {event.summary}</li>
							<li>Created at : {event.created}</li>
							<li>Status : {event.status} </li>
							<li>Created by : {event.creator.displayName}</li>
							<li>Organised by : {event.organizer.displayName}</li>
						</div>
					);
				})}
			</div>
			{!isLoggedIn && <div id='buttonDiv'></div>}
		</div>
	);
};

export default Dashboard;
