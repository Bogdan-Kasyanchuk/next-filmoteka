import { getExtracted } from 'next-intl/server';

import { TVShowType } from '@/enums';

type Props = {
    type: TVShowType
};

export default async function TitleText(props: Props) {
    const t = await getExtracted();
    
    switch (props.type) {
        case TVShowType.AIRING_TODAY:
            return t('TV Shows airing today');

        case TVShowType.ON_THE_AIR:
            return t('TV Shows that air in the next 7 days');

        case TVShowType.POPULAR:
            return t('Popular TV Shows');

        case TVShowType.TOP_RATED:
            return t('TV Shows with a top rating');
    }
}