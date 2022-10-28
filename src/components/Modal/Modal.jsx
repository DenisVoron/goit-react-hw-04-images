import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onCloses, imageUrl}) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onCloses();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    
    },[onCloses]);


    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onCloses();
        }
    };

    return createPortal(
            <div className={css.Overlay} onClick={handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={imageUrl} alt="Foto" />
                </div>
            </div>,
            modalRoot,
        );
}

Modal.propTypes = {
    onCloses: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired
}