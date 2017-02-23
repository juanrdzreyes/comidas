angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.menuSemanal', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/menuSemanal.html',
        controller: 'menuSemanalCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.comidaPorDia'
      2) Using $state.go programatically:
        $state.go('tabsController.comidaPorDia');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page3
      /page1/tab2/page3
  */
  .state('tabsController.comidaPorDia', {
    url: '/page3',
    views: {
      'tab1': {
        templateUrl: 'templates/comidaPorDia.html',
        controller: 'comidaPorDiaCtrl'
      },
      'tab2': {
        templateUrl: 'templates/comidaPorDia.html',
        controller: 'comidaPorDiaCtrl'
      }
    }
  })

  .state('cambioDePlatillo', {
    url: '/page8',
    templateUrl: 'templates/cambioDePlatillo.html',
    controller: 'cambioDePlatilloCtrl'
  })

  .state('historialDePedidos', {
    url: '/page13',
    templateUrl: 'templates/historialDePedidos.html',
    controller: 'historialDePedidosCtrl'
  })

  .state('finalizaTuPedido', {
    url: '/page4',
    templateUrl: 'templates/finalizaTuPedido.html',
    controller: 'finalizaTuPedidoCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registro', {
    url: '/page7',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

  .state('domicilio', {
    url: '/page11',
    templateUrl: 'templates/domicilio.html',
    controller: 'domicilioCtrl'
  })

  .state('nivelDePrecio', {
    url: '/page10',
    templateUrl: 'templates/nivelDePrecio.html',
    controller: 'nivelDePrecioCtrl'
  })

$urlRouterProvider.otherwise('/page6')

  

});