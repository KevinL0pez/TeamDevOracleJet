/**
 * Abstrabcion de los servicios
 */
define(["utils/Service"], function (ServiceUtils) {
  class AppServices {
    /**
     * Constructor
     *
     */
    constructor() {}

    async guardarPersona(person) {
      console.log(person);

      const data = await ServiceUtils.fetchData("getPersons", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(person),
      });
      console.log(data);

      /*return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const random = Math.random() < 0.5;
            const response = {
                success: random,
            };
            if (random) {
                resolve(response)
            }else {
                response.message = 'Algo ha salido'
                reject(response)
            }
        }, 2000);
      });*/
    }

    async guardarPersonaDos(person) {
      console.log(person);
      return await ServiceUtils.obtenerData('postPersons', 'POST', person);
    }
  }

  return new AppServices();
});
