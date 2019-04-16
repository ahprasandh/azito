import ProductMap from "../../model/azito/productmap";
import AzitoResponse from '../../utils/azito/AzitoResponse'

export function getProductmap(req,res,next){
  res.status(200).send(new AzitoResponse("productMap",ProductMap.getMap(),req).getResponse());
}