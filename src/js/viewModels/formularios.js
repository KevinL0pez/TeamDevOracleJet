define(['accUtils', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojrouter', 'ojs/ojformlayout', 'ojs/ojbutton'],
function(accUtils, ko, $, ArrayDataProvider, Router, ojFormLayout) {
  
  function FormulariosViewModel() {
    var self = this;

    self.connected = async function() {
      accUtils.announce('Home page loaded.', 'assertive');
      document.title = "Home";
    };

    self.disconnected = function() {
      // Implement if needed
    };

    self.transitionCompleted = function() {
      // Implement if needed
    };

  }

  return FormulariosViewModel;
  }
);