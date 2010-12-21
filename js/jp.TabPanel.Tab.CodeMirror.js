Ext.ns('jp');

jp.TabPanel.Tab.CodeMirror = Ext.extend(Ext.ux.panel.CodeMirror, {
    title: '',
    region: 'north',
    split: true,
    height: 200,
    errorTooltip: null,
    //layout: 'form',
    initComponent: function() {
	this.bbar = {
	    xtype: 'statusbar',
	    statusAlign: 'left',
	    autoClear: 2500,
	    defaultText: '&nbsp;',
	    defaultIconCls: '',
	    text: '&nbsp;',
	    iconCls: ''
	};

	this.codeMirrorInitCallback = this.onCodeMirrorInit;

	var codeMirrorCfg = {
	    listeners: {
		render: function(){
		    this.doLayout();
		},
		resize: function (cmp, adjWidth, adjHeight, rawWidth, rawHeight) {
		    this.getEl().select('.CodeMirror-wrapping').setWidth( (adjWidth - 2) );
		},
		scope: this
	    },
	    autoScroll:true,
	    bodyStyle:'background-color:white',
	    sourceCode: '{\n}',
	    parser: 'js',
	    codeMirror: {
		width: '100%',
		height: '100%',
		lineNumbers: true
	    }
	};

	Ext.apply(this, codeMirrorCfg);

	jp.TabPanel.Tab.CodeMirror.superclass.initComponent.call(this);
    },

    onCodeMirrorInit: function () {
	if (!jp.App.config.syntaxHighlightOnLoad) this.hideCodeMirror();
	
	var prepareWidth = (this.getWidth() - Ext.get(this.getEl().query('.CodeMirror-wrapping > div')[0]).getWidth());
	this.fireEvent("resize", this, prepareWidth, this.getHeight());
    },

    validateJson: function (obj, clear, successMsg) {
	var codeMirrorStatusbar = this.getBottomToolbar();

	if (!obj.errorObject) {
	    if (clear) {
		codeMirrorStatusbar.clearStatus({
		    anim: true
		});
	    }

	    if (successMsg === true) {
		codeMirrorStatusbar.setStatus({
		    text: 'Valid JSON string',
		    iconCls: 'x-status-valid',
		    clear: true
		});
	    }

	    return true;
	} else {
	    
	    codeMirrorStatusbar.setStatus({
		text: obj.errorObject.length + ' error/s in JSON string. Click for details...',
		iconCls: 'x-status-error',
		clear: false
	    });

	    var msg = "";
	    for (var i = 0; i < obj.errorObject.length; i++) {
		msg += '<li style="list-style-type:disc; margin-left: 18px;">' + obj.errorObject[i].msg + '</li>';

		if (obj.errorObject[i].evi)
		    msg += '<li style="list-style-type:none; padding-bottom: 2px; margin-left: 6px; font-family: monospace;">-&gt; ' + obj.errorObject[i].evi.trim() + '</li>';
	    }

	    var errorContainer = codeMirrorStatusbar.getEl().child(".x-status-error");

	    var errorTitle = '<b>' + obj.errorObject.length + ' error/s found</b>';
	    var errorMessage = '<ul>' + msg + '</ul>';
	    
	    if (this.errorTooltip != null) {
		this.errorTooltip.destroy();
	    }

	    this.errorTooltip = new Ext.ToolTip({
		title: errorTitle,
		target: errorContainer,
		anchor: 'top',
		html: errorMessage,
		width: 400,
		autoHide: false,
		closable: true,
		showDelay: 1,
		initTarget : function(target){
		    var t;
		    if((t = Ext.get(target))){
			if(this.target){
			    var tg = Ext.get(this.target);
			    this.mun(tg, 'click', this.onTargetOver, this);
			    this.mun(tg, 'mousemove', this.onMouseMove, this);
			}
			this.mon(t, {
			    click: this.onTargetOver,
			    mousemove: this.onMouseMove,
			    scope: this
			});
			this.target = t;
		    }
		    if(this.anchor){
			this.anchorTarget = this.target;
		    }
		}
	    });

	    return false;
	}
    }
});

Ext.reg('jp.TabPanel.Tab.CodeMirror', jp.TabPanel.Tab.CodeMirror);