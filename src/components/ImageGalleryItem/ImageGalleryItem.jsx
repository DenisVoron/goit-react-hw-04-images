import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, openModal }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <img className={css.ImageGalleryItemImage} src={image.webformatURL} alt="" onClick={openModal} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
};