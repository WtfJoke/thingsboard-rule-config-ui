/*
 * Copyright © 2016-2018 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable import/no-unresolved, import/default */

import businessCentralApiCallConfigForm from './businesscentral-api-call-config.tpl.html';


/* eslint-enable import/no-unresolved, import/default */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

/*@ngInject*/
export default function BusinessCentralApiCallConfigDirective($compile, ruleNodeTypes, $http, $window) {

    var linker = function (scope, element, attrs, ngModelCtrl) {
        var template = businessCentralApiCallConfigForm;
        element.html(template);

        scope.ruleNodeTypes = ruleNodeTypes;

        scope.$watch('configuration', function (newConfiguration, oldConfiguration) {
            if (!angular.equals(newConfiguration, oldConfiguration)) {
                ngModelCtrl.$setViewValue(scope.configuration);
            }
        });

        ngModelCtrl.$render = function () {
            scope.configuration = ngModelCtrl.$viewValue;
        };
     
      

        scope.openAuthLink = function (){
            var data = {assetId: scope.configuration.assetId, tenantId: scope.configuration.tenantId}
            var authLinkPromise = $http.get("api/v1/oauth/link", {params: data});
            authLinkPromise.then(function(response){
                var link = response.data.url;
                $window.open(link);
            });
        }

        $compile(element.contents())(scope);
    };

    return {
        restrict: "E",
        require: "^ngModel",
        scope: {},
        link: linker
    };
}
