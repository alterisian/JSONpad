Ext.ns('jp');

jp.ActionPanel.MainBar = Ext.extend(Ext.Toolbar, {
    windowAbout: null,
    windowSettings: null,
    //id: 'JsonStringForm_tbar',
    initComponent: function() {
	this.items = [
	this.getFileMenu(),
	this.getEditMenu(),
	this.getHelpMenu()
	];
	
	jp.ActionPanel.MainBar.superclass.initComponent.call(this);
    },

    onMenuMouseover: function (menu, e, menuItem) {
	var statuspanel = this.findParentByType("jp.Editor").statusPanel;
	
	if (menuItem) {
	    statuspanel.setStatus({
		text: menuItem.statusBarTip,
		clear: false
	    });
	} else {
	    this.onMenuMouseout();
	}
    },
    onMenuMouseout: function () {
	var statuspanel = this.findParentByType("jp.Editor").statusPanel;
	statuspanel.setStatus({
	    text: "",
	    clear: false
	});
    },

    getMenuListeners: function () {
	return {
	    'mouseover': this.onMenuMouseover,
	    'mouseout': this.onMenuMouseout,
	    scope: this
	};
    },

    getFileMenu: function () {
	debug.trace(window.opener);
	return {
	    text: 'File',
	    menu: {
		items: [
		{
		    text: 'New document',
		    statusBarTip: 'Open new editor tab',
		    handler: this.actionFileNewTab
		},
		{
		    text: 'Close tab',
		    statusBarTip: 'Close active tab',
		    handler: this.actionFileCloseTab
		},
		'-',
		{
		    text: 'Save as file..',
		    statusBarTip: 'Save the JSON string as a file',
		    handler: this.actionFileSaveJson
		},
		{
		    text: 'Quit',
		    statusBarTip: 'Quit the application',
		    handler: this.actionFileQuitApplication,
		    disabled: (window.opener == null)
		}
		],
		listeners: this.getMenuListeners()
	    }
	};
    },

    getEditMenu: function () {
	return {
	    text: 'Edit',
	    menu: {
		items: [
		{
		    text: 'Import JSON data',
		    statusBarTip: 'Import JSON data from an url or a local file',
		    handler: this.actionEditImportJson
		},
		{
		    text: 'XML2JSON Converter',
		    statusBarTip: 'Convert XML data to a JSON string and insert it in the textarea',
		    handler: this.actionEditXmlConvert
		},
		'-',
		{
		    text: 'Copy JSON string',
		    statusBarTip: 'Copy JSON string to clipboard',
		    disabled: (!Ext.isAir && !Ext.isIE)
		},
		{
		    text: 'Paste JSON string',
		    statusBarTip: 'Paste JSON string from cliboard',
		    disabled: (!Ext.isAir && !Ext.isIE)
		}/*,
		'-',
		{
		    text: 'Select JSON string',
		    statusBarTip: 'Select JSON string from textarea'
		}*/
		],
		listeners: this.getMenuListeners()
	    }
	};
    },

    getHelpMenu: function () {
	return {
	    text: 'Help',
	    menu: {
		items: [
		{
		    text: 'Settings',
		    statusBarTip: 'Set application default values',
		    handler: this.actionHelpSettings
		},{
		    text: 'Check for updates',
		    statusBarTip: 'Check if updates available',
		    hidden: (!Ext.isAir)
		},'-',{
		    text: 'About...',
		    statusBarTip: 'About the application',
		    handler: this.actionHelpAbout
		}
		],
		listeners: this.getMenuListeners()
	    }
	};
    },

    actionFileNewTab: function () {
	this.findParentByType("jp.Editor").tabPanel.addEditorTab();
    },

    actionFileCloseTab: function () {
	this.findParentByType("jp.Editor").tabPanel.closeActiveTab();
    },

    actionFileSaveJson: function () {
	var codemirror = this.findParentByType("jp.Editor").tabPanel.getCodemirror();
	var jsonData = jp.url.encode(codemirror.getValue());
	window.location.href = 'php/download.php?jsonData=' + jsonData;
    },

    actionFileQuitApplication: function () {
	if (Ext.isAir) {
	//@todo AIR | Close application
	} else {
	    parent.close();
	}
    },

    actionEditImportJson: function () {
	this.findParentByType("jp.Editor").actionPanel.getTopToolbar().items.itemAt(1).actionToolsImportJson();
    },

    actionEditXmlConvert: function () {
	this.findParentByType("jp.Editor").actionPanel.getTopToolbar().items.itemAt(1).actionToolsXmlConvert();
    },

    actionHelpSettings: function () {
	if (!this.windowSettings) this.windowSettings = new jp.Window.Settings();
	this.windowSettings.show();
    },

    actionHelpAbout: function () {
	if (!this.windowAbout) this.windowAbout = new jp.Window.About();
	this.windowAbout.show();
    }
});

Ext.reg('jp.ActionPanel.MainBar', jp.ActionPanel.MainBar);