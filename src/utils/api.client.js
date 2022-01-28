 import axios from "axios";


 export default axios.create({
     baseURL: "https://osf-digital-backend-academy.herokuapp.com/api/",
     headers: {
         "Content-type": "application/json",
     },
 });
 //  axios.defaults.params.secretKey = "$2a$08$tGkDRvMQ4fYNXoY5AukzpeZyA38soerOgiG4phUn5uzqG77Cex2wu";
 //  axios.defaults.get.params.secretKey = "$2a$08$tGkDRvMQ4fYNXoY5AukzpeZyA38soerOgiG4phUn5uzqG77Cex2wu";