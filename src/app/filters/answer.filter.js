(function() {
  'use strict';
  angular.module('app')
    .filter('answerFormat', answerFormat);

  /**@ngInject**/
  function answerFormat(moment, TIME_FORMAT, $filter){
    return (input) => {
      var result;

      if (input.format === 'date') {
        result = input.answer ? moment.utc(input.answer).format(TIME_FORMAT.GENERAL) : '';
      } else if (input.format === 'currency') {
        result = $filter('currency')(input.answer);
      } else {
        result = input.answer
      }

      return result;
    }
  }
})();
