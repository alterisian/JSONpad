jp.Window.XmlConvert.form.TabConvertText = Ext.extend(Ext.ux.panel.CodeMirror, {
    title: 'From text',
    errorTooltip: null,
    initComponent: function() {
	this.codeMirrorInitCallback = this.onCodeMirrorInit;

	this.tbar = {
	    xtype: 'toolbar',
	    items: [{
		text: 'copy',
		scale: 'small',
		tooltip: (Ext.isAir || Ext.isIE ? 'Copy XML string' : 'Sorry, not for this browser'),
		disabled: (!Ext.isAir && !Ext.isIE)
	    },{
		text: 'paste',
		scale: 'small',
		tooltip: (Ext.isAir || Ext.isIE ? 'Paste XML string' : 'Sorry, not for this browser'),
		disabled: (!Ext.isAir && !Ext.isIE)
	    },'-',{
		text: 'Syntax Highlighting',
		scale: 'small',
		tooltip: 'Turn on/off syntax highlighting',
		enableToggle: true,
		pressed: true,
		handler: this.actionToolsToggleCodemirror,
		scope: this
	    }]
	};

	var codeMirrorCfg = {
	    listeners: {
		render: function() {
		    this.doLayout();
		},
		resize: function (cmp, adjWidth, adjHeight, rawWidth, rawHeight) {
		    this.getEl().select('.CodeMirror-wrapping').setWidth( (adjWidth - 2) );
		},
		scope: this
	    },
	    autoScroll:true,
	    bodyStyle:'background-color:white',

	    sourceCode: '',
	    parser: 'xml',
	    codeMirror: {
		height: '100%',
		width: '100%',
		lineNumbers: true
	    }
	};

	Ext.apply(this, codeMirrorCfg);


	jp.Window.XmlConvert.form.TabConvertText.superclass.initComponent.call(this);
    },

    onCodeMirrorInit: function () {
	this.convertJsonData(this);
	var prepareWidth = (this.getWidth() - Ext.get(this.getEl().query('.CodeMirror-wrapping > div')[0]).getWidth());
	this.fireEvent("resize", this, prepareWidth, this.getHeight());
    },

    actionToolsToggleCodemirror: function (b, e) {
	var pressed = b.pressed;
	if (pressed == true) this.showCodeMirror();
	else this.hideCodeMirror();
    },

    convertJsonData: function (me) {
	var stringInputField = me.findParentByType("jp.Window.XmlConvert").jpEditor.tabPanel.getCodemirror();
	var value = stringInputField.getValue();

	if (value.trim() != "") {
	    var json = jp.json.parse( value.trim() );

	    if (stringInputField.validateJson(json, true, false)) {
		var xmlData = xmlJsonClass.json2xml(json, "  ");

		var xmlDataArr = xmlData.split("\n");

		for (var i = 0; i < xmlDataArr.length; i++)
		    xmlDataArr[i] = (i < xmlDataArr.length-1 ? "  " : "") + xmlDataArr[i];

		xmlData = "<root>\n"+xmlDataArr.join("\n")+"</root>";

		me.setValue(xmlData);
	    } else {
		me.setValue("");
	    }
	}
    }
});

Ext.reg('jp.Window.XmlConvert.form.TabConvertText', jp.Window.XmlConvert.form.TabConvertText);