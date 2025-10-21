import { NetworkDetailsMapper } from '@/types';

type Props = {
    network: NetworkDetailsMapper
};

export default function NetworkDetailsCard(props: Props) {
    return (
        <div className="c-network-details-card">
            <p className="c-network-details-card__title">
                Details information about network:
            </p>

            <ul className="c-network-details-card__list">
                {
                    props.network.homepage &&
                    <li className="c-network-details-card__item c-network-details-card__item--link">
                        <span>WebSite:</span>
                        <a
                            href={ props.network.homepage }
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            { props.network.homepage }
                        </a>
                    </li>
                }

                {
                    props.network.headquarters &&
                    <li className="c-network-details-card__item">
                        <span>Headquarters:</span>
                        <span>{ props.network.headquarters }</span>
                    </li>
                }
            </ul>
        </div>
    );
}