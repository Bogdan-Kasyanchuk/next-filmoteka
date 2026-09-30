'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useExtracted, useLocale } from 'next-intl';

import Popover from '@/components/ui/data-display/Popover';
import Link from '@/components/ui/navigation/PrefetchLink';
import { getPathname } from '@/services/i18n/navigation';

import { LINKS } from './datasets';
import useTitleLink from './hooks/useTitleLink';

const searchLink = LINKS[ 0 ];

export default function Navigation() {
    const locale = useLocale();

    const t = useExtracted();
        
    const pathname = usePathname();

    const getTitleLink = useTitleLink();

    const isCurrentLink = (href: string ) => pathname === `${ href }` || pathname === `/${ locale }${ href }` || pathname.startsWith(`${ href }/page`) || pathname.startsWith(`/${ locale }${ href }/page`);

    return (
        <nav className="c-navigation">
            <ul className="c-navigation__list">
                <li>
                    <Popover
                        trigger={
                            <button
                                type="button"
                                disabled={ isCurrentLink(searchLink.href) }
                                className={
                                    clsx('c-navigation__link', {
                                        'c-navigation__link--is-active c-navigation__link--is-disabled': isCurrentLink(
                                            searchLink.href
                                        )
                                    })
                                }
                            >
                                <Image
                                    width={ 24 }
                                    height={ 24 }
                                    src={ searchLink.icon }
                                    alt=""
                                    className="c-navigation__img"
                                    preload
                                    loading="eager"
                                    unoptimized
                                />

                                <span
                                    className={
                                        clsx([
                                            'c-navigation__text sr-only',
                                            'lg:not-sr-only'
                                        ])
                                    }
                                >
                                    { getTitleLink(searchLink.key) }
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
                            action={ getPathname({ locale, href: searchLink.href }) }
                            className="c-navigation__search-form"
                        >
                            <input
                                className="c-navigation__search-input"
                                name="query"
                                aria-label={ t('Search') }
                                placeholder={ t('Search movies, tv shows, persons') }
                                autoComplete="off"
                                minLength={ 3 }
                                required
                            />

                            <button
                                type="submit"
                                className="c-navigation__search-button"
                            >
                                { t('Search') }
                            </button>
                        </form>
                    </Popover>
                </li>

                {
                    LINKS.slice(1).map(
                        link => (
                            <li key={ link.key }>
                                <Link
                                    href={ link.href }
                                    aria-current={ isCurrentLink(link.href) ? 'page' : undefined }
                                    className={
                                        clsx('c-navigation__link', {
                                            'c-navigation__link--is-active': isCurrentLink(
                                                link.href
                                            ),
                                            'c-navigation__link--is-disabled': pathname === `/${ locale }${ link.href }`
                                        })
                                    }
                                >
                                    <Image
                                        width={ 24 }
                                        height={ 24 }
                                        src={ link.icon }
                                        alt=""
                                        className="c-navigation__img"
                                        preload
                                        loading="eager"
                                        unoptimized
                                    />
                                    
                                    <span
                                        className={
                                            clsx([
                                                'c-navigation__text sr-only',
                                                'lg:not-sr-only'
                                            ])
                                        }
                                    >
                                        { getTitleLink(link.key) }
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
