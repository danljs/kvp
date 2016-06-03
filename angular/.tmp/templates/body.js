(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/body.html',
    '<div class="row body"><div class="row label">Key/Value Pair List</div><div class="row"><div class="left-area"><select id="kv-list" size="10" ng-show="toggle_list" multiple="multiple" ng-model="selected" ng-change="change_selected()"><option ng-repeat="option in kv_array" value="{{$index}}">{{option.key + \'=\' + option.value}}</option></select><textarea readonly="readOnly" id="kv-xml" ng-model="kv_xml" ng-hide="toggle_list"></textarea></div><div class="right-area"><div class="row"><button id="order-value-button" ng-click="order_value()">OrderByValue</button></div><div class="row"><button id="order-key-button" ng-click="order_key()">OrderByKey</button></div><div class="row"><button id="delete-button" ng-click="delete()">Delete</button></div><div class="row"><button id="show-xml" ng-show="toggle_list" ng-click="show_xml()">ShowXML</button></div><div class="row"><button id="show-list" ng-hide="toggle_list" ng-click="show_list()">ShowList</button></div><div class="row"><button id="load-json" ng-click="load_json()">LoadData</button></div><div class="row"><button id="save-json" ng-click="save_json()">SaveData</button></div></div></div></div>');
}]);
})();
