import axios from "axios";

const apiLink = "http://127.0.0.1:8000/predict";

export const predictCall =  async (latitude, longitude, nitrogen, potassium, phosphorius, ph) => {
     await axios.get('http://history.openweathermap.org/data/2.5/aggregated/year?lat='+latitude+'&lon='+longitude+'&units=metric&appid=1d881679d39500011fae255732d17344')
            .then(response => {
                  const apiResponsee = response.data.result;
                  var temperature = 0;
                  var humidity = 0;
                  var precipitation = 0;
                  for (let i = 0; i < apiResponsee.length; i++) {
                    temperature = temperature + (apiResponsee[i].temp.mean);
                    humidity = (humidity + (apiResponsee[i].humidity.mean));
                    precipitation = precipitation + (apiResponsee[i].precipitation.max);
                  }
                  
                  
                //   console.log(data.temperature);
                //   console.log(data.humidity);
                //   console.log(data.rainfall);
                //   try {
                //     const res =  axios.post(`${apiLink}`, data);
                //     console.log(res.data.prediction);
                   
                //   } catch (err) {
                //     console.log(err);
                    
        
                //   }

                  
                  
             }).catch(error => {
                console.log(error);
               });
               

               

               

  
};