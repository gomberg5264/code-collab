import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "./environment";



const pusherMessage = (payloadObj) => {
  const body = payloadObj;
  const url = BASE_URL + API_ENDPOINTS.pusherMessage;
   return axios.post(url,body)
   .then(response => {
     return response.data
   })
}


export default {
  pusherMessage
}
