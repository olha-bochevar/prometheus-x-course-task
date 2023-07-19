import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer/Footer';
import { Header } from './../components/header/Header';
export function Layout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
