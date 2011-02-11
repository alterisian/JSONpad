/**
 * An Application
 *
 * @author    Christopher Soellinger (admin@jsonpad.com)
 * @date      04/01/2010
 *
 * @license   New BSD License / Details at NewBSD-License.txt
 */

/*global Ext, JP */


Ext.BLANK_IMAGE_URL = 'extjs/' + (Ext.isAir ? 'air' : 'web') + '/resources/images/default/s.gif';
Ext.ns('jp', 'jp.ActionPanel', 'jp.TabPanel', 'jp.Window');

jp.App = (function() {
    return {
	version: '',
	config: {
	    registerJsonFiles: false,
	    syntaxHighlightOnLoad: true,
	    checkForUpdatesOnLoad: true,
	    jsonValidateLevel: 1
	},

	init: function() {
	    Ext.QuickTips.init();
	    Ext.state.Manager.setProvider(jp.cookie);

	    this.setJsonPadVersion();
	    this.setJsonPadConfig(null);

	    new jp.Editor();
	},

	setJsonPadVersion: function () {
	    var version = "";

	    if (Ext.isAir) {

	    } else {
		var xmlhttp = null;
		var xmlDoc = null;

		if (window.XMLHttpRequest) {
		    xmlhttp = new XMLHttpRequest();
		} else {
		    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.open("GET","application.xml",false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;

		version = xmlDoc.getElementsByTagName("version")[0].firstChild.nodeValue;
	    }

	    this.version = version;
	},

	setJsonPadConfig: function (config) {
	    if (Ext.isAir) {
		//@todo AIR | Get config from preferences.xml
	    } else {
		if (config != null) {
		    this.config = config;
		    this.setCookiesByConfig();
		}
		this.getConfigByCookies();
	    }
	},

	getConfigByCookies: function () {
	    if ( jp.cookie.get("JSONpadConfig") == null ) {
		jp.cookie.set("JSONpadConfig", this.config);
	    } else {
		this.config = jp.cookie.get("JSONpadConfig");
	    }
	},

	setCookiesByConfig: function () {
	    jp.cookie.set("JSONpadConfig", this.config);
	}
    }
})();

Ext.apply(Ext.form.VTypes, {
    urlOnly: function(value, field) {
	this.urlOnlyText = 'String have to be an url';
	return jp.util.isHttpUrl(value);
    },

    urlOnlyText: 'String have to be an url'
});

Ext.onReady(jp.App.init,  jp.App);