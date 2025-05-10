import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MovieType } from '@/enums';
import { getMovies } from '@/services/api';

import Content from './_components/Content';
import Filters from './_components/Filters/Filters';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{
        type?: MovieType;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || MovieType.NOW_PLAYING;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['movies', type, currentPage],
        queryFn: () => getMovies(type, currentPage),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <Container className='p-movies'>
            <Filters type={type} />

            <Title
                center
                bold
                uppercase
            >
                {
                    type === MovieType.NOW_PLAYING
                        ? 'Movies that are currently in theatres'
                        : type === MovieType.POPULAR
                            ? 'Popular movies'
                            : type === MovieType.TOP_RATED
                                ? 'Movies with a top rating'
                                : 'Movies that are being released soon'
                }
            </Title>

            <HydrationBoundary state={dehydratedState}>
                <Content
                    type={type}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}