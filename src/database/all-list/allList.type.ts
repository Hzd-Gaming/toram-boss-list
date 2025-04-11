export type SubBranchedNumberStat = {
  initial?: number | string;
  break?: number | string;
  flinch?: number | string;
  tumble?: number | string;
  stun?: number | string;
} & {
  [key: string]: number | string | undefined;
};
export type BranchedStatValue =
  | number
  | string
  | undefined
  | SubBranchedNumberStat;
export type BranchedStat = {
  initial?: BranchedStatValue;
  ph1?: BranchedStatValue;
  ph2?: BranchedStatValue;
  ph3?: BranchedStatValue;
  flinch?: BranchedStatValue;
  tumble?: BranchedStatValue;
  stun?: BranchedStatValue;
  lhp?: BranchedStatValue;
  purple?: BranchedStatValue;
  red?: BranchedStatValue;
  green?: BranchedStatValue;
  blue?: BranchedStatValue;
  yellow?: BranchedStatValue;
  white?: BranchedStatValue;
} & {
  [key: string]: BranchedStatValue;
};

export type StatValue = number | string | undefined | BranchedStat;
export interface Stat {
  hp?: StatValue;
  lv?: number | undefined;
  exp?: StatValue;
  def?: StatValue;
  mdef?: StatValue;
  flee?: StatValue;
  evade?: StatValue;
  guard?: StatValue;
  pres?: StatValue;
  mres?: StatValue;
  cres?: StatValue;
  npror?: StatValue;
  mpror?: StatValue;
  ppror?: StatValue;
}
export type Stats = {
  ez?: Stat;
  normal?: Stat;
  hard?: Stat;
  nm?: Stat;
  ulti?: Stat;
} & {
  [key: string]: Stat;
};

export interface MainStat {
  category: string;
  name: string;
  loc: string | undefined;
  ele: StatValue;
}

export interface LinkedMons extends MainStat {
  stats?: Stats;
}

export interface Boss extends MainStat {
  stats?: Stats;
  linkedMons?: LinkedMons;
}

export interface Miniboss extends Stat, MainStat {}

export interface AllList {
  boss: Boss[];
  miniboss: Miniboss[];
  all?: Boss[] & Miniboss[];
}
