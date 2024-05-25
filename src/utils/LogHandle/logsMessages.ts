import { getCurrentDate } from "@/utils/dateManager";

export const showLogError = (message: string) => {
  const fullMessage = `${getCurrentDate()} Error: ${message}`;
  console.error(fullMessage);
  return;
};

export const showLog = (message: string) => {
  console.log(`${getCurrentDate()} Success: ${message}`);
  return;
};
