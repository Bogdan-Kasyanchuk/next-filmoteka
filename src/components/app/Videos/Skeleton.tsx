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
                                className="c-skeleton"
                            >
                                <div />
                                <div />
                            </div>
                        )
                    )
                }
            </div>
        </Wrapper>
    );
}