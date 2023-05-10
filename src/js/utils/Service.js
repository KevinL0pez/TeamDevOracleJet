define(["text!../../json/config.json"], function (configFile) {
  const config = JSON.parse(configFile);
  //console.log(config);
 
  class ServiceUtils {
    constructor() {}

    construirEndpointUrl(endpoindProperty) {
      //const url = `${config.isSecure ? 'https': 'http'}://${config.host}:${config.port}/${config.endpoinds.endpoindProperty}`;
      const url = `${config.isSecure ? "https" : "http"}://${config.host}:${
        config.port
      }/${config.endpoints[endpoindProperty]}`;
      console.log(url);
      return url;
    }

    async obtenerData(endpoindProperty, method, bodyData) {
      let fetchOptionsObject = null;
      if (method === "POST") {
        fetchOptionsObject = {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
        
      }

      const api_url = this.construirEndpointUrl(endpoindProperty);
      let dataService;
      try {
        const response = await fetch(api_url, fetchOptionsObject);
        if (!response.ok) throw Error('Algo salio mal');
        dataService = await response.json();
      } catch (error) {
        //console.log(error);
        throw Error('Algo salio mal')
      }
      return dataService
    }
  }

  return new ServiceUtils();
});
