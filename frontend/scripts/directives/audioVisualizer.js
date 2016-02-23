'use strict';

angular.module('ame.directives.AudioVisualizer', [])
    .directive('audioVisualizer', ['AudioManager', '$timeout', function(AudioManager, $timeout) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/partials/directives/audioVisualizer',
            link: function(scope, elem, attrs) {
                // empty

                var canvas = elem.find('canvas')[0];
                var ctx = canvas.getContext('2d');

                scope.$watch(function() {
                    return AudioManager.getAudioStatus();
                }, function(audioStatus) {
                    if (audioStatus === 'playing') {
                        update();
                    } else {
                        cancelAnimationFrame(update);
                    }
                });

                var avgFrequency = 0;
                var update = function() {
                    requestAnimationFrame(update);
                    AudioManager.update();
                    var frequencyData = AudioManager.getFrequencyData();
                    var bufferLength = AudioManager.getBinCount();
                    var WIDTH = canvas.width;
                    var HEIGHT = canvas.height;
                    if (frequencyData) {

                        ctx.clearRect(0, 0, WIDTH, HEIGHT);

                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#fff';

                        ctx.beginPath();

                        var totalValue = 0;
                        var sliceWidth = WIDTH * 1.0 / bufferLength;
                        var x = 0;

                        for (var i = 0; i < bufferLength; i++) {

                            totalValue += frequencyData[i];
                            var v = frequencyData[i] / 256.0;
                            var y = v * HEIGHT;

                            if (i === 0) {
                                ctx.moveTo(x, y);
                            } else {
                                ctx.lineTo(x, y);
                            }

                            x += sliceWidth;
                        }

                        avgFrequency = totalValue/frequencyData.length;
                        ctx.stroke();
                    }

                };

            }
        };
    }]);
