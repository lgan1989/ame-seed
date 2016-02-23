'use strict';
angular.module('ame.directives.AudioPlayer', [])
    .controller('AudioPlayerCtrl', ['$scope', 'AudioManager', '$timeout', function($scope, AudioManager, $timeout)  {
        $scope.playerStatus = 'idle';
        $scope.metadata = {
            title: '',
            subtitle: ''
        };

        $scope.$watch(function() {
            return AudioManager.getAudioStatus();
        }, function(value) {
            $scope.playerStatus = value;
        });

        var audio = AudioManager.getAudioElement();

        $scope.loaded = $scope.played = 0;

        var getPlayedPercentage = function() {
            if (audio.duration) {
                return 100 * audio.currentTime / audio.duration;
            }
            return 0;
        };

        var getLoadedPercentage = function() {
            if (audio.duration && audio.buffered) {
                return 100 * audio.buffered.end(0) / audio.duration;
            }
            return 0;
        };


        var updateProgressBar = function() {
            $scope.played = getPlayedPercentage();
            $scope.loaded = getLoadedPercentage();
            $timeout(function() {
                $scope.$apply();
            });
        };

        var secToDurationStr = function(sec) {
            sec = Math.floor(sec);
            var hours = Math.floor(sec / 3600);
            var minutes = Math.floor((sec - (hours * 3600)) / 60);
            var seconds = sec - (hours * 3600) - (minutes * 60);
            if (hours < 10 && hours > 0) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            var time = '--';
            if (hours){
                time = hours + ':' + minutes + ':' + seconds;
            }
            else{
                time = minutes + ':' + seconds;
            }
            return time;
        };


        var updateTime = function() {
            $scope.currentTime = secToDurationStr(audio.currentTime);
        };

        $scope.$watch(function(){
            return AudioManager.getMetadata();
        }, function(metadata){
            $scope.metadata = metadata;
        });

        $scope.seekTo = function(evt){
            var totalX = evt.currentTarget.clientWidth;
            var currentX = evt.offsetX;
            audio.currentTime = Math.floor(audio.duration * currentX / totalX);
        };

        audio.addEventListener('timeupdate', function() {
            updateProgressBar();
            updateTime();
        });

        audio.addEventListener('canplay', function(){
            $scope.totalTime = secToDurationStr(audio.duration);
        });

        $scope.playPauseClicked = function() {
            if ($scope.playerStatus === 'playing') {
                AudioManager.pause();
            } else {
                AudioManager.play();
                $scope.playerStatus = 'playing';
                updateProgressBar();
            }
        };
    }])
    .directive('audioPlayer', [function() {
        return {
            controller: 'AudioPlayerCtrl',
            restrict: 'E',
            replace: true,
            templateUrl: '/partials/directives/audioPlayer'
        };
    }]);
