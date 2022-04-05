Ext.define('CustomApp', { extend: 'Rally.app.App', componentCls: 'app',

        launch: function() {

        this.loadIterations(); 
        },

loadIterations: function() {
        //var millisecondsInDay = 86400000;            
        var currentDate = new Date();
		var fechamenos6meses = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
		console.log('Current Date menso 6 meses ',fechamenos6meses);
		console.log('Current Date ',currentDate);
      //  var startDate = new Date(currentDate - millisecondsInDay*90);
       // var startDateUTC = startDate.toISOString();
      //  console.log('startDateUTC',startDateUTC);
      //  console.log('startDate',startDate);
		
        var iterations = Ext.create('Rally.data.WsapiDataStore', {
            model: 'User',
            autoLoad: true,
            fetch: ['c_EmployeeId', 'UserName', 'LastActiveDate','EmailAddress'],
            filters:[
                {
                        property: 'LastActiveDate',
                        operator: '<=',
                        value: fechamenos6meses
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