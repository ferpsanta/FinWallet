finApp.factory('alertService',
  function () {
    var service = {};
    alerts = [];

    service.addAlert = addAlert;
    service.closeAlert = closeAlert;
    service.closeAlertIndex = closeAlertIndex;
    service.clearAlerts = clearAlerts;
    service.getAlerts = getAlerts;

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
  }
);