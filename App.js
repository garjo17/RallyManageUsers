Ext.define('CustomApp', { extend: 'Rally.app.App', componentCls: 'app',

        launch: function() {
        console.log("Vamos para Bingo!!");
        this.loadIterations(); 
        },

loadIterations: function() {
             
        var currentDate = new Date();
		var currentDate6mLess = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
		console.log('Current Date menso 6 meses ',currentDate6mLess);
		console.log('Current Date ',currentDate);
      
		
        var RallyLazyUsers = Ext.create('Rally.data.wsapi.Store', {
            model: 'User',
            autoLoad: true,
            fetch: ['c_EmployeeId', 'UserName', 'LastActiveDate','EmailAddress'],
            filters:[
                {
                        property: 'LastActiveDate',
                        operator: '<=',
                        value: currentDate6mLess
                }
            ],
            sorters: [
                {property: '', direction: 'ASC'}
            ],
            listeners: {
                load: function(store, data, success) {
                    Ext.Array.each(data, function(record) {
                        console.info('ID: ', record.get('c_EmployeeId'), 
                            '  Name: ', record.get('UserName'),                             
                            '  LastActiveDate: ', record.get('LastActiveDate'), 
                            '  EmailAddress: ', record.get('EmailAddress'));
                    });
					  }, scope: this
            }
        });        
}    
});