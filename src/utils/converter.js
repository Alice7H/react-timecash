import { format } from "date-fns";

export function convertDotToSemicolon(value){
  return value.toString().replace('.', ',');
}

export function convertSecondsToDateTime(seconds){
  return format(new Date(seconds * 1000), "dd/MM/yyyy HH:mm:ss");
}