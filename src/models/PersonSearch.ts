export interface PersonSearchResult {
  page?:          number;
  results?:       PersonResult[];
  total_results?: number;
  total_pages?:   number;
}

export interface PersonResult {
  profile_path?: null | string;
  adult?:        boolean;
  id?:           number;
  known_for?:    KnownFor[];
  name?:         string;
  popularity?:   number;
}

export interface KnownFor {
  adult?:             boolean;
  overview?:          string;
  id?:                number;
  media_type:        MediaType;
  //shows only
  first_air_date?:    Date;
  name?:              string;
  original_name?:     string;
  //movies only
  release_date?:      Date;
  original_title?:    string;
  title?:             string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

