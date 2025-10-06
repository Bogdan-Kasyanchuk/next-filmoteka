import { SocialLinksMapper } from '@/types';

import Icon from './Icon';

type Props = {
    socials: SocialLinksMapper
};

export default function SocialLinks(props: Props) {
    return (
        <ul className="c-socials">
            {
                props.socials.map(
                    social => (
                        <li key={ social.provider }>
                            <a
                                href={ social.link }
                                aria-label={ social.provider }
                                target="_blank"
                                rel="nofollow noindex noreferrer"
                                className="c-socials__link"
                            >
                                <Icon
                                    type="color"
                                    name={ social.provider }
                                />
                            </a>
                        </li>
                    )
                )
            }
        </ul>
    );
}
