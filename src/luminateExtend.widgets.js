/*
 * luminateExtend.widgets.js
 * Version: 1.0.0 (25-FEB-2014)
 * Requires: jQuery v1.5.1+ or Zepto v1.1+ and luminateExtend.js v1.6+
 */

(function($) {
  /* plugin namespace */
  luminateExtend.widgets = function(widgetTypes, selector) {
    /* make luminateExtend.widgets an alias for the parse method if called directly */
    luminateExtend.widgets.parse(widgetTypes, selector);
  };
  
  luminateExtend.widgets.version = '1.0.0';
  
  luminateExtend.widgets.parse = function(widgetTypes, selector) {
    if(!widgetTypes || widgetTypes === 'all') {
      widgetTypes = ['cons'];
    }
    else {
      widgetTypes = luminateExtend.utils.ensureArray(widgetTypes);
    }
    selector = selector || 'body';
    
    $.each(widgetTypes, function(i, widgetType) {
      switch(widgetType) {
        case 'cons':
          var $consWidgets = $(selector).find(document.getElementsByTagName('luminate:cons'))
                                        .filter('[field]')
                                        .add($(selector).find('[data-widget="consinfo"][data-field]'));
          if($consWidgets.length > 0) {
            var parseConsWidgets = function(response) {
              $consWidgets.each(function() {
                var $consWidget = $(this);
                if(response.getConsResponse) {
                  var consField = $consWidget.attr('field') || $consWidget.data('field');
                  $consWidget.replaceWith(luminateExtend.utils.stringToObj(consField, response.getConsResponse));
                }
                else {
                  $consWidget.remove();
                }
              });
            };
            
            luminateExtend.api({
              api: 'cons', 
              data: 'method=getUser&luminateExtendWidgets=' + luminateExtend.widgets.version, 
              requestType: 'POST', 
              requiresAuth: true, 
              callback: parseConsWidgets
            });
          }
          break;
      }
    });
  };
})(typeof jQuery === 'undefined' && typeof Zepto === 'function' ? Zepto : jQuery);