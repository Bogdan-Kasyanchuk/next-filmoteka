import Image from 'next/image';

export default function DataNotFound() {
    return (
        <div className="c-data-not-found">
            <Image
                width={ 80 }
                height={ 80 }
                src="/svg/data.svg"
                alt="Data icon"
            />

            <p className="c-data-not-found__title">
                Data not found
            </p>

            <p className="c-data-not-found__text">
                There is no data to show you right now.
            </p>
        </div>
    );
}