import Image from 'next/image';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { CastMapper } from '@/types';

type Props = {
  cast: CastMapper
}

export default function CastCard(props: Props) {

  return (
    <div className={'cast-item'}>
      <div className={'cast-item-wrapper-img'}>
        <Image
          src={
            props.cast.profile_path
              ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.CAST_CARD_COVER}/${props.cast.profile_path}`
              : '/img/photo-not-available.jpg'
          }
          sizes="185px"
          alt={props.cast.name}
          fill
        />
      </div>
      <div className={'cast-item-description'}>
        <p className={'cast-item-description-title'}>
          {props.cast.name}
        </p>
        <p className={'cast-item-description-text'}>
          Character: <span>{props.cast.character}</span>
        </p>
        <p className={'cast-item-description-text'}>
          Popularity: <span>{props.cast.popularity.toFixed(1)}</span>
        </p>
      </div>
    </div>
  );
};
