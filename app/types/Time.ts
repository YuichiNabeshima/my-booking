export type Hour = 
  | '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09'
  | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19'
  | '20' | '21' | '22' | '23';

export type Minute = '00' | '15' | '30' | '45';

export type Time = `${Hour}:${Minute}`;
