import { PLACEHOLDERS } from '@/datasets/constants';

import Wrapper from './Wrapper';

export default function Skeleton() {
    return (
        <Wrapper>
            <div className="с-recommendations__list">
                {
                    [ 1, 2, 3, 4, 5, 6, 7 ].map(
                        item => (
                            <div
                                key={ item }
                                className="с-recommendations__skeleton"
                            >
                                <div />
                                
                                <img
                                    src={ PLACEHOLDERS[ '2x3_large' ] }
                                    alt="Placeholder"
                                    width={ 360 }
                                    height={ 540 }
                                />
                            </div>
                        )
                    )
                }
            </div>
        </Wrapper>
    );
}