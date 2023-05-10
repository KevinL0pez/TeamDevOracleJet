/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils', 'knockout',],
 function(accUtils, ko) {

    function DashboardViewModel() {
      var self = this;

      var data = [
        { name: "Águilas Doradas", items: [29] },
        { name: "Millonarios", items: [26] },
        { name: "Alianza Petrolera", items: [26] },
        { name: "Boyacá Chicó", items: [25] },
        { name: "Boyacá América", items: [25] },
        { name: "Pasto", items: [22] },
        { name: "Junior", items: [21] },
        { name: "Santa Fe", items: [20] },
        { name: "Atlético Nacional", items: [19] },
        { name: "Medellín", items: [19] },
        { name: "Enivado", items: [18] },
        { name: "Tolima", items: [18] },
      ];

      self.dataSource = ko.observableArray(data);

      // Attribute Groups Handler for Consistent Coloring
      var attrGroups = new oj.ColorAttributeGroupHandler();

      // Categories
      var categories = [
        "Initial",
        "Qualification",
        "Meeting",
        "Proposal",
        "Close"
      ];
      var hiddenCategories = [categories[0]];
      self.hiddenCategoriesValue = ko.observableArray(hiddenCategories);

      // Chart Data
      var categoricalSeries = [{ items: [] }];
      var categoricalSeriesItems = categoricalSeries[0].items;
      categoricalSeriesItems.push({
        value: 42,
        color: attrGroups.getValue(categories[0]),
        categories: [categories[0]]
      });
      categoricalSeriesItems.push({
        value: 55,
        color: attrGroups.getValue(categories[1]),
        categories: [categories[1]]
      });
      categoricalSeriesItems.push({
        value: 36,
        color: attrGroups.getValue(categories[2]),
        categories: [categories[2]]
      });
      categoricalSeriesItems.push({
        value: 15,
        color: attrGroups.getValue(categories[3]),
        categories: [categories[3]]
      });
      categoricalSeriesItems.push({
        value: 12,
        color: attrGroups.getValue(categories[4]),
        categories: [categories[4]]
      });

      var timeSeries = [
        { name: categories[0], items: [74, 62, 70, 76, 66] },
        { name: categories[1], items: [50, 38, 46, 54, 42] },
        { name: categories[2], items: [34, 22, 30, 32, 26] },
        { name: categories[3], items: [18, 6, 14, 22, 10] },
        { name: categories[4], items: [3, 2, 3, 3, 2] }
      ];

      var pieSeries = [
        { name: categories[0], items: [42] },
        { name: categories[1], items: [55] },
        { name: categories[2], items: [36] },
        { name: categories[3], items: [10] },
        { name: categories[4], items: [5] }
      ];

      var bubbleSeries = [
        {
          name: categories[0],
          items: [{ x: 15, y: 25, z: 5 }, { x: 25, y: 30, z: 12 }]
        },
        {
          name: categories[1],
          items: [{ x: 15, y: 15, z: 8 }, { x: 20, y: 35, z: 14 }]
        },
        {
          name: categories[2],
          items: [{ x: 10, y: 10, z: 8 }, { x: 18, y: 55, z: 10 }]
        },
        {
          name: categories[3],
          items: [{ x: 8, y: 20, z: 6 }, { x: 11, y: 30, z: 8 }]
        },
        {
          name: categories[4],
          items: [{ x: 25, y: 45, z: 12 }, { x: 40, y: 55, z: 35 }]
        }
      ];

      var timeGroups = [1980, 1990, 2000, 2010, 2020];

      self.categoricalSeriesValue = ko.observableArray(categoricalSeries);
      self.categoricalGroupsValue = ko.observableArray(categories);
      self.timeSeriesValue = ko.observableArray(timeSeries);
      self.timeGroupsValue = ko.observableArray(timeGroups);
      self.pieSeriesValue = ko.observableArray(pieSeries);
      self.bubbleSeriesValue = ko.observableArray(bubbleSeries);

      // Legend Data
      var legendSections = [{ items: [] }];
      var legendItems = legendSections[0].items;
      for (
        var categoryIndex = 0;
        categoryIndex < categories.length;
        categoryIndex++
      ) {
        var category = categories[categoryIndex];
        legendItems.push({
          text: category,
          color: attrGroups.getValue(category),
          shortDesc: "Filter: " + category
        });
      }

      self.legendSections = ko.observableArray(legendSections);
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
