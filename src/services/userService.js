import http from "./httpService";

import config from "./config.json";

export const registerUser = (user) => {
  // return http.post(`${config.toplearnapi}/api/register`, JSON.stringify(user));  // برای سرور انلاین هست 
  return http.post(`${config.localapi}/api/register`, JSON.stringify(user));  // سرور افلاین هست
};

export const loginUser = (user) => {
  // return http.post(`${config.toplearnapi}/api/login`, JSON.stringify(user));   // برای سرور انلاین هست 
  return http.post(`${config.localapi}/api/login`, JSON.stringify(user));   // سرور افلاین هست
};
