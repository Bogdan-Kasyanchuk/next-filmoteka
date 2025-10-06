import { TVShowType } from '@/enums';

type Props = {
    type: TVShowType
};

export default function TitleText(props: Props) {
    switch (props.type) {
        case TVShowType.AIRING_TODAY:
            return 'TV Shows airing today';

        case TVShowType.ON_THE_AIR:
            return 'TV Shows that air in the next 7 days';

        case TVShowType.POPULAR:
            return 'Popular TV Shows';

        case TVShowType.TOP_RATED:
            return 'TV Shows with a top rating';
    }
}