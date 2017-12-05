(function() {
  'use strict';
  angular.module('app')
    .filter('activityFormat', activityFormat);

  /**@ngInject**/
  function activityFormat(
    moment,
    TIME_FORMAT,
    ACTIVITY_TYPES,
    REQUEST_STATES
  ){
    return (input) => {
      var result;
      var verb;
      var request;
      var tagStartBold = '<span class="bold">';
      var tagEndBold = '</span>';
      var tagStartRequestHref = `<a ng-click="vm.openRequestTab(${input.request.id})">`;
      var tagEndRequestHref = '</a>';

      var author = input.author.first_name ? `${input.author.first_name}` : `${input.author.last_name}`;


      if (input.type[input.type.length - 1] === `e`) {
        verb = `${input.type}d`;
      } else if (input.type !== REQUEST_STATES.PENDING) {
        verb = `${input.type}ed`;
      } else {
        verb = 'changed status to pending of';
      }

      var time = moment(input.date).format(TIME_FORMAT.ABBRVEXTENDED);

      if (input.type === 'message' && input.author.first_name) {
        request = ``;
      } else if (input.type === 'message'){
        request = `Customer`;
      } else {
        request = `${tagStartRequestHref} ${input.request.name} ${tagEndRequestHref} request on `;
      }

      result = `${tagStartBold} ${author} ${tagEndBold} ${verb} ${request} ${time}`;
      return result;
    }
  }
})();
