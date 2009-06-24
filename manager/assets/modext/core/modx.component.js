MODx.Component = function(config) {
    config = config || {};
    MODx.Component.superclass.constructor.call(this,config);
    this.config = config;
    
    this._loadForm();
    if (this.config.tabs) {
        this._loadTabs();
    }
    this._loadComponents();
    this._loadActionButtons();
};
Ext.extend(MODx.Component,Ext.Component,{
    fields: {}
    
	,_loadForm: function() {
		if (!this.config.form) { return false; }
        this.form = new Ext.form.BasicForm(Ext.get(this.config.form),{ errorReader : MODx.util.JSONReader });
        
        if (this.config.fields) {
        	for (var i in this.config.fields) {
               if (this.config.fields.hasOwnProperty(i)) {
            	   var f = this.config.fields[i];
                   if (f.xtype) {
                    f = Ext.ComponentMgr.create(f);
                   }
            	   this.fields[i] = f;
            	   this.form.add(f);
               }
        	}
        }
        this.form.render();
    }
    
	,_loadActionButtons: function() {
		if (!this.config.buttons) { return false; }        
        this.ab = MODx.load({
            xtype: 'modx-actionbuttons'
            ,form: this.form || null
            ,formpanel: this.config.formpanel || null
            ,actions: this.config.actions || null
            ,items: this.config.buttons || []
            ,loadStay: this.config.loadStay || false
        });
	}
	
	,_loadTabs: function() {
		if (!this.config.tabs) { return false; }
        var o = this.config.tabOptions || {};
        Ext.applyIf(o,{
            xtype: 'modx-tabs'
            ,renderTo: this.config.tabs_div || 'tabs_div'
            ,items: this.config.tabs
        });
        MODx.load(o);
	}
    
    ,_loadComponents: function() {
        if (!this.config.components) { return false; }
        var l = this.config.components.length;
        for (var i=0;i<l;i=i+1) {
            Ext.ComponentMgr.create(this.config.components[i]);
        }
    }	
});
Ext.reg('modx-component',MODx.Component);