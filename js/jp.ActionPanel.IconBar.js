Ext.ns('jp');

jp.ActionPanel.IconBar = Ext.extend(Ext.Toolbar, {
    jsonExamples: [
    '{\n\t"Key": "value"\n}',
    '{\n\t"CreditCard" : "MasterCard",\n\t"Number" : "1234-5678-9012-3456",\n\t"Holder" : {\n\t\t"Name" : "Rich",\n\t\t"firstName" : "Rainer",\n\t\t"sex" : "male",\n\t\t"Likes" : [\n\t\t\t"Riding",\n\t\t\t"Swimming",\n\t\t\t"Reading"\n\t\t],\n\t\t"Age" : null\n\t},\n\t"Covering" : 2000000,\n\t"Currency" : "EURO"\n}',
    '{\n\t"web-app" : {\n\t\t"servlet" : [\n\t\t\t{\n\t\t\t\t"servlet-name" : "cofaxCDS",\n\t\t\t\t"servlet-class" : "org.cofax.cds.CDSServlet",\n\t\t\t\t"init-param" : {\n\t\t\t\t\t"configGlossary:installationAt" : "Philadelphia, PA",\n\t\t\t\t\t"configGlossary:adminEmail" : "ksm@pobox.com",\n\t\t\t\t\t"configGlossary:poweredBy" : "Cofax",\n\t\t\t\t\t"configGlossary:poweredByIcon" : "/images/cofax.gif",\n\t\t\t\t\t"configGlossary:staticPath" : "/content/static",\n\t\t\t\t\t"templateProcessorClass" : "org.cofax.WysiwygTemplate",\n\t\t\t\t\t"templateLoaderClass" : "org.cofax.FilesTemplateLoader",\n\t\t\t\t\t"templatePath" : "templates",\n\t\t\t\t\t"templateOverridePath" : "",\n\t\t\t\t\t"defaultListTemplate" : "listTemplate.htm",\n\t\t\t\t\t"defaultFileTemplate" : "articleTemplate.htm",\n\t\t\t\t\t"useJSP" : false,\n\t\t\t\t\t"jspListTemplate" : "listTemplate.jsp",\n\t\t\t\t\t"jspFileTemplate" : "articleTemplate.jsp",\n\t\t\t\t\t"cachePackageTagsTrack" : 200,\n\t\t\t\t\t"cachePackageTagsStore" : 200,\n\t\t\t\t\t"cachePackageTagsRefresh" : 60,\n\t\t\t\t\t"cacheTemplatesTrack" : 100,\n\t\t\t\t\t"cacheTemplatesStore" : 50,\n\t\t\t\t\t"cacheTemplatesRefresh" : 15,\n\t\t\t\t\t"cachePagesTrack" : 200,\n\t\t\t\t\t"cachePagesStore" : 100,\n\t\t\t\t\t"cachePagesRefresh" : 10,\n\t\t\t\t\t"cachePagesDirtyRead" : 10,\n\t\t\t\t\t"searchEngineListTemplate" : "forSearchEnginesList.htm",\n\t\t\t\t\t"searchEngineFileTemplate" : "forSearchEngines.htm",\n\t\t\t\t\t"searchEngineRobotsDb" : "WEB-INF/robots.db",\n\t\t\t\t\t"useDataStore" : true,\n\t\t\t\t\t"dataStoreClass" : "org.cofax.SqlDataStore",\n\t\t\t\t\t"redirectionClass" : "org.cofax.SqlRedirection",\n\t\t\t\t\t"dataStoreName" : "cofax",\n\t\t\t\t\t"dataStoreDriver" : "com.microsoft.jdbc.sqlserver.SQLServerDriver",\n\t\t\t\t\t"dataStoreUrl" : "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",\n\t\t\t\t\t"dataStoreUser" : "sa",\n\t\t\t\t\t"dataStorePassword" : "dataStoreTestQuery",\n\t\t\t\t\t"dataStoreTestQuery" : "SET NOCOUNT ON;select test=\'test\';",\n\t\t\t\t\t"dataStoreLogFile" : "/usr/local/tomcat/logs/datastore.log",\n\t\t\t\t\t"dataStoreInitConns" : 10,\n\t\t\t\t\t"dataStoreMaxConns" : 100,\n\t\t\t\t\t"dataStoreConnUsageLimit" : 100,\n\t\t\t\t\t"dataStoreLogLevel" : "debug",\n\t\t\t\t\t"maxUrlLength" : 500\n\t\t\t\t}\n\t\t\t}\n\t\t]\n\t}\n}'
    ],

    //id: 'JPtopIconBar',
    initComponent: function() {
	this.items = [
	this.buildTreeIcons(),
	this.buildFormatIcons(),
	this.buildClipboardIcons(),
	this.buildToolIcons(),
	'->',
	this.buildExamples()
	];
	jp.ActionPanel.IconBar.superclass.initComponent.call(this);
    },

    buildTreeIcons: function () {
	return {
	    xtype: 'buttongroup',
	    title: 'Tree',
	    columns: 2,
	    items: [
	    {
		iconCls: 'icon_loadToTree',
		scale: 'medium',
		tooltip: 'Load JSON String to tree',
		handler: this.actionLoadJsonToTree
	    },
	    {
		iconCls: 'icon_loadFromTree',
		tooltip: 'Load data from tree as JSON string',
		scale: 'medium'
	    }
	    ]
	};
    },

    buildFormatIcons: function () {
	return {
	    xtype: 'buttongroup',
	    title: 'Format',
	    columns: 2,
	    items: [
	    {
		iconCls: 'icon_format',
		scale: 'medium',
		tooltip: 'Format JSON string',
		handler: this.actionFormatIndentJson
	    },
	    {
		iconCls: 'icon_compress',
		scale: 'medium',
		tooltip: 'Compress JSON string',
		handler: this.actionFormatCompressJson
	    }
	    ]
	};
    },

    buildClipboardIcons: function () {
	return {
	    xtype: 'buttongroup',
	    title: 'Clipboard',
	    columns: 2,
	    items: [
	    {
		iconCls: 'icon_copy',
		scale: 'medium',
		tooltip: (Ext.isAir || Ext.isIE ? 'Copy JSON into clipboard' : 'Sorry, not for this browser'),
		disabled: (!Ext.isAir && !Ext.isIE)
	    },
	    {
		iconCls: 'icon_paste',
		scale: 'medium',
		tooltip: (Ext.isAir || Ext.isIE ? 'Paste JSON from clipboard' : 'Sorry, not for this browser'),
		disabled: (!Ext.isAir && !Ext.isIE)
	    }
	    ]
	};
    },

    buildToolIcons: function () {
	return {
	    xtype: 'buttongroup',
	    title: 'Tools',
	    columns: 4,
	    items: [
	    {
		iconCls: 'icon_loadFromUrl',
		scale: 'medium',
		tooltip: 'Load JSON string by an url',
		handler: this.actionToolsImportJson
	    },
	    {
		iconCls: 'icon_convertXml',
		scale: 'medium',
		tooltip: 'Convert XML data to JSON',
		handler: this.actionToolsXmlConvert
	    },
	    {
		iconCls: 'icon_validate',
		scale: 'medium',
		tooltip: 'Validate JSON string',
		handler: this.actionToolsValidateJson
	    },
	    {
		iconCls: 'icon_highlight',
		id: 'BtnJsonStringSyntaxHighlighting',
		scale: 'medium',
		tooltip: 'Turn on/off syntax highlighting',
		enableToggle: true,
		pressed: true,
		handler: this.actionToolsToggleCodemirror
	    }
	    ]
	};
    },

    buildExamples: function () {
	return {
	    text: 'Examples',
	    scale: 'large',
	    tooltip: 'Insert a JSON example',
	    arrowAlign: 'left',
	    menu: {
		items: [
		{
		    text: 'Example 1',
		    example: this.jsonExamples[0],
		    handler: this.actionInsertExample
		},
		{
		    text: 'Example 2',
		    example: this.jsonExamples[1],
		    handler: this.actionInsertExample
		},
		{
		    text: 'Example 3',
		    example: this.jsonExamples[2],
		    handler: this.actionInsertExample
		}
		]
	    }
	};
    },

    actionLoadJsonToTree: function () {
	var tabpanel = this.findParentByType("jp.Editor").tabPanel;
	var treepanel = tabpanel.getActiveTab().treePanel;
	var codeMirror = tabpanel.getCodemirror();
	var value = codeMirror.getValue().trim();
	var statuspanel = this.findParentByType("jp.Editor").statusPanel;

	if (value == "") {
	    statuspanel.setStatus({
		text: 'Empty JSON string',
		iconCls: 'x-status-valid',
		clear: true
	    });
	} else {
	    var json = jp.json.parse(value);

	    if ( codeMirror.validateJson(json, true, false) ) {

		//var buildObjectForTree = ;

		treepanel.setNodesByJson(json);

		statuspanel.setStatus({
		    text: 'Tree succesfully build from JSON data',
		    iconCls: 'x-status-valid',
		    clear: true
		});
	    /*

		

		var editKeyForm = this.findParentByType("viewport").findByType("jp_main_center_ediTreeForm_tabs_edit")[0];

		editKeyForm.formUnsaved = false;

		tree.getSelectionModel().select( tree.getRootNode() );

		JP.util.setJPStatus({
		    text: 'Made succesfully a tree with the JSON string',
		    iconCls: 'x-status-valid',
		    clear: true
		}, 'left');*/
	    }
	}
    },

    actionFormatIndentJson: function () {
	var tabpanel = this.findParentByType("jp.Editor").tabPanel;
	var codeMirror = tabpanel.getCodemirror();
	var statuspanel = this.findParentByType("jp.Editor").statusPanel;

	var obj = jp.json.parse(codeMirror.getValue(), true);

	if ( codeMirror.validateJson(obj, true, false) ) {
	    codeMirror.setValue( JSON.stringify(obj, null, '  ') );
	    statuspanel.setStatus({
		text: 'Formatted JSON string succesfully',
		iconCls: 'x-status-valid',
		clear: true
	    });
	}
    },

    actionFormatCompressJson: function () {
	var codeMirror = this.findParentByType("jp.Editor").tabPanel.getCodemirror();
	var statuspanel = this.findParentByType("jp.Editor").statusPanel;
	var stringCompressed = jsmin("", codeMirror.getValue(), 3);
	codeMirror.setValue( stringCompressed.trim() );

	statuspanel.setStatus({
	    text: 'Compressed JSON string succesfully',
	    iconCls: 'x-status-valid',
	    clear: true
	});
    },

    actionToolsImportJson: function () {
	new jp.Window.ImportJson({
	    jpEditor: this.findParentByType("jp.Editor")
	}).show();
    },

    actionToolsXmlConvert: function () {
	new jp.Window.XmlConvert({
	    jpEditor: this.findParentByType("jp.Editor")
	}).show();
    },

    actionToolsValidateJson: function () {
	var codeMirror = this.findParentByType("jp.Editor").tabPanel.getCodemirror();
	//var statuspanel = this.findParentByType("jp.Editor").statusPanel;

	var obj = jp.json.parse(codeMirror.getValue(), true);

	codeMirror.validateJson(obj, false, true);
    },

    actionToolsToggleCodemirror: function (b, e) {
	var codeMirror = this.findParentByType("jp.Editor").tabPanel.getCodemirror();
	var pressed = b.pressed;
	if (pressed == true) codeMirror.showCodeMirror();
	else codeMirror.hideCodeMirror();
    },

    actionInsertExample: function (b, e) {
	var codemirror = this.findParentByType("jp.Editor").tabPanel.getCodemirror();
	codemirror.setValue( b.example );
    }

    
});

Ext.reg('jp.ActionPanel.IconBar', jp.ActionPanel.IconBar);