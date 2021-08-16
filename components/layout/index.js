import styles from './layout.module.css';

const Layout = ({children}) =>{

    return (
        <div className="container">
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

export default Layout