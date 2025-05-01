import Logo from './components/Logo';
import Navigation from './components/Navigation';

export default function Header() {
    return (
        <header className='c-header'>
            <Logo />
            <Navigation />
        </header>
    );
}
