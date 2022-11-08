import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
		<RouterProvider router={router} />
	</Provider>
);
