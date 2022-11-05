import { FunctionComponent, useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
	const [events, setEvents] = useState([]);
	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		if (isSignedIn) {
			fetchEvents();
		}
	}, [isSignedIn]);

	const fetchEvents = async () => {
		// const response = await fetch(
		// 	`https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
		// );
		// console.log(response);
		// console.log(window.gapi || 'empty');
		(window as any).gapi.client.calendar.calendarList.list({}).then(
			function (response: any) {
				// Handle the results here (response.result has the parsed body).
				console.log('Response', response);
			},
			function (err: any) {
				console.error('Execute error', err);
			}
		);
	};
	return (
		<>
			<h1>Dashboard Page</h1>
			{!isSignedIn && (
				<div className='google-login-div'>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
							setIsSignedIn(true);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
			)}
			<div>{events}</div>
		</>
	);
};

export default Dashboard;
