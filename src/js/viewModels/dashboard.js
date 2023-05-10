define([
  "knockout",
  "ojs/ojconverterutils-i18n",
  "ojs/ojarraydataprovider",
  "ojs/ojknockout",
  "ojs/ojinputnumber",
  "ojs/ojselectcombobox",
  "ojs/ojcheckboxset",
  "ojs/ojslider",
  "ojs/ojswitch",
  "ojs/ojlabel",
  "ojs/ojselectsingle",
  "ojs/ojdatetimepicker",
  "ojs/ojinputtext",
  "ojs/ojdialog",
  "ojs/ojradioset",
  "ojs/ojmessages",
  "ojs/ojcolorspectrum",
  "ojs/ojcolorpalette",
  "ojs/ojformlayout",
  "ojs/ojbutton",
], function (ko, ConverterUtilsI18n, ArrayDataProvider) {
  function formularioViewModel() {
    let self = this;

    self.dateValue = ko.observable(
      ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date())
    );
    self.isRequired = ko.observable(true);
    self.checkboxValues = ko.observableArray(["required"]);
    self.isRequired = ko.computed(
      function () {
        return self.checkboxValues.indexOf("required") !== -1;
      }.bind(self)
    );

    self.formulario = ko.observable(false);
    
    self.mostrarContenido = () => {
      self.formulario(true);
    };
    self.ocultarContenido = () => {
      self.formulario(false);
    };

    self.resetForm = () => {};

    self.selectVal = ko.observable("Soltero");

    let estadoCivil = [
      { value: "Divorciado", label: "Divorciado" },
      { value: "Soltero", label: "Soltero" },
      { value: "Casado", label: "Casado" },
      { value: "Viudo", label: "Viudo" },
    ];

    self.estadoCivilDP = new ArrayDataProvider(estadoCivil, {
      keyAttributes: "value",
    });

    self.datosGuardados = function () {
      let myDialog = document.getElementById("myDialog");

      function openDialog() {
        myDialog.open();
      }
    };
  }

  // Bootstrap.whenDocumentReady().then(function () {
  //   ko.applyBindings(
  //     new formularioViewModel(),
  //     document.getElementById("formulario")
  //   );
  // });

  // ko.applyBindings(new formularioViewModel());
  return formularioViewModel;
});
