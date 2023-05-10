define([],

    function () {

        class CoreUtils {

            /**
             * Constructor utilizando el patron singleton.
             * si la clase ya esta creada devolvera la 
             * instacia de lo contrario la creara.
             */
            constructor(){
                if(!CoreUtils.instance){
                    this.counter = 0;
                    CoreUtils.instance = this;
                }
                return CoreUtils.instance;
            }

            /**
             * Metodo que se encarga de la 
             * generacion de un id unico, para 
             * cada pagina que se desarrolle
             * @returns 
             */
            generarUnicoId(){
                return `uid-${this.counter++}`;
            }

            checkValidationGroup(id) {
                const tracker = document.getElementById(id);
                if (tracker.valid === 'valid') {
                    return true;
                }
                else {
                    // show messages on all the components that are invalidHiddden, i.e., the
                    // required fields that the user has yet to fill out.
                    tracker.showMessages();
                    tracker.focusOn('@firstInvalidShown');
                    return false;
                }
            }


            toastMessagePosition(){
                return {
                    my: { vertical: 'center', horizontal: 'center' },
                    at: { vertical: 'center', horizontal: 'center' },
                    of: 'window'
                };
            }


        }
        /**
         * Crear instancia
         */
        const instance = new CoreUtils();
        return instance;
    }
    
    
    );