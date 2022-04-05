Ext.define('CustomApp', { extend: 'Rally.app.App', componentCls: 'app',

        launch: function() {
        console.log("Vamos para Bingo!!");
        this._loadRallyLazyUsers(); 
        },

_loadRallyLazyUsers: function() {
             
        var currentDate = new Date();
		var currentDate6mLess = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
		console.log('Current Date menso 6 meses ',currentDate6mLess);
		console.log('Current Date ',currentDate);
      
		
        var RallyLazyUsers = Ext.create('Rally.data.wsapi.Store', {
            model: 'User',
            autoLoad: true,
            fetch: ['c_EmployeeId', 'UserName', 'LastActiveDate','EmailAddress','Disabled'],
            filters:[
                {
                        property: 'LastActiveDate',
                        operator: '<=',
                        value: currentDate6mLess
                },
				{
                        property: 'Disabled',
                        operator: '=',
                        value: false
                },
            ],
            sorters: [
                {property: 'LastActiveDate', direction: 'ASC'}
            ],
            listeners: {
                load: function(store, data, success) {
                    /*Ext.Array.each(data, function(record) {
                        console.info('ID: ', record.get('c_EmployeeId'), 
                            '  Name: ', record.get('UserName'),                             
                            '  LastActiveDate: ', record.get('LastActiveDate'), 
                            '  EmailAddress: ', record.get('EmailAddress'),
							'  Disabled: ', record.get('Disabled'));
                    });*/
					this._loadGrid (RallyLazyUsers);
					  },
				 scope: this
            }
        });        
} ,
_loadGrid: function(myStoryStore) {
	
		var myGrid = Ext.create('Rally.ui.grid.Grid', {
			store: myStoryStore,
			columnCfgs:  ['c_EmployeeId', 'UserName', 'LastActiveDate','EmailAddress','Disabled']
		});
		console.log('myGrid', myGrid);
		this.add(myGrid);
		console.log('What is this: ', this);
	},   
});