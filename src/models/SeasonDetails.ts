export interface SeasonDetails {
  _id?:           string;
  air_date?:      Date;
  episodes?:      Episode[];
  name?:          string;
  overview?:      string;
  id?:            number;
  poster_path?:   string | null;
  season_number?: number;
}

interface Episode {
  air_date?:        Date;
  episode_number?:  number;
  id?:              number;
  name?:            string;
  overview?:        string;
  production_code?: string;
  season_number?:   number;
  still_path?:      string;
  vote_average?:    number;
  vote_count?:      number;
}
