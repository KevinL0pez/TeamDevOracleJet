/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define([
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojconverter-datetime",
  "ojs/ojtranslation",
  "knockout",
  "utils/Service",
  "utils/Core",
  "services/AppServices",
  "ojs/ojasyncvalidator-length",
  "ojs/ojarraydataprovider",
  "ojs/ojselectsingle",
  "ojs/ojknockout",
  "ojs/ojmessages",
  "ojs/ojinputtext",
  "ojs/ojinputnumber",
  "ojs/ojbutton",
  "ojs/ojformlayout",
  "ojs/ojradioset",
  "ojs/ojselectcombobox",
  "ojs/ojdatetimepicker",
  "ojs/ojvalidationgroup",
], function (
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  ojconverter_datetime_1,
  Translations,
  ko,
  ServiceUtils,
  CoreUtils,
  AppServices,
  AsyncLengthValidator,
  ArrayDataProvider
) {
  const _t = Translations.getTranslatedString;

  function ControllerViewModel() {
    // Media queries for repsonsive layouts
    var smQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

    // Header
    // Application Name used in Branding Area
    this.appName = ko.observable("Auto-capacitación Oracle");
    // User Info used in Global Navigation area
    this.userLogin = ko.observable("©dugarzon@heinsohn.com.co");

    //Content-form
    this._initAllids();
    this._initAllLabels();
    this._initAllObservables();
    this._initAllValidators();
    this._initAllEventListeners();
    this._initAllVariables();
    this.onRegisterButton = this._onRegisterButton.bind(this);

    async function getData() {
      const dataService = await ServiceUtils.obtenerData("getEstadoCivil");
      console.log(dataService);

      return dataService;
    }
    getData();
  }

  ControllerViewModel.prototype._initAllids = function () {
    this.formValidationGroupId = CoreUtils.generarUnicoId();
    //console.log(CoreUtils.generarUnicoId());
    //console.log(CoreUtils.generarUnicoId());
    //console.log(CoreUtils.generarUnicoId());
  };

  ControllerViewModel.prototype._initAllLabels = function () {
    this.inputDepartamentoLabel = _t("inputs.Departamento");
    this.createButtonLabel = ko.observable("Guardar");
  };

  ControllerViewModel.prototype._initAllObservables = async function () {
    this.inputDepartamentoValue = ko.observable();
    this.inputMunicipioValue = ko.observable("");
    this.inputInscripcionValue = ko.observable();
    this.inputActaValue = ko.observable();
    this.inputPapellidoValue = ko.observable();
    this.inputSapellidoValue = ko.observable();
    this.inputInscripcionValue = ko.observable();
    this.inputchaNacimientoValue = ko.observable();
    this.inputEstadoCivilValue = ko.observable();
    this.inputOcupacionValue = ko.observable();

    this.inputDivicionMValue = ko.observable();
    this.inputMunicipioRValue = ko.observable();
    this.inputDepartamentoRValue = ko.observable();
    this.inputPaisRValue = ko.observable();

    this.inputIdentificacionRValue = ko.observable();
    this.inputNombresCRValue = ko.observable();
    this.inputNacionalidadCValue = ko.observable();
    this.inputEstatusCValue = ko.observable();
    this.inputNombresValue = ko.observable();
    this.inputGeneroValue = ko.observable();

    this.dateConverter = ko.observable(
      new ojconverter_datetime_1.IntlDateTimeConverter({
        pattern: "dd/MM/yyyy",
      })
    );

    this.inputFechaNacimientoValue = ko.observable();

    this.formattedDate = "",



    this.inputValue = ko.observable();
    this.onCreateButtonClick = ko.observable();
    this.formValidationId = ko.observable();
    this.groupValid = ko.observable();
    this.messagesDataprovider = ko.observable(new ArrayDataProvider([]));

    this.estadoCivilDP = ko.observable(new ArrayDataProvider([]));


    /**
     * permite mostrar u ocultar
     * los formularios al hacer click sobre
     * el boton nuevo.
     */
    var ButtonNuevo = document.getElementById("boton-nuevo");
    ButtonNuevo.addEventListener("click", function () {
      var forms = document.querySelectorAll(".contenido");
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].style.display === "block") {
          forms[i].style.display = "none";
          //toggleFormButton.textContent = 'Nuevo';
        } else {
          forms[i].style.display = "block";
          //toggleFormButton.textContent = 'Mostrar formularios';
        }
      }
    });

  




    
  };

  ControllerViewModel.prototype._initAllValidators = function () {
    this.inputPrimerApellidoValidator = ko.observableArray([
      new AsyncLengthValidator({
        min: 5,
        max: 10,
        countBy: "codeUnit",
        hint: {
          inRange: _t("validators.primerApellido", "{min}", "{max}"),
        },
        messageSummary: {
          tooLong: _t("Custom: Too many characters"),
          tooShort: "Custom: Too few characters",
        },
        messageDetail: {
          tooLong: _t("validators.tooLong", "{max}"),
          tooShort:
            "Custom: Number of characters is too low. Enter at least {min} characters.",
        },
      }),
    ]);
  };

  ControllerViewModel.prototype._initAllEventListeners = function () {
    this.onInputPrimerApellidoValueChange = function (event) {
      const value = event.detail.value;
      if (event.detail.value) {
        event.currentTarget.validate();
        console.log(value);
        return;
      }
      console.log("Esta vacio");
    }.bind(this);

    this.oninputFechaNacimientoValueChange = function (event) {
      //const prueba = this.inputFechaNacimientoValue();
      //console.log(prueba);
      const value = event.detail.value;
      if (value) {
        event.currentTarget.validate();
        this.formattedDate = value;
        //console.log(this.formattedDate);
        return;
      }
      console.log("Esta vacio");
    }.bind(this);
  };

  ControllerViewModel.prototype._initAllVariables = async function () {
    /*this.messages = [
      {
        severity: 'confirmation',
        summary: 'Se confirma que la operacion',
        detail: 'se ha realizado satisfactoriamente',
        timestamp: new Date().toISOString(),
        autoTimeout: 3000,
      },
      {
        severity: 'error',
        summary: 'Ha ocurrido un error en la operacion',
        detail: 'no se ha realizado satisfactoriamente',
        timestamp: new Date().toISOString(),
        autoTimeout: 3000,
      },
    ]*/

    /*this.messagesDataprovider = new ArrayDataProvider(this.messages);*/
    this.positionMessage = CoreUtils.toastMessagePosition();

    const dataService = await ServiceUtils.obtenerData("getEstadoCivil");
    
    const arrayData = [
      {
        value: dataService[0].DESCRIPCION,
        label: dataService[0].DESCRIPCION,
      },
      {
        value: dataService[1].DESCRIPCION,
        label: dataService[1].DESCRIPCION,
      },
      {
        value: dataService[2].DESCRIPCION,
        label: dataService[2].DESCRIPCION,
      },
    ]
    console.log(arrayData);


    this.estadoCivilDP(new ArrayDataProvider( arrayData ,{
      keyAttributes: "value",
    }));

    console.log(this.estadoCivilDP());

    

  };

  ControllerViewModel.prototype._onRegisterButton = async function () {
    const valid = CoreUtils.checkValidationGroup(this.formValidationGroupId);
    const jsonServiceReq = {
      primerApellido: this.inputPapellidoValue(),
      segundoApellido: this.inputSapellidoValue(),
      nombre: this.inputNombresValue(),
      sexo: this.inputGeneroValue(),
      fechaNacimiento: this.formattedDate,
      estadoCivil: this.inputEstadoCivilValue(),
      ocupacion: this.inputOcupacionValue(),
    };

    if (valid) {
      let dataService;

      try {
        //dataService = await AppServices.guardarPersona(jsonServiceReq);
        dataService = await AppServices.guardarPersonaDos(jsonServiceReq);
      } catch (error) {
        
        console.log(error);
        this.messagesDataprovider(
          new ArrayDataProvider([
            {
              severity: "error",
              summary: "Ha ocurrido un error en la operacion",
              detail: error.message,
              timestamp: new Date().toISOString(),
              autoTimeout: 3000,
            },
          ])
        );
        console.log(this.messagesDataprovider());
        return;
      }
      console.log(dataService);
      if (dataService || dataService.success) {
        this.messagesDataprovider(
          new ArrayDataProvider([
            {
              severity: "confirmation",
              summary: "Se ha realizado la operación",
              detail: "correctamente",
              timestamp: new Date().toISOString(),
              autoTimeout: 3000,
            },
          ])
        );
        console.log(this.messagesDataprovider());
      }

      /*this.messagesDataprovider(new ArrayDataProvider([
        {
          severity: 'errorPrueba',
          summary: 'Ha ocurrido un error en la operacion',
          detail: 'no se ha realizado satisfactoriamente',
          timestamp: new Date().toISOString(),
          autoTimeout: 3000,
        }
      ]))
      console.log(this.messagesDataprovider()); */
    }
  };

  return new ControllerViewModel();
});
