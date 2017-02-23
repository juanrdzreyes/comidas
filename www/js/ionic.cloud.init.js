angular.module('ionic.cloud.init', ['ionic.cloud'])

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "49ae2c01"
    }
  });
})