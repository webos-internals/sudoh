enyo.kind(
    {
	name: "SuDoh.Main",
	kind: enyo.VFlexBox,
	className: 'enyo-fit enyo-vflexbox main',
	components: [
	    { kind: "ApplicationEvents", onApplicationRelaunch: "applicationRelaunchHandler" },
	    
	    { kind: wi.Header, random: [
		  { weight: 1,  tagline: 'Sudo make me a sandwich' }
	      ] },
	    
	    { name: 'enyoElement',   kind: 'Item', content: 'Sudoh!' },
	    { name: 'csrvElement',   kind: 'Item', content: 'Waiting for C Service ...' },

	    { name: 'cservice', kind: 'PalmService',
	      service: 'palm://org.webosinternals.sudo/', method: 'sudo',
	      onResponse: 'csrvResponse' }
	],

	applicationRelaunchHandler: function(params) {
	    var curwin = enyo.windows.getActiveWindow();
	    if (curwin && enyo.windowParams.foo) {
		curwin.enyo.$.main.foo();
	    }
	},

	rendered: function() {
	    this.inherited(arguments);
	    this.$.csrvElement.setContent("Calling C Service ...");
	    this.$.cservice.call({ 'name': 'C Service' });
	},
	
	csrvResponse: function(inSender, inResponse, inRequest) {
	    if (inResponse.returnValue === true) {
		this.$.csrvElement.setContent(inResponse.reply);
	    }
	    else {
		this.$.csrvElement.setContent("Error: "+inResponse.errorText);
	    }
	},

    }
);