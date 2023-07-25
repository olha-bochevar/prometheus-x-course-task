import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer/Footer';

export function Layout() {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
