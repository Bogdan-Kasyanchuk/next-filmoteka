import Content from './_components/Content';
import './_styles/index.css';

export default async function Page() {

    return (
        <div className='p-movie-similar'>
            Movie similar
            <Content />
        </div>
    );
}