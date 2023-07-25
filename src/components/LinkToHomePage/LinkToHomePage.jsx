import { Link } from 'react-router-dom';

export function LinkToHomePage({ value }) {
	return <Link to="/">{`${value}`}</Link>;
}
