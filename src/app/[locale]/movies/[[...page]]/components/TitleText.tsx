import { MovieType } from '@/enums';

type Props = {
    type: MovieType
};

export default function TitleText(props: Props) {
    switch (props.type) {
        case MovieType.NOW_PLAYING:
            return 'Movies that are currently in theatres';

        case MovieType.POPULAR:
            return 'Popular movies';

        case MovieType.TOP_RATED:
            return 'Movies with a top rating';

        case MovieType.UPCOMING:
            return 'Movies that are being released soon';
    }
}