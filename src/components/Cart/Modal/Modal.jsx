import { useState } from 'react';
import './Modal.css';
import close from './../../../assets/images/close.png';
export function Modal() {
	const [showModal, setShowModal] = useState(true);
	const hideModal = () => setShowModal(false);
	return (
		<>
			{showModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<div className="close-button" onClick={hideModal}>
							<img src={close} alt="Close modal" />
						</div>
						<div className="modal-text">
							<h2>Thank you for your order!</h2>
							<p>Happy reading!</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
