"use strict";
var router_1 = require('@angular/router');
var kvp_detail_component_1 = require('../component/kvp.detail.component');
var kvp_component_1 = require('../component/kvp.component');
var kvpRoutes = [
    {
        path: '',
        component: kvp_component_1.KvpComponent
    },
    {
        path: 'kvp',
        component: kvp_component_1.KvpComponent
    },
    {
        path: 'kvp.detail',
        component: kvp_detail_component_1.KvpDetailComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(kvpRoutes);
//# sourceMappingURL=kvp.routing.js.map