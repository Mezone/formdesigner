var FieldView = Backbone.View.extend({
	tagName: 'div',
	className: 'cell',
	template: read_tmpl('#tmpl-text'),

	events: {
		'change input': "onChanged"
	},
	/*
	 * name changed, 需要改变input&label的id
	 * 改变input中的name
	 * */
	initialize: function() {
		this.model.bind('change:id change:name', this.nameUpdated, this);		
		this.model.bind('change:value', this.valueUpdated, this);
	},
	render: function() {
		var json = this.model.toJSON();
		var html = this.template(json);
	
		this.$el.html(html);
		this.cellBody =  this.$el;
		this.label = this.$('label');
		this.inputTag =  this.$('input');

		this.onRender();

		return this;
	},
	getTemplate: function() {
		var el = this.render().el;
		return $('<p></p>').append(el).html();
	},
	nameUpdated: function() {
		var id = this.model.get('id');
		var name = this.model.getName();

		this.label.attr('for', id);

		this.inputTag.attr('id', id)
			.attr('name', name);
	},
	valueUpdated:	function() {
		var value = this.model.getValue();
		this.inputTag.val(value);
	},
	onChanged: function(e) {
		var val = this.inputTag.val();	

		this.model.set({
				value: val
			}, {
				silent: true
			});
	},
	onRender: function() {
	}
});

Fields.reg('text', FieldView);


var SelectFieldView = FieldView.extend({
	template: read_tmpl('#tmpl-select'),
	events: {
		'change select': "onChanged"	
	},
	onRender: function() {
		this.inputTag =  this.$('select');
		this.inputTag.select2({
			width: 'resolve'
		});
	}
});

Fields.reg('select', SelectFieldView);


var DateFieldView = FieldView.extend({
	className: 'cell input-append controls bootstrap-timepicker-component',
	template: read_tmpl('#tmpl-date'),
	events: {
		'changeDate input': "onChanged"
	},
	onRender: function() {
		this.inputTag.datepicker({
			showMeridian: false,
			showSeconds: true,
			secondStep: 30,
			defaultTime: 'value'
		});
	},
	remove: function() {
		this.inputTag.datepicker('destroy');
		FieldView.prototype.remove.call(this); 
	}
});

Fields.reg('date', DateFieldView);
