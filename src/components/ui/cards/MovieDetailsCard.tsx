import { MovieDetailsMapper } from '@/types';

type Props = {
    movie: MovieDetailsMapper
}

export default function MovieDetailsCard(props: Props) {
    return (
        <div>MovieDetailsCard</div>
        // <div className={styles['movie-card-details']}>
        //     <div className={styles['movie-card-details-wrapper-img']}>
        //         <img
        //             className={styles['movie-card-details-img']}
        //             src={
        //                 poster_path
        //                     ? `https://image.tmdb.org/t/p/w500${poster_path}`
        //                     : PosterNotAvailable
        //             }
        //             alt={normalizedTitle}
        //         />
        //     </div>
        //     <div className={styles['movie-card-details-description']}>
        //         <h2 className={styles['movie-card-details-title']}>
        //             {normalizedTitle} ({release_date.slice(0, 4)})
        //         </h2>
        //         <ul className={styles['movie-card-details-list']}>
        //             <li className={styles['movie-card-details-item']}>
        //                 Vote count: <span>{vote_count}</span>
        //             </li>
        //             <li className={styles['movie-card-details-item']}>
        //                 Vote average: <span>{vote_average}</span>
        //             </li>
        //             <li className={styles['movie-card-details-item']}>
        //                 Popularity: <span>{popularity.toFixed(1)}</span>
        //             </li>
        //         </ul>
        //         <div className={styles['movie-card-details-overview']}>
        //             <h3 className={styles['movie-card-details-overview-title']}>
        //                 Overview:
        //             </h3>
        //             <p className={styles['movie-card-details-overview-text']}>
        //                 {overview}
        //             </p>
        //         </div>
        //         <div className={styles['movie-card-details-genres']}>
        //             <h3 className={styles['movie-card-details-genres-title']}>Genres:</h3>
        //             <ul className={styles['movie-card-details-genres-list']}>
        //                 {
        //                     genres.map(element => (
        //                         <li
        //                             className={styles['movie-card-details-genres-item']}
        //                             key={element.id}
        //                         >
        //                             {element.name}
        //                         </li>
        //                     ))
        //                 }
        //             </ul>
        //         </div>
        //         <div className={styles['movie-card-details-companies']}>
        //             <h3 className={styles['movie-card-details-companies-title']}>
        //                 Production companies:
        //             </h3>
        //             <ul className={styles['movie-card-details-companies-list']}>
        //                 {
        //                     production_companies.map(element => (
        //                         <li
        //                             className={styles['movie-card-details-companies-item']}
        //                             key={element.id}
        //                         >
        //                             {element.name}
        //                         </li>
        //                     ))
        //                 }
        //             </ul>
        //         </div>
        //         <div className={styles['movie-card-details-countries']}>
        //             <h3 className={styles['movie-card-details-countries-title']}>
        //                 Production countries:
        //             </h3>
        //             <ul className={styles['movie-card-details-countries-list']}>
        //                 {
        //                     production_countries.map(element => (
        //                         <li
        //                             className={styles['movie-card-details-countries-item']}
        //                             key={element.name}
        //                         >
        //                             {element.name}
        //                         </li>
        //                     ))
        //                 }
        //             </ul>
        //         </div>
        //     </div>
        // </div>
    );
};
