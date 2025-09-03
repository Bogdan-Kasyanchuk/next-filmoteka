'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    {
        name: 'Search',
        href: '/search',
        icon: '/svg/search.svg',
    },
    {
        name: 'Home',
        href: '/',
        icon: '/svg/home.svg',
    },
    {
        name: 'Movies',
        href: '/movies',
        icon: '/svg/movie.svg',
    },
    {
        name: 'TV Shows',
        href: '/tv-shows',
        icon: '/svg/tv.svg',
    },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className='c-navigation'>
            <ul className='c-navigation__list'>
                {
                    links.map(
                        (link) => (
                            <li
                                key={link.name}
                                className='c-navigation__item'
                            >
                                <Link
                                    href={link.href}
                                    className={
                                        clsx('c-navigation__link', {
                                            'c-navigation__link--is-active': pathname === link.href,
                                        })
                                    }
                                >
                                    <Image
                                        width={30}
                                        height={30}
                                        src={link.icon}
                                        alt={link.name}
                                        className='c-navigation__img'
                                    />
                                    <span className='c-navigation__text'>{link.name}</span>
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        </nav>
    );
};
