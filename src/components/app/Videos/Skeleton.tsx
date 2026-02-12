import { PLACEHOLDERS } from '@/datasets/placeholders';

import Wrapper from './Wrapper';

export default function Skeleton() {
    return (
        <Wrapper>
            <div className="с-videos__list">
                {
                    [ 1, 2, 3, 4 ].map(
                        item => (
                            <div
                                key={ item }
                                className="с-videos__skeleton"
                            >
                                <div />

                                <img
                                    src={ PLACEHOLDERS[ '16x9' ] }
                                    alt="Placeholder"
                                    width={ 500 }
                                    height={ 282 }
                                />
                            </div>
                        )
                    )
                }
            </div>
        </Wrapper>
    );
}