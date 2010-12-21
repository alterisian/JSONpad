Ext.ns('jp');

jp.Window.About = Ext.extend(Ext.Window, {
    layout:'fit',
    width:500,
    height:400,
    closeAction:'hide',
    plain: true,
    modal: true,
    resizable: false,
    draggable: false,
    title: 'About JSONpad',
    //id: 'JP_aboutWindow',
    initComponent: function() {
	var me = this;

	var tplData = {
	    license_link: '<a href="http://www.jsonpad.co.cc/new_bsd_license.txt" target="_blank" class="link-to-browser">http://www.jsonpad.co.cc/new_bsd_license.txt</a>',
	    jsonpad_homepage: '<a href="http://www.jsonpad.co.cc/" target="_blank" class="link-to-browser">http://www.jsonpad.co.cc/</a>',
	    jsonpad_twitter: '<a href="http://www.twitter.com/JSONpad" target="_blank" class="link-to-browser">http://www.twitter.com/JSONpad</a>',
	    jsonpad_group: '<a href="http://groups.google.com/group/jsonpad" target="_blank" class="link-to-browser">http://groups.google.com/group/jsonpad</a>',
	    jsonpad_contact: '<a href="http://www.jsonpad.co.cc/Contact/" target="_blank" class="link-to-browser">http://www.jsonpad.co.cc/Contact/</a>',
	    jsonpad_project: 'XXX',
	    jsonpad_version: jp.App.version,
	    extjs_version: Ext.version
	};

	var tpl = new Ext.XTemplate(
	    '<span style="font-size: 11px;">' +
	    '<p>The first line of codes from this editor were written by Christopher S&ouml;llinger. '+
	    'It\'s a Non-Profit software licensed with the &quot;New BSD License&quot;. So feel free to use it at any way. For '+
	    'license details take a look at {license_link}.</p>'+
	    '<p>&nbsp;</p>'+
	    '<p>Visit the homepage {jsonpad_homepage} for latest news or for the source code.</p>' +
	    '<p>&nbsp;</p>'+
	    '<p>If you have any problems or wishes you can send them:<br />'+
	    'Twitter: {jsonpad_twitter}<br />'+
	    'Google Groups: {jsonpad_group}<br />'+
	    'GIThub: {jsonpad_project}<br />'+
	    'By contact form: {jsonpad_contact}</p>'+
	    '<p>&nbsp;</p>'+
	    '<p><b>I used for JSONpad some other code, so thanks to:</b><br />'+
	    '<i>Douglas Crockford</i>: For his excellent work with JavaScript. JSlint, JSmin and JSONparse are used from his scripts.<br />&nbsp;<br />'+
	    '<i>Stefan Goessner</i>: Very good JSON2xml script. So we do not need to code this stuff again ;)</p>&nbsp;<br />'+
	    '</span>'+
	    '<span style="font-size: 9px;">'+
	    'JSONpad Version Number: {jsonpad_version}<br />'+
	    'ExtJS Version Number: {extjs_version}<br />&nbsp;<br />'+
	    '</span>'
	    );
	tpl.compile();

	this.items = [new Ext.Panel({
	    autoScroll: true,
	    html: '<div style="padding: 5px;">' + tpl.applyTemplate(tplData) + '</div>'
	})];

	jp.Window.About.superclass.initComponent.call(this);

	if (Ext.isAir) {
	    this.addListener("afterrender", function () {
		Ext.select("a.link-to-browser").on("click", function (e, el) {
		    var urlReq = new air.URLRequest(el.href);
		    air.navigateToURL(urlReq);
		    return false;
		});
	    });
	}
    }
});

Ext.reg('jp.Window.About', jp.Window.About);