'use strict';

angular.module('spell').factory('statesMaintain', function () {
	var states = [];
	return {
		maintainId: function maintainId(id, $routeParams) {
			var cutedString = '';
			for (prop in $routeParams) {
				cutedString += '/' + $routeParams[prop];
			}
			console.log(cutedString);
			id = id.replace(cutedString, '');
			console.log(id);
			return id;
		},

		saveState: function saveState(name, state) {
			states[name] = state;
		},

		getState: function getState(name) {
			return states[name] || undefined;
		},

		removeState: function removeState(name) {
			state[name] = undefined;
		},

		getStatesArray: function getStatesArray() {
			return states;
		},

		logStatesArray: function logStatesArray() {
			console.log(states);
		}
	};
});