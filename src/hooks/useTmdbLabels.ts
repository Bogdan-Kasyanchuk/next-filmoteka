import { useExtracted } from 'next-intl';

// TMDB returns these values in English regardless of `language`; unknown ones are shown as is
export default function useTmdbLabels() {
    const t = useExtracted();

    const department = (value: string) => {
        switch (value) {
            case 'Acting':
                return t('Acting');
            case 'Art':
                return t('Art');
            case 'Camera':
                return t('Camera');
            case 'Costume & Make-Up':
                return t('Costume & Make-Up');
            case 'Creator':
                return t('Creator');
            case 'Crew':
                return t('Crew');
            case 'Directing':
                return t('Directing');
            case 'Editing':
                return t('Editing');
            case 'Lighting':
                return t('Lighting');
            case 'Production':
                return t('Production');
            case 'Sound':
                return t('Sound');
            case 'Visual Effects':
                return t('Visual Effects');
            case 'Writing':
                return t('Writing');
            default:
                return value;
        }
    };

    const tvShowType = (value: string) => {
        switch (value) {
            case 'Documentary':
                return t('Documentary');
            case 'Miniseries':
                return t('Miniseries');
            case 'News':
                return t('News');
            case 'Reality':
                return t('Reality');
            case 'Scripted':
                return t('Scripted');
            case 'Talk Show':
                return t('Talk Show');
            case 'Video':
                return t('Video');
            default:
                return value;
        }
    };

    const episodeType = (value: string) => {
        switch (value) {
            case 'standard':
                return t('Standard');
            case 'finale':
                return t('Finale');
            case 'mid_season':
                return t('Mid-season');
            default:
                return value;
        }
    };

    const videoType = (value: string) => {
        switch (value) {
            case 'Behind the Scenes':
                return t('Behind the Scenes');
            case 'Clip':
                return t('Clip');
            case 'Featurette':
                return t('Featurette');
            case 'Teaser':
                return t('Teaser');
            case 'Trailer':
                return t('Trailer');
            default:
                return value;
        }
    };

    return { department, tvShowType, episodeType, videoType };
}
