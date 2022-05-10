export interface ShowCredits {
  id?:   number;
  cast?: Cast[];
  crew?: Crew[];
}

export interface Cast {
  adult?:                boolean;
  gender?:               number;
  id?:                   number;
  known_for_department?: string;
  name?:                 string;
  original_name?:        string;
  popularity?:           number;
  profile_path?:         string;
  roles?:                Role[];
  total_episode_count?:  number;
  order?:                number;
}

interface Role {
  credit_id?:     string;
  character?:     string;
  episode_count?: number;
}

interface Crew {
  adult?:                boolean;
  gender?:               number;
  id?:                   number;
  known_for_department?: string;
  name?:                 string;
  original_name?:        string;
  popularity?:           number;
  profile_path?:         string;
  department?:           string;
  total_episode_count?:  number;
  jobs?:                 Job[]

}

interface Job {
  credit_id?:     string;
  job?:           string;
  episode_count?: number;
}
