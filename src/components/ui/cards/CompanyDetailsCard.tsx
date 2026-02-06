import { ShowMore } from '@re-dev/react-truncate';

import { CompanyDetailsMapper } from '@/types';

type Props = {
    company: CompanyDetailsMapper
};

export default function CompanyDetailsCard(props: Props) {
    return (
        <div className="c-company-details-card">
            <ul className="c-company-details-card__list">
                {
                    props.company.homepage &&
                    <li className="c-company-details-card__item c-company-details-card__item--link">
                        <span>WebSite:</span>
                        <a
                            href={ props.company.homepage }
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            { props.company.homepage }
                        </a>
                    </li>
                }

                {
                    props.company.headquarters &&
                    <li className="c-company-details-card__item">
                        <span>Headquarters:</span>
                        <span>{ props.company.headquarters }</span>
                    </li>
                }

                {
                    props.company.parent_company &&
                    <li className="c-company-details-card__item">
                        <span>Parent company:</span>
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
