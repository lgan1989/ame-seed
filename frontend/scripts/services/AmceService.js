'use strict';

angular.module('amceMessageProcessor.services.amceService', [])
    .service('amceService', function($rootScope) {

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
        },{
            id: 5,
            recipient: 'wendy.tse@gmail.com',
            name: 'Wendy',
            type: 1,
            created: '3/23/2017, 5:34:37 PM'
        }];

        let processed = [];

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
            processed.push(Object.assign(todos.find(todo => todo.id === id), {
                content: content,
                processed: new Date().toLocaleString()
            }));
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
