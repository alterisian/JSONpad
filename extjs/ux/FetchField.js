/*
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.form');

Ext.ux.form.FetchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
        Ext.ux.form.FetchField.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger1Click();
            }
        }, this);

	this.on('blur', this.onBlur);

	this.addEvents('fetch');
    },

    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-fetch-clear-trigger',
    trigger2Class:'x-form-fetch-trigger',
    width:180,

    onTrigger1Click : function(){
	this.setValue('');
        /*if(this.hasFetch){
            this.el.dom.value = '';
            this.triggers[0].hide();
	    this.triggers[1].show();
            this.hasSearch = false;
        }*/
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();

	this.fireEvent('fetch', this, v);
    }
});
Ext.reg('ux-fetchfield', Ext.ux.form.FetchField);