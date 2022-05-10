export interface ShowResponse {
  id?:                   number;
  name?:                 string;
  tagline?:              string;
  created_by?:           CreatedBy[];
  first_air_date?:       Date;
  number_of_seasons?:    number;
  number_of_episodes?:   number;
  status?:               string;
  genres?:               Genre[];
  homepage?:             string;
  vote_average?:         number;
  vote_count?:           number;
  overview?:             string;
  seasons?:              Season[];
  poster_path?:          string;

  last_air_date?:        Date;
  popularity?:           number;
  languages?:            string[];
  episode_run_time?:     number[];
  origin_country?:       string[];
  original_language?:    string;
  original_name?:        string;
  backdrop_path?:        string;
  in_production?:        boolean;
}

interface CreatedBy {
  id?:           number;
  credit_id?:    string;
  name?:         string;
  gender?:       number;
  profile_path?: string;
}

interface Genre {
  id?:   number;
  name?: string;
}

export interface Season {
  air_date?:      Date;
  episode_count?: number;
  id?:            number;
  name?:          string;
  overview?:      string;
  poster_path?:   string;
  season_number?: number;
}
