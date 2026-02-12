'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import Popover from '@/components/ui/data-display/Popover';
import { Link } from '@/services/i18n/navigation';

import { links } from './datasets';

const searchLink = links[ 0 ];

export default function Navigation() {
    const locale = useLocale();
        
    const pathname = usePathname();

    return (
        <nav className="c-navigation">
            <ul className="c-navigation__list">
                <li>
                    <Popover
                        trigger={
                            <button
                                type="button"
                                className={
                                    clsx('c-navigation__link', {
                                        'c-navigation__link--is-active c-navigation__link--is-disabled': searchLink.exact
                                            ? pathname === '/' + locale + searchLink.href
                                            : pathname === '/' + locale + searchLink.href || pathname.startsWith('/' + locale + searchLink.href + '/page')
                                    })
                                }
                            >
                                <Image
                                    width={ 24 }
                                    height={ 24 }
                                    src={ searchLink.icon }
                                    alt="Search icon"
                                    className="c-navigation__img"
                                    preload
                                    loading="eager"
                                    unoptimized
                                />

                                <span className="c-navigation__text sr-only lg:not-sr-only">
                                    { searchLink.name }
                                </span>
                            </button>
                        }
                        classNames={
                            {
                                content: 'c-navigation__search'
                            }
                        }
                    >
                        <form
                            action={ searchLink.href }
                            className="c-navigation__search-form"
                        >
                            <input
                                className="c-navigation__search-input"
                                name="query"
                                placeholder="Search movies, tv shows, persons"
                                autoComplete="off"
                                minLength={ 3 }
                                required
                            />

                            <button
                                type="submit"
                                className="c-navigation__search-button"
                            >
                                Search
                            </button>
                        </form>
                    </Popover>
                </li>

                {
                    links.slice(1).map(
                        link => (
                            <li key={ link.name }>
                                <Link
                                    href={ link.href }
                                    className={
                                        clsx('c-navigation__link', {
                                            'c-navigation__link--is-active': link.exact
                                                ? pathname === '/' + locale + link.href
                                                : pathname === '/' + locale + link.href || pathname.startsWith('/' + locale + link.href + '/page'),
                                            'c-navigation__link--is-disabled': pathname === link.href
                                        })
                                    }
                                >
                                    <Image
                                        width={ 24 }
                                        height={ 24 }
                                        src={ link.icon }
                                        alt={ `${ link.name } icon` }
                                        className="c-navigation__img"
                                        preload
                                        loading="eager"
                                        unoptimized
                                    />
                                    
                                    <span className="c-navigation__text sr-only lg:not-sr-only">
                                        { link.name }
                                    </span>
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        </nav>
    );
}
