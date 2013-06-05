﻿
$(function () {
    var hash = window.location.hash.substring(1);
    var scopeID = parseInt(hash);
    var idx = hash.indexOf("a");
    var appID = hash.substring(idx + 1);

    var svc = new authz.Service("admin/ScopeClients/" + scopeID);
    svc.get().then(function (data) {
        var vm = new ScopeClients(data);
        ko.applyBindings(vm);
    });

    function ScopeClients(list) {
        ko.mapping.fromJS(list, null, this);
        this.appID = ko.computed(function () {
            return appID;
        });
        this.scopeID = ko.computed(function () {
            return scopeID;
        });
    }

    ScopeClients.prototype.addClient = function (item) {
        var vm = this;
        svc.put(null, item.clientId()).then(function () {
            vm.otherClients.remove(item);
            vm.allowedClients.push(item);
        });
    };

    ScopeClients.prototype.deleteClient = function (item) {
        var vm = this;
        svc.delete(item.clientId()).then(function () {
            vm.allowedClients.remove(item);
            vm.otherClients.push(item);
        });
    }
});