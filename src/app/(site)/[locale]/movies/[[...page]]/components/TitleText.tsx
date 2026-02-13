import { getExtracted } from 'next-intl/server';

import { MovieType } from '@/enums';

type Props = {
    type: MovieType
};

export default async function TitleText(props: Props) {
    const t = await getExtracted();

    switch (props.type) {
        case MovieType.NOW_PLAYING:
            return t('Movies that are currently in theatres');

        case MovieType.POPULAR:
            return t('Popular movies');

        case MovieType.TOP_RATED:
            return t('Movies with a top rating');

        case MovieType.UPCOMING:
            return t('Movies that are being released soon');
    }
}