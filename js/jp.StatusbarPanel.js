jp.StatusbarPanel = Ext.extend(Ext.Panel, {
    title: '',
    html: '&nbsp;',
    region: 'south',
    cls: 'main-bottom-panel',
    sb: null,
    initComponent: function() {
	this.bbar = {
	    xtype: 'statusbar',
	    statusAlign: 'left',
	    autoClear: 2500,
	    defaultText: '&nbsp;',
	    text: '&nbsp;',
	    iconCls: '',
	    defaultIconCls: '',
	    items: [
	    '&nbsp;',
	    '->',
	    '&nbsp;'
	    ]
	};

	jp.StatusbarPanel.superclass.initComponent.call(this);

	this.sb = this.getBottomToolbar();
    },

    setStatus: function (opt) {
	if ( typeof(opt) != "object" ) {
	    opt = {
		text: opt,
		clear: true
	    };
	}

	this.sb.setStatus(opt);
    },

    setStatusRight: function (text) {
	this.getBottomToolbar().items.itemAt(2).setText( text );
    },

    clearStatus: function (opt) {
	if (opt == null) {
	    opt = {
		anim: true
	    };
	}
	
	this.sb.clearStatus( opt );
    },

    clearStatusRight: function () {
	this.getBottomToolbar().items.itemAt(2).setText( "&nbsp;" );
    }
});

Ext.reg('jp.StatusbarPanel', jp.StatusbarPanel);