Ext.define('Rally.example.FilterableBoard', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc3/doc/">App SDK 2.0rc3 Docs</a>'},
    launch: function() {
        this.add({
            xtype: 'rallyusersearchcombobox',
            fieldLabel: 'Filter by Owner:',
            project: this.getContext().getProject(),
            value: Rally.util.Ref.getRelativeUri(this.getContext().getUser()),
            listeners: {
                            select: this._onSelect,
                            ready: this._onLoad,
                            scope: this
            }
        })
    },
    _onLoad: function(){
        this.add({
            xtype:'rallycardboard',
            types: ['Task'],
            attribute: 'State',
            context: this.getContext(),
            cardConfig:{
                editable: true,
                enableRanking: true,
                fields: ['ToDo', 'Estimate'],
            },
            storeConfig: {
                filters: [this._getOwnerFilter()]
            }
        })
    },
    
    _getOwnerFilter: function(){
        var userCombo = this.down('rallyusersearchcombobox');
        return {
            property: 'Owner',
            value: userCombo.getValue()
        }
    },
    
    _onSelect: function(){
        var board = this.down('rallycardboard');
        board.refresh({
            storeConfig:{
                filters: [this._getOwnerFilter()]
            }
        })
        
    }
});
