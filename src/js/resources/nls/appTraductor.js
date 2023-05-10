define({
    // root bundle
      root: {
        inputs: {
          Departamento: "Departamento"
        },
        validators: {
          primerApellido : 'Custom hint (español): value must have at least {0} characters but not more than {1}',
          tooLong: 'Custom: Number of characters (español) is too high. Enter at most {0} characters',
        }

        
      },
    
    // supported locales.       
      "es":1,
       ar:1,
       ro:1,
       "zh-Hant":1,
       nl:1,
       it:1,
       fr:1,
       //  ... contents omitted
       tr:1,fi:1
    });