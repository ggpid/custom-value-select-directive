function displayCustomValueIf(){ 
  return {
    require: ['ngModel'],
    scope: {
      customValue: '=',
      displayCustomValueIf: '=',
    },
    priority:2,
    link: function(scope, element, attrs, ctrls) {
      let ctrlScope = element.scope();
      var ngModelCtrl = ctrls[0];
      var fRender = angular.copy(ngModelCtrl.$render);
      var fsetViewValue = angular.copy(ngModelCtrl.$setViewValue);
      ngModelCtrl.$setViewValue = function(value, trigger) {
        if(!scope.displayCustomValueIf || value != scope.customValue){
          fsetViewValue(value, trigger);
        }
      };
      ngModelCtrl.$render = function() {
        if(scope.displayCustomValueIf){
          ngModelCtrl.$viewValue =scope.customValue;
          fRender();
        } else {
          fRender();
        }
      }
    }
  };
}