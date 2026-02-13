'use client';

import { ShowMore } from '@re-dev/react-truncate';
import { useExtracted } from 'next-intl';

import { CompanyDetailsMapper } from '@/types';

type Props = {
    company: CompanyDetailsMapper
};

export default function CompanyDetailsCard(props: Props) {
    const t = useExtracted();
        
    return (
        <div className="c-company-details-card">
            <ul className="c-company-details-card__list">
                {
                    props.company.homepage &&
                    <li className="c-company-details-card__item c-company-details-card__item--link">
                        <span>{ t('WebSite:') }</span>
                        <a
                            href={ props.company.homepage }
                            rel="noopener noreferrer"
                            target="_blank"
                            className="truncate u-link-color"
                        >
                            { props.company.homepage }
                        </a>
                    </li>
                }

                {
                    props.company.headquarters &&
                    <li className="c-company-details-card__item">
                        <span>{ t('Headquarters:') }</span>
                        <span>{ props.company.headquarters }</span>
                    </li>
                }

                {
                    props.company.parent_company &&
                    <li className="c-company-details-card__item">
                        <span>{ t('Parent company:') }</span>
                        <span>{ props.company.parent_company }</span>
                    </li>
                }
            </ul>

            {
                props.company.description &&
                <p className="c-company-details-card__description">
                    <ShowMore lines={ 5 }>
                        { props.company.description }
                    </ShowMore>
                </p>
            }
        </div>
    );
}
