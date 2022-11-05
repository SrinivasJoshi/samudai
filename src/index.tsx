import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: 'dashboard',
		element: <Dashboard />,
	},
	{
		path: 'stats',
		element: <Stats />,
	},
]);

root.render(
	<Provider store={store}>
		<GoogleOAuthProvider
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
			<ChakraProvider>
				<RouterProvider router={router} />
			</ChakraProvider>
		</GoogleOAuthProvider>
	</Provider>
);
