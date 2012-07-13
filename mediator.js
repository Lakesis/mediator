/*	
	Basic implementation of the Mediator desing pattern
	
	http://addyosmani.com/largescalejavascript/
	http://addyosmani.com/resources/essentialjsdesignpatterns/book/
*/

var mediator = (function(mediator, undefined){

	var subscribers = [];
	//	ATTACHING METHOD
	mediator.on = function(message, fn){
		// Custom events
		if (typeof subscribers[message] == "undefined"){
			subscribers[message] = [];
		}
		subscribers[message].push({'context':this,'action': fn});
		
		return this;
	};
	
	// FIRING METHOD	
	mediator.publish = function(message){
		if (!subscribers[message]) return false;
		var thisSubscribers = subscribers[message],
		args = Array.prototype.slice.call(arguments, 1);
		
		for (var i=0, length = thisSubscribers.length; i < length; i++){	// Handler iteration 
			thisSubscribers[i].action.call(thisSubscribers[i].context, args);
		}
		return this
	};
	
	// REMOVING METHOD
	mediator.off = function(message){
		if (!subscribers[message]) return false;
		var thisSubscribers = subscribers[message];
		thisSubscribers = []; 
		
		return this;
	};
		
	mediator.mediatify = function(object){
		object.on = mediator.on;
		object.publish = mediator.publish;
		object.off = mediator.off;
	};
		
	 return mediator;

	
})(mediator || {}, window, document);