export interface PersonCredits {
  id?:   number;
  cast?: Cast[];
  crew?: Crew[];
}

export interface Cast {
  media_type?:        MediaType;
  character?:         string;

  credit_id?:         string;
  id?:                number;
  genre_ids?:         number[];
  poster_path?:       string;
  vote_count?:        number;
  vote_average?:      number;
  popularity?:        number;
  original_language?: string;
  backdrop_path?:     string;
  overview?:          string;
  //movie only
  release_date?:      string;
  video?:             boolean;
  adult?:             boolean;
  title?:             string;
  original_title?:    string;
  //show only
  original_name?:     string;
  name?:              string;
  episode_count?:     number;
  first_air_date?:    Date;
  origin_country?:    string[];
}

export interface Crew {
  media_type?:        MediaType;
  job?:               string;
  department?:        string;

  credit_id?:         string;
  id?:                number;
  genre_ids?:         number[];
  poster_path?:       string;
  vote_count?:        number;
  vote_average?:      number;
  popularity?:        number;
  original_language?: string;
  backdrop_path?:     string;
  overview?:          string;
  //movie only
  video?:             boolean;
  title?:             string;
  release_date?:      Date;
  adult?:             boolean;
  original_title?:    string;
  //show only
  episode_count?:     number;
  origin_country?:    string[];
  original_name?:     string;
  name?:              string;
  first_air_date?:    string;



}

enum MediaType {
  Movie = "movie",
  Tv = "tv",
}
