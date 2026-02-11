import { PLACEHOLDERS } from '@/datasets/constants';

import Wrapper from './Wrapper';

export default function Skeleton() {
    return (
        <Wrapper>
            <div className="с-reviews__list">
                {
                    [ 1, 2, 3, 4 ].map(
                        item => (
                            <div
                                key={ item }
                                className="с-reviews__skeleton"
                            >
                                <img
                                    src={ PLACEHOLDERS[ '16x9_medium' ] }
                                    alt="Placeholder"
                                    width={ 250 }
                                    height={ 141 }
                                />
                            </div>
                        )
                    )
                }
            </div>
        </Wrapper>
    );
}