'use strict';

angular.module('amceMessageProcessor.services.amceService', [])
    .service('amceService', function($rootScope) {

        /*
         * Todo Model
         *
         * Store all all messages waiting to be processed.
         * Type 0: birth day wish
         * Type 1: congrats on birth of child
         *
         * Here it is just some mock data, in real practice these data should be stored in a database.
         * MongoDB would be a good choice here.
         *
         * */

        let todos = [{
            id: 1,
            recipient: 'ted.bobby@gmail.com',
            name: 'Ted',
            type: 0,
            created: '3/23/2017, 5:20:37 PM'
        }, {
            id: 2,
            recipient: 'bill.wong@gmail.com',
            name: 'Bill',
            type: 0,
            created: '3/23/2017, 5:21:37 PM'
        }, {
            id: 3,
            recipient: 'lucas.tam@gmail.com',
            name: 'Lucas',
            type: 1,
            created: '3/23/2017, 5:24:37 PM'
        }, {
            id: 4,
            recipient: 'marry.tsoi@gmail.com',
            name: 'Marry',
            type: 1,
            created: '3/23/2017, 5:28:37 PM'
        }, {
            id: 5,
            recipient: 'wendy.tse@gmail.com',
            name: 'Wendy',
            type: 1,
            created: '3/23/2017, 5:34:37 PM'
        }];


        /*
         * Processed Model
         *
         * Store all all messages that has been processed.
         *
         * Here it is just some mock data, in real practice these data should be stored in a database.
         * MongoDB would be a good choice here.
         *
         * */

        let processed = [];

        /*
         * Gift Model
         *
         * Store all gifts that available to choose for type 0 messages.
         *
         * I didin't list 10 sets of gifts but they should be all in following format.
         * Same as above these should be stored in DB.
         *
         * */
        const gifts = [{
            id: 0,
            name: 'Big Cake',
            description: 'a big cake with some choclote',
            image: 'https://img.clipartfest.com/e956c2838e55be7171b0fafdb6470a46_chocolate-cake-with-candles-chocolate-cake-clipart-png_564-542.jpeg'
        }, {
            id: 1,
            name: 'Big Baloon',
            description: 'a big baloon with cute drawing',
            image: 'http://pngimg.com/uploads/balloon/balloon_PNG4956.png'
        }, {
            id: 3,
            name: 'A day off',
            description: 'have a day off, well deserved',
            image: 'http://www.thecorporatesister.com/wp-content/uploads/2014/10/3-day-off.jpg'
        }];


        /*
         * Name Model
         *
         * Store all gifts that available to choose for type 0 messages.
         *
         * As mentioned in the task description, the size of name list will be large, therefore it's recommanded to put to databse
         * and use keyword to query matched names. Such as a auto-complete widget as shown in current implementation.
         *
         * */
        const names = [
            "Imani",
            "Ingrid",
            "Irene",
            "Iris",
            "Isabel",
            "Isabela",
            "Isabella",
            "Isabelle",
            "Isis",
            "Itzel",
            "Izabella",
            "Jacqueline",
            "Jada",
            "Jade",
            "Jaelynn",
            "Jamie",
            "Janelle",
            "Jaslene",
            "Jasmin",
            "Jasmine",
            "Jayda",
            "Jayla",
            "Jaylah",
            "Jayleen"
        ];

        const getTodos = () => {
            return todos;
        };

        const getProcessed = () => {
            return processed;
        };

        const getGifts = () => {
            return gifts;
        };

        const getNames = () => {
            return names.map(name => {
                return {
                    value: name.toLowerCase(),
                    display: name
                };
            });
        };

        const processMessage = (id, content) => {
            processed.push(
                Object.assign(
                    todos.find(todo => todo.id === id), {
                        content: content,
                        processed: new Date().toLocaleString()
                    }
                )
            );
            $rootScope.$broadcast('processed.updated');

            todos = todos.filter(todo => todo.id !== id);
            $rootScope.$broadcast('todos.updated');
        };

        return {
            getTodos: getTodos,
            getProcessed: getProcessed,
            getGifts: getGifts,
            getNames: getNames,
            processMessage: processMessage
        };

    });
