import {predictions} from '../data';
export const predictionService={async list(){return predictions},async get(id:string){return predictions.find(x=>x.id===id)??null}};
