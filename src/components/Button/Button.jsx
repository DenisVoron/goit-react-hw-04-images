import PropTypes from 'prop-types';

import css from './Button.module.css';

export const ButtonMore = ({ onClick }) => {
    return (
        <button className={css.Button} type="button" onClick={onClick}>
            Load more
        </button>
    )
};

ButtonMore.propTypes = {
    onClick: PropTypes.func.isRequired,
};