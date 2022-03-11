import axios from 'axios';
import {postPhoneUrl, verifyOtpUrl} from './urls';

export const postPhone = (phone: string) => {
  const url = postPhoneUrl();
  return axios.post(url, {phone});
};

export const verifyOtp = (phone: string, otp: string) => {
  const url = verifyOtpUrl();
  return axios.post(url, {phone, otp});
};
