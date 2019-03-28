require([
    "dojo/dom",
    "dojo/parser",
    "dijit/form/Button",
    "dojo/domReady",
    "dojox/form/Uploader",
    "dojo/_base/xhr",
    "dojox/form/uploader/plugins/IFrame"
], function(
    dom,
    parser,
    Button
) {

var uploader = new dojox.form.Uploader({
                        label: "Browse...",
                        multiple: false,
                        name:'file',
                        showInput:'before',
                        force: 'iframe',
                        uploadOnSelect: false
                      }, "uploader");

var myButton = new Button({
	showLabel: true,
        label: "Submit",
	onClick: function(){
		uploader.upload();
	}	
    }, "submitButton").startup();

uploader.upload = function(){
                         var formData = new FormData();
                         formData.append("file", uploader._files[0]);
                         var td = dojo.xhrPost({
                             url: "http://httpbin.org/post",
                             form: dojo.byId('myForm'),
                             method: "post",
                             preventCache: true,
                             handleAs: "json",
                             headers: {"Content-Type": false, "X-Hello":"World"},
                             postData: formData,
                             load: function(response, ioArgs){
                                console.log("UPLOAD SUCCESSFUL");
                                return true;
                             },
                             error: function(response, ioArgs ){
                                console.log("Error");
                                return true;
                            }
                        });
                    }

uploader.startup();
});
