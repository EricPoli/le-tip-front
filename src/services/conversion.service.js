import Http from "../config/Http";

export const getRates = (param) => {
  return Http.get(`${param.baseCurrency}/BRL`);
};
