import { FaUserPlus, FaUserMinus } from "react-icons/fa6";

import styles from "./Header.module.scss";
import Search from "../Search/Search";
import { useState } from "react";

import ContactForm from "../ContactForm/ContactForm";

function Header({ setAdd }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className={styles.bg}>
				<div className="container">
					<div className={styles.flexBox}>
						<h1>لیست مخاطبین</h1>

						<div className={styles.leftBox}>
							<Search />

							<div className={styles.buttonsWrap}>
								{
									<button onClick={() => setShowModal(true)}>
										<FaUserPlus />
									</button>

									/*<button onClick={deleteMultiHandler}>
									<FaUserMinus />
								</button> */
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<ContactForm
					showModal={showModal}
					setShowModal={setShowModal}
					type="add"
					id={null}
				/>
			)}
		</>
	);
}

export default Header;
