import { TimeType } from '@/enums';

type Props = {
    type: TimeType
}

export default function TitleText(props: Props) {
    switch (props.type) {
        case TimeType.DAY:
            return 'Trending today';

        case TimeType.WEEK:
            return 'Trending this week';

        default:
            return null;
    }
}