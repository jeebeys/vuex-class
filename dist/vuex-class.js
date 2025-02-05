/*!
 * vuex-class v0.3.2
 * https://github.com/ktsn/vuex-class
 *
 * @license
 * Copyright (c) 2017 katashin
 * Released under the MIT license
 * https://github.com/ktsn/vuex-class/blob/master/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-class-component'), require('vuex')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue-class-component', 'vuex'], factory) :
    (factory((global.VuexClass = {}),global.VueClassComponent,global.Vuex));
}(this, (function (exports,vueClassComponent,vuex) { 'use strict';

    var State = createBindingHelper('computed', vuex.mapState);
    var Getter = createBindingHelper('computed', vuex.mapGetters);
    var Action = createBindingHelper('methods', vuex.mapActions);
    var Mutation = createBindingHelper('methods', vuex.mapMutations);
    function namespace(namespace, helper) {
        function createNamespacedHelper(helper) {
            function namespacedHelper(a, b) {
                if (typeof b === 'string') {
                    var key = b;
                    var proto = a;
                    return helper(key, { namespace: namespace })(proto, key);
                }
                var type = a;
                var options = merge(b || {}, { namespace: namespace });
                return helper(type, options);
            }
            return namespacedHelper;
        }
        if (helper) {
            console.warn('[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead.');
            return createNamespacedHelper(helper);
        }
        return {
            State: createNamespacedHelper(State),
            Getter: createNamespacedHelper(Getter),
            Mutation: createNamespacedHelper(Mutation),
            Action: createNamespacedHelper(Action)
        };
    }
    function createBindingHelper(bindTo, mapFn) {
        function makeDecorator(map, namespace) {
            return vueClassComponent.createDecorator(function (componentOptions, key) {
                if (!componentOptions[bindTo]) {
                    componentOptions[bindTo] = {};
                }
                var mapObject = (_a = {}, _a[key] = map, _a);
                componentOptions[bindTo][key] = namespace !== undefined
                    ? mapFn(namespace, mapObject)[key]
                    : mapFn(mapObject)[key];
                var _a;
            });
        }
        function helper(a, b) {
            if (typeof b === 'string') {
                var key = b;
                var proto = a;
                return makeDecorator(key, undefined)(proto, key);
            }
            var namespace = extractNamespace(b);
            var type = a;
            return makeDecorator(type, namespace);
        }
        return helper;
    }
    function extractNamespace(options) {
        var n = options && options.namespace;
        if (typeof n !== 'string') {
            return undefined;
        }
        if (n[n.length - 1] !== '/') {
            return n + '/';
        }
        return n;
    }
    function merge(a, b) {
        var res = {};
        [a, b].forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                res[key] = obj[key];
            });
        });
        return res;
    }

    exports.State = State;
    exports.Getter = Getter;
    exports.Action = Action;
    exports.Mutation = Mutation;
    exports.namespace = namespace;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
