'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Popover from '@/components/ui/data-display/Popover';
import {
    pagesHomeUrl,
    pagesMovieshUrl,
    pagesPersonsUrl,
    pagesSearchUrl,
    pagesTVUrl
} from '@/routes';

const links = [
    {
        name: 'Home',
        href: pagesHomeUrl(),
        icon: '/svg/home.svg',
    },
    {
        name: 'Movies',
        href: pagesMovieshUrl(),
        icon: '/svg/movie.svg',
    },
    {
        name: 'TV',
        href: pagesTVUrl(),
        icon: '/svg/tv.svg',
    },
    {
        name: 'Persons',
        href: pagesPersonsUrl(),
        icon: '/svg/users.svg',
    },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className='c-navigation'>
            <ul className='c-navigation__list'>
                {
                    pathname !== pagesSearchUrl() &&
                    <li>
                        <Popover
                            trigger={
                                <button
                                    type='button'
                                    className='c-navigation__search'
                                >
                                    <Image
                                        width={24}
                                        height={24}
                                        src='/svg/search.svg'
                                        alt='Search'
                                        className='c-navigation__img'
                                    />
                                    <span className='c-navigation__text'>Search</span>
                                </button>
                            }
                            content={
                                <form
                                    action={pagesSearchUrl()}
                                    className="c-navigation__search-form"
                                >
                                    <input
                                        className="c-navigation__search-input"
                                        name="query"
                                        placeholder="Search movies, tv shows, persons"
                                        autoComplete='off'
                                        minLength={3}
                                        required
                                    />

                                    <button
                                        type='submit'
                                        className="c-navigation__search-button"
                                    >
                                        Пошук
                                    </button>
                                </form>
                            }
                            classNames={
                                {
                                    content: 'c-navigation__search-content',
                                }
                            }
                        />
                    </li>
                }

                {
                    links.map(
                        (link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={
                                        clsx('c-navigation__link', {
                                            'c-navigation__link--is-active': pathname === link.href,
                                        })
                                    }
                                >
                                    <Image
                                        width={24}
                                        height={24}
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
