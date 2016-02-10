finApp.factory('alertService', [ '$interval',
  function ($interval) {
    var service = {};
    alerts = [];

    service.addAlert = addAlert;
    service.closeAlert = closeAlert;
    service.closeAlertIndex = closeAlertIndex;
    service.clearAlerts = clearAlerts;
    service.getAlerts = getAlerts;
    service.updateAlerts = updateAlerts;

    $interval(function(){
      if(alerts.length > 0) {
        updateAlerts();
      }
    }, 500);

    return service;

    function addAlert (type, msg, timeout){
      timeout = typeof timeout !== 'undefined' ? timeout : 5000;// Default timeout value
      alerts.push(
        { 'type': type,
          'msg': msg,
          'timeout': timeout,
          close: function(){
            return closeAlert(this);
          }
        });
    }

    function closeAlertIndex (alertIndex){
      return alerts.splice(alertIndex, 1);
    }

    function closeAlert (alert){
      return closeAlertIndex(alerts.indexOf(alert));
    }

    function clearAlerts (){
      alerts = [];
    }

    function getAlerts (){
      return alerts;
    }

    function updateAlerts(){
      angular.forEach( alerts, function (alert){
        if(alert.timeout <= 0) {
          closeAlert(alert);
        } else {
          alert.timeout-=500;
        }
      });
    }
  }
]);