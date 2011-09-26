function MainAssistant() {
    this.activated = false;
};

MainAssistant.prototype.setup = function() {
    this.controller.get('main-title').innerHTML = $L('Sudoh');
    this.controller.get('version').innerHTML = $L("v" + Mojo.Controller.appInfo.version);
    this.controller.get('subTitle').innerHTML = $L('Sudo make me a sandwich');	

    this.htmlElement = this.controller.get('htmlDiv');
    this.csrvElement = this.controller.get('csrvDiv');
};

MainAssistant.prototype.activate = function(params)
{

    console.log("activate: "+JSON.stringify(params));

    if (!this.activated) {
	this.htmlElement.innerHTML = "SuDoh";

	if (true) {
	    this.csrvElement.innerHTML = "Calling C Service ...";
	    this.controller.serviceRequest('palm://org.webosinternals.sudoh', {
					       method: "sudo",
					       parameters: {"name": "C Service"},
					       onSuccess: this.csrvSuccess.bind(this),
					       onFailure: this.csrvFailure.bind(this)
					   });
	}
	else {
	    this.csrvElement.innerHTML = "C Service not available.";
	}
    }
    else if (params.foo) {
    }
};

MainAssistant.prototype.csrvSuccess = function(successData){
    this.csrvElement.innerHTML = successData.reply;
};

MainAssistant.prototype.csrvFailure = function(failData){
    this.csrvElement.innerHTML = JSON.stringify(failData);
};
