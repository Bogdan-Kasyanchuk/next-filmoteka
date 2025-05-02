// import PropTypes from 'prop-types';
// import { Link, useLocation } from 'react-router-dom';
// import PosterNotAvailable from 'images/poster-not-available.jpg';
// import styles from './MovieCard.module.css';

// const MovieCard = ({ element, url }) => {
//   const location = useLocation();

//   const {
//     poster_path,
//     title,
//     original_title,
//     name,
//     original_name,
//     vote_average,
//   } = element;

//   const normalizedTitle =
//     title || original_title ? title || original_title : name || original_name;

//   return (
//     <li className={styles['movie-card']}>
//       <Link
//         className={styles['movie-card-link']}
//         to={{
//           pathname: `${url}/${element.id}`,
//           state: { from: location },
//         }}
//       >
//         <div className={styles['movie-card-wrapper-img']}>
//           <img
//             className={styles['movie-card-img']}
//             src={
//               poster_path
//                 ? `https://image.tmdb.org/t/p/w500${poster_path}`
//                 : PosterNotAvailable
//             }
//             alt={normalizedTitle}
//           />
//         </div>
//         <div className={styles['movie-card-description']}>
//           <p className={styles['movie-card-description-title']}>
//             {normalizedTitle}
//           </p>
//           <p className={styles['movie-card-description-average']}>
//             {vote_average}
//           </p>
//         </div>
//       </Link>
//     </li>
//   );
// };

// MovieCard.propTypes = {
//   element: PropTypes.shape({
//     poster_path: PropTypes.string,
//     title: PropTypes.string,
//     original_title: PropTypes.string,
//     name: PropTypes.string,
//     original_name: PropTypes.string,
//     vote_average: PropTypes.number,
//   }),
//   url: PropTypes.string.isRequired,
// };

// export default MovieCard;
