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

	const handleInputUsernameValue = (event) => {
		setUsername(event.target.value);

		if (event.target.value.length < 4 || event.target.value.length > 16) {
			btnRef.current.disabled = true;
		} else {
			btnRef.current.disabled = false;
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
			<div className="auth">
				<div className="auth_avatar ">
					<img src={avatar} alt="Avatar's picture" />
				</div>
				<form onSubmit={(e) => handleSubmitUsername(e, username)}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Type your username"
						value={username}
						onChange={handleInputUsernameValue}
					/>
					<button type="submit" ref={btnRef} disabled>
						Sign In
					</button>
				</form>
			</div>
			<div className="qoute">
				<figure>
					<blockquote cite="https://www.huxley.net/bnw/four.html">
						<p>
							Words can be like X-rays, if you use them properly—they’ll go
							through anything. You read and you’re pierced.
						</p>
					</blockquote>
					<figcaption>
						—Aldous Huxley, <cite>Brave New World</cite>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
