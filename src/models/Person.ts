export interface PersonResponse {
  id?:                   number;
  name?:                 string;
  gender?:               number;
  birthday?:             Date;
  place_of_birth?:       string;
  deathday?:             string;
  also_known_as?:        string[];
  known_for_department?: string;
  biography?:            string;
  homepage?:             string;
  popularity?:           number;
  profile_path?:         string;
  adult?:                boolean;
  imdb_id?:              string;
}
