import { useExtracted } from 'next-intl';

import { NavTitleType } from '@/enums';

export default () => {
    const t = useExtracted();
  
    return ( key: NavTitleType) => {
        switch (key) {
            case NavTitleType.SEARCH:
                return t('Search');
                
            case NavTitleType.MOVIES:
                return t('Movies');

            case NavTitleType.TV_SHOWS:
                return t('TV Shows');

            case NavTitleType.PERSONS:
                return t('Persons');
        }
    };
};