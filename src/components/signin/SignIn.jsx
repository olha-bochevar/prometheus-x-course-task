import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import avatar from './../../assets/images/avatar-cat.png';
import './SignIn.css';

export function SignIn() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const btnRef = useRef(null);

	useEffect(() => {
		btnRef.current.disabled = true;
	}, []);

	const handleInputUsernameValue = ({ target: { value } }) => {
		setUsername(value.trim());

		if (value.length < 4 || value.length > 16) {
			btnRef.current.disabled = true;
		} else {
			btnRef.current.disabled = false;
			btnRef.current.className = `signin__btn`;
		}
	};

	const handleSubmitUsername = (e, username) => {
		e.preventDefault();
		login(username);
		navigate('/');
	};
	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem('username'));

		if (savedUser) {
			login(savedUser);
			navigate('/');
		} else {
			navigate('/login');
		}
	}, []);
	return (
		<section className="signin">
			<div className="signin__container">
				<div className="signin__auth-form">
					<div className="signin__avatar">
						<img src={avatar} alt="Avatar's picture" />
					</div>
					<form
						className="signin__form form"
						onSubmit={(e) => handleSubmitUsername(e, username)}
					>
						<input
							type="text"
							name="username"
							id="username"
							className="signin__input"
							placeholder="Type your username"
							value={username}
							onChange={handleInputUsernameValue}
							required
						/>

						<button type="submit" ref={btnRef} disabled className="signin__btn">
							Sign In
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
