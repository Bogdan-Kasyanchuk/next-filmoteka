import Logo from './components/Logo';
import Navigation from './components/Navigation';

export default function Header() {
    return (
        <header className='c-header'>
            <div className='c-header__inner'>
                <Logo />

                <Navigation />
            </div>
        </header>
    );
}
