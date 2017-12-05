(function() {
  'use strict';
  angular.module('app')
    .filter('commentFormat', commentFormat);

  /**@ngInject**/
  function commentFormat(moment, TIME_FORMAT){
    return (input) => {
      var result;
      var tagStartBold = '<span class="bold">';
      var tagEndBold = '</span>';

      var author = `${input.userId} `;
      var time = moment.utc(input.entryDate).format (TIME_FORMAT.GENERAL);
      var verb = ' added a comment to PPLUS on ';
      var category = ` | Category: ${input.category}`;
      result = tagStartBold + author + tagEndBold + verb + time + category;
      return result;
    }
  }
})();
