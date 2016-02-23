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
            var metadata;

            analyser.fftSize = fftSize;

            var play = function(){
                element.play();
                audioStatus = 'playing';
            };

            var pause = function(){
                element.pause();
                audioStatus = 'paused';
            };

            var getAudioStatus = function(){
                return audioStatus;
            };

            var initializeWebAudio = function(item){
                var deferred = $q.defer();
                metadata = {
                    title: item.name,
                    subtitle: item.subtitle,
                    album: item.album.album,
                    albumPic: item.album.blurPicUrl
                };
                element.src = item.mp3Url;
                element.addEventListener('canplay', function() {
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

            var getAudioElement = function(){
                return element;
            };

            var getMetadata = function(){
                return metadata;
            };


            return {
                play: play,
                pause: pause,
                getFrequencyData: getFrequencyData,
                getTimeDomainData: getTimeDomainData,
                getBinCount: getBinCount,
                initializeWebAudio: initializeWebAudio,
                getAudioStatus: getAudioStatus,
                update: update,
                getAudioElement: getAudioElement,
                getMetadata: getMetadata
            };
        }
    ]);
