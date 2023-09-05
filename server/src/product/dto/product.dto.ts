
export class ProductDTO {
  title: string;

  vote_average: number;

  release_date: Date;

  overview: string;

  video: string;

  typeMovie: [string];

  backdrop_path: string;

  poster: string;

  role_movie: number = 1;

  popularity: number;
}