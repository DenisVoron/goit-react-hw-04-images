import { Component } from "react";
import { createPortal } from "react-dom";
//import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) {

            this.props.onCloses();
        }
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {

            this.props.onCloses();
        }
    };


    render() {
        return createPortal(
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>
                    <img src={this.props.imageUrl} alt="Foto" />
                </div>
            </div>,
            modalRoot,
        );
    }
};