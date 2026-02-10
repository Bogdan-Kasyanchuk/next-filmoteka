import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';

export default function ReviewsSkeleton() {

    return (
        <Container className="xxl:max-w-[1440px]">
            <div className="с-reviews">
                <Title
                    order="h3"
                    variant={ 3 }
                    className="с-reviews__title"
                >
                Reviews
                </Title>

                <div className="с-reviews__skeleton">
                    <div className="c-skeleton" />
                </div>
            </div>
        </Container>
    );
}