import css from './SectionApp.module.css';

export const SectionApp = ({ children }) => {
    return (
        <div className={css.App}>
            {children}
        </div>
    )
};
