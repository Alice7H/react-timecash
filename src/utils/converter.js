import { format } from "date-fns";

export const timeFormat = "HH:mm:ss";
export const dateTimeBRFormat = "dd/MM/yyyy HH:mm:ss";

function convertToMilliseconds(seconds){
  return seconds * 1000;
}
export function convertMillisecondsToHour(milliseconds){
  return milliseconds/3600000;
}

export function convertToDate(value) {
  return new Date(value);
}

export function convertDotToSemicolon(value){
  return value.toString().replace('.', ',');
}

export function convertSecondsToDateTime(seconds){
  const dateTime = new Date(convertToMilliseconds(seconds));
  return format( dateTime, dateTimeBRFormat);
}