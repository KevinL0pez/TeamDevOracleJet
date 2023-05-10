define([
  "accUtils",
  "knockout",
  "jquery",
  "ojs/ojarraydataprovider",
  "ojs/ojrouter",
  "ojs/ojformlayout",
  "ojs/ojbutton",
], function (accUtils, ko, $, ArrayDataProvider, Router, ojFormLayout) {
  function HomeViewModel() {
    var self = this;
    const url = "http://localhost:3000";
    const DATOS_DIFUNTO = {
      primerApellido: "",
      segundoApellido: "",
      nombres: "",
      sexo: "",
      fechaNacimiento: "",
      estadoCivil: "",
      ocupacion: "",
      paisResidencia: "",
      departamentoResidencia: "",
      municipioResidencia: "",
      divisionMunicipal: "",
      direccion: "",
      numeroIdentificacion: "",
      nacionalidadFamiliar: "",
      nomapellfamiliar: "",
      estratoEconomico: "",
    };
    self.estadoFormulario = ko.observable(false);
    self.listaGeneros = ko.observableArray([]);
    self.listaPaises = ko.observableArray([]);
    self.listaDepartamentos = ko.observableArray([]);
    self.listaCiudades = ko.observableArray([]);
    self.listaDivisionMunicipal = ko.observableArray([]);
    self.listaEstadoCivil = ko.observableArray([]);
    self.listaEstratoSocial = ko.observableArray([]);
    self.datosTabla = ko.observableArray([]);
    self.proveedorDatosTabla = new oj.ArrayDataProvider(self.datosTabla, {
      keyAttributes: 'dni',
      implicitSort: [{ attribute: "dni", direction: "ascending" }],
    });
    this.messages = [
      {
        severity: 'error',
        summary: 'Error message summary',
        detail: 'Error message detail'
      },
      {
        severity: 'warning',
        summary: 'Warning message summary',
        detail: 'Warning message detail'
      },
      {
        severity: 'confirmation',
        summary: '¡Se ha registrado correctamente la información!'
      },
      {
        severity: 'info',
        summary: 'Info message summary',
        detail: 'Info message detail'
      }];

    self.messagesDataprovider = new oj.ArrayDataProvider(this.messages);

    self.mostrarMensaje = function () {

      // document.getElementById('myButton').addEventListener('click', function() {
        var notificationContainer = document.getElementById('notificationContainer');
        
        // Crea un elemento div para la notificación
        var notification = document.createElement('div');
        notification.classList.add('oj-message', 'oj-message-confirmation');
        
        // Agrega el contenido de la notificación
        notification.innerHTML = '<oj-messages messages="[[messagesDataprovider]]" position="{}" display="notification"></oj-messages>';
        
        // Agrega la notificación al contenedor y muéstrala
        notificationContainer.appendChild(notification);
        setTimeout(function() {
          notification.classList.add('oj-message-shown');
        }, 100);
        
        // Después de 5 segundos, oculta y elimina la notificación
        setTimeout(function() {
          notification.classList.remove('oj-message-shown');
          setTimeout(function() {
            notificationContainer.removeChild(notification);
          }, 300);
        }, 5000);
      // });
    }

    

    const cols = [
      {
        headerText: "Documento",
        field: "dni",
        headerClassName: "oj-sm-only-hide",
        className: "oj-sm-only-hide",
        resizable: "enabled"
      },
      { headerText: "Nombres", field: "nombres", resizable: "enabled" },
      {
        headerText: "Primer Apellido",
        field: "primerApellido",
        headerClassName: "oj-sm-only-hide",
        className: "oj-sm-only-hide",
        resizable: "enabled"
      },
      { headerText: "Segundo Apellido", field: "segundoApellido", resizable: "enabled" },
      { headerText: "Estrato", field: "estrato", resizable: "enabled" },
      { headerText: "Nombres del Familiar", field: "nomapellFamiliar", resizable: "enabled" },
      { headerText: "País de Residencia", field: "paisResidencia", resizable: "enabled" },
      { headerText: "Departamento de Residencia", field: "departamentoResidencia", resizable: "enabled" },
      { headerText: "Municipio de Residencia", field: "municipioResidencia", resizable: "enabled" },
      { headerText: "Dirección", field: "direccion", resizable: "enabled" },
    ];

    self.columnas = ko.observable(cols);

    self.cambiarVistaFormulario = function () {
      self.estadoFormulario(!self.estadoFormulario());
    };

    self.connected = async function () {
      accUtils.announce("Home page loaded.", "assertive");
      document.title = "Home";
      console.log("Cargando...");
      await self.cargarTabla();
      await self.cargarGenero();
      await self.cargarPaises();
      await self.cargarEstadoCivil();
      await self.cargarEstratoSocial();
      console.log("Finalizado.");
    };

    self.disconnected = function () {
      // Implement if needed
    };

    self.transitionCompleted = function () {
      // Implement if needed
    };

    self.cargarTabla = async function () {
      try {
        const respuesta = await fetch(`${url}/consultarInformacionDifunto`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.datosTabla(datos.data);
      } catch (error) {
        console.error(error);
      }
    };
    

    self.cargarGenero = async function() {
      try {
        const respuesta = await fetch(`${url}/genero`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaGeneros(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };

    self.cargarPaises = async function() {
      try {
        const respuesta = await fetch(`${url}/paises`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(respuesta);
        const datos = await respuesta.json();
        console.log(datos);
        // Actualizar propiedad observable
        self.listaPaises(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };

    self.cargarEstadoCivil = async function() {
      try {
        const respuesta = await fetch(`${url}/estadoCivil`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaEstadoCivil(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };
    
    self.cargarEstratoSocial = async function() {
      try {
        const respuesta = await fetch(`${url}/estrato`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaEstratoSocial(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        console.error(error);
      }
    };

    self.cargarDepartamentos = async function (event) {
      console.log(event);
      var valorSeleccionado = event.detail.value;
      DATOS_DIFUNTO['paisResidencia'] = valorSeleccionado;
      try {
        const respuesta = await fetch(`${url}/departamentos?idPais=${valorSeleccionado}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaDepartamentos(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        
      }
    }

    self.cargarCiudades = async function (event) {
      var valorSeleccionado = event.detail.value;
      DATOS_DIFUNTO['departamentoResidencia'] = valorSeleccionado;
      try {
        const respuesta = await fetch(`${url}/ciudades?idDepartamento=${valorSeleccionado}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaCiudades(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        
      }
    }

    self.cargarDivisionMunicipal = async function (event) {
      var valorSeleccionado = event.detail.value;
      DATOS_DIFUNTO['municipioResidencia'] = valorSeleccionado;
      try {
        const respuesta = await fetch(`${url}/divisionMunicipal?idCiudad=${valorSeleccionado}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        // Actualizar propiedad observable
        self.listaDivisionMunicipal(new ArrayDataProvider(datos.data, { keyAttributes: 'value' }));
      } catch (error) {
        
      }
    }

    self.crearDatos = async function () {
      try {
        const respuesta = await fetch(`${url}/registrarInformacion`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(DATOS_DIFUNTO)
        });
        const datos = await respuesta.json();
        if (datos.success) { 
          self.cambiarVistaFormulario()
          self.cargarTabla();
        };
        console.log(datos);
      } catch (error) {
        
      }
    }

    self.setValores = function (event) {
      var valor = event.detail.value;
      var elemento = event.target.id;
      DATOS_DIFUNTO[elemento] = valor;
    }

  }

  return HomeViewModel;
});
