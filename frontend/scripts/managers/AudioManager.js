/**
 *  Manager for audio.
 */

'use strict';

angular.module('ame.managers.AudioManager', [])
    .service('AudioManager', ['$q', '$rootScope', 'ElectronHelper',
        function($q, $rootScope, electron) {

            var element = new Audio();
            var context = new AudioContext();
            var source = context.createMediaElementSource(element);
            var analyser = context.createAnalyser();
            var frequencyData;
            var timeDomainData;
            var audioStatus = 'idle';
            var fftSize = 128;
            analyser.fftSize = fftSize;

            var play = function(){
                element.play();
                audioStatus = 'playing';
            };

            var getAudioStatus = function(){
                return audioStatus;
            };

            var initializeWebAudio = function(url){
                var deferred = $q.defer();
                element.src = url;
                element.addEventListener("canplay", function() {
                    source.connect(analyser);
                    analyser.connect(context.destination);
                    frequencyData = new Uint8Array(analyser.frequencyBinCount);
                    timeDomainData = new Uint8Array(analyser.frequencyBinCount);
                    deferred.resolve();
                });
                return deferred.promise;
            };


            var update = function(){
                analyser.getByteFrequencyData(frequencyData);
                analyser.getByteTimeDomainData(timeDomainData);
            };

            var getFrequencyData = function(){
                return frequencyData;
            };

            var getTimeDomainData = function(){
                return timeDomainData;
            };

            var getBinCount = function(){
                return analyser.frequencyBinCount;
            };


            return {
                play: play,
                getFrequencyData: getFrequencyData,
                getTimeDomainData: getTimeDomainData,
                getBinCount: getBinCount,
                initializeWebAudio: initializeWebAudio,
                getAudioStatus: getAudioStatus,
                update: update
            };
        }
    ]);
