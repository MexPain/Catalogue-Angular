export interface MovieResponse {
  adult?:                 boolean;
  backdrop_path?:         string;
  budget?:                number;
  genres?:                Genre[];
  homepage?:              string;
  id?:                    number;
  original_language?:     string;
  original_title?:        string;
  overview?:              string;
  popularity?:            number;
  poster_path?:           string;
  release_date?:          Date;
  revenue?:               number;
  runtime?:               number;
  tagline?:               string;
  title?:                 string;
  vote_average?:          number;
  vote_count?:            number;
}

interface Genre {
  id?:   number;
  name?: string;
}
