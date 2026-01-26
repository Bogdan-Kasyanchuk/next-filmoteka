'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Popover from '@/components/ui/data-display/Popover';

import { links } from './datasets';

const searchLink = links[ 0 ];

export default function Navigation() {
    const t = useTranslations('Header');

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
                                            ? pathname === searchLink.href
                                            : pathname === searchLink.href || pathname.startsWith(searchLink.href + '/page')
                                    })
                                }
                            >
                                <Image
                                    width={ 24 }
                                    height={ 24 }
                                    src={ searchLink.icon }
                                    alt={ t(searchLink.code) }
                                    className="c-navigation__img"
                                    priority
                                />

                                <span className="c-navigation__text">{ t(searchLink.code) }</span>
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
                                { t(searchLink.code) }
                            </button>
                        </form>
                    </Popover>
                </li>

                {
                    links.slice(1).map(
                        link => (
                            <li key={ link.code }>
                                <Link
                                    href={ link.href }
                                    className={
                                        clsx('c-navigation__link', {
                                            'c-navigation__link--is-active': link.exact
                                                ? pathname === link.href
                                                : pathname === link.href || pathname.startsWith(link.href + '/page'),
                                            'c-navigation__link--is-disabled': pathname === link.href
                                        })
                                    }
                                >
                                    <Image
                                        width={ 24 }
                                        height={ 24 }
                                        src={ link.icon }
                                        alt={ t(link.code) }
                                        className="c-navigation__img"
                                        priority
                                    />
                                    
                                    <span className="c-navigation__text">{ t(link.code) }</span>
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        </nav>
    );
}
