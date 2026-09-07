import {opportunities} from '../data';
export const signalService={async list(){return opportunities},async get(token:string){return opportunities.find(x=>x.token.toLowerCase()===token.toLowerCase())??null}};
