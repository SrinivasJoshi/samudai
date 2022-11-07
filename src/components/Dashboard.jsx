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
			const response = await fetch(
				`https://www.googleapis.com/calendar/v3/calendars/srinivasjoshi60@gmail.com/events?key=${jwt}`
			);
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
			<div>{events}</div>
			<div className='events'>
				<div className='dashboard-event'>
					<li>Created by : Srinivas Joshi</li>
					<li>Event summary : Last day of school</li>
					<li>Created at : 2017-03-22T10:55:17.000Z</li>
					<li>status : tentative</li>
				</div>
				<div className='dashboard-event'>
					<li>Event summary : Last day of school</li>
					<li>Created at : 2017-03-22T10:55:17.000Z</li>
					<li>status : tentative</li>
				</div>
				<div className='dashboard-event'>
					<li>Event summary : Last day of school</li>
					<li>Created at : 2017-03-22T10:55:17.000Z</li>
					<li>status : tentative</li>
				</div>
			</div>

			<div id='signInDiv'></div>
		</div>
	);
};

export default Dashboard;
