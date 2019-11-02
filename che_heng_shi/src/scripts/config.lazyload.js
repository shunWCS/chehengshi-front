// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      filestyle:      ['lib/modules/file/bootstrap-filestyle.min.js'],
  }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name:'angularFileUpload',
                  files: [
                    'vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'lib/modules/textAngular/textAngular-sanitize.min.js',
                      'lib/modules/textAngular/textAngular.min.js'
                  ]
              },
          ]
      });
  }])
;