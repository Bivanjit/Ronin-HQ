export type Signal={token:string;pair:string;signal:string;confidence:number;move:string;risk:string;time:string};
export type Prediction={id:string;asset:string;prob:string;expected:'BULLISH'|'BEARISH';horizon:string;status:'OPEN'|'CORRECT'|'INCORRECT';evidence:string;model:string};
export type MembershipTier={name:string;price:number;cadence:string;accent:string;description:string};
