import { useExtracted } from 'next-intl';

import { TitleKeys } from '../enums';

export default () => {
    const t = useExtracted();
  
    return ( key: TitleKeys) => {
        switch (key) {
            case TitleKeys.SEARCH:
                return t('Search');
                
            case TitleKeys.MOVIES:
                return t('Movies');

            case TitleKeys.TV_SHOWS:
                return t('TV Shows');

            case TitleKeys.PERSONS:
                return t('Persons');
        }
    };
};