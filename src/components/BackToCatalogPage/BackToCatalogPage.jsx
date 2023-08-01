import { Link } from 'react-router-dom';
import home from './../../assets/images/home.png';
import './BackToCatalogPage.css';

export function BackToCatalogPage() {
	return (
		<Link to="/" className="link-home" title="Go for more books">
			<img src={home} alt="Go home" />
			Go for more books
		</Link>
	);
}
