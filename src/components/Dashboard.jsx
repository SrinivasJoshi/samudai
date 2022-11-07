import { useState, useEffect } from 'react';

const Dashboard = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		function handleCredentialResponse(response) {
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

	const fetchEvents = async () => {
		const jwt = localStorage.getItem('JWT');
		try {
			const res = await fetch(
				`https://www.googleapis.com/calendar/v3/calendars/srinivasjoshi60@gmail.com/events?key=${jwt}`
			);
			const response = await res.json();
			console.log(response);
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
				{events.map((event) => {
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
			<div id='signInDiv'></div>
		</div>
	);
};

export default Dashboard;
