import { PLACEHOLDERS } from '@/datasets/placeholders';

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
                                    src={ PLACEHOLDERS[ '2x3' ] }
                                    alt="Placeholder"
                                    width={ 400 }
                                    height={ 600 }
                                />
                            </div>
                        )
                    )
                }
            </div>
        </Wrapper>
    );
}