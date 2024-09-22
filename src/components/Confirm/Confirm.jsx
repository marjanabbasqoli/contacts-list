import styles from "./Confirm.module.scss";

function Confirm({ confirmHandler, confirm, isModal, boxTitle }) {
	return (
		confirm && (
			<div className={isModal ? styles.modalSureBox : styles.simple}>
				<div className={` ${styles.sureBox}`}>
					<div>
						<div>{boxTitle}</div>
						<div className={styles.buttonsWrap}>
							<button onClick={() => confirmHandler(true)}>بله</button>
							<button onClick={() => confirmHandler(false)}>خیر</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default Confirm;
