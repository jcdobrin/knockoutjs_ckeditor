
ko.bindingHandlers.ckeditor = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		// This will be called when the binding is first applied to an element
		// Set up any initial state, event handlers, etc. here
		var default_options = {
			toolbar:null, // toolbar group
			height:20,
			width:275,
			toolbarLocation:'top',
			removePlugins:'', //comma separated list of plugins to  remove
			resize_enabled:false,
			extraPlugins:'',//comma separated list of plugins to include
			keystrokes:[
			[ 13, 'enter'], //command to execute when pressing enter key
			[ CKEDITOR.SHIFT + 13, 'enter' ],
			[ CKEDITOR.CTRL + 90, 'undo' ],
			[ CKEDITOR.CTRL + 89, 'redo' ],
			[ CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, 'redo' ],
			[ CKEDITOR.CTRL + 66, 'bold' ],
			[ CKEDITOR.CTRL + 73, 'italic' ],
			[ CKEDITOR.CTRL + 85 , 'underline' ],
			[ CKEDITOR.ALT + 109, 'toolbarCollapse' ]
			],
		};
		var options = $.extend( {}, default_options, valueAccessor())
		options['on'] = {};
		options['on']['instanceReady'] = function(e) {
			e.editor.on('resize',function(reEvent){
				var top = parent.body || parent;
				//code to execute on resize
			});

			e.editor.on('change', function () {
				var element    = $(e.editor.editable().$);
				var bodyHeight = element.height();
				var parent_height = element.parent()[0].clientHeight;

				// Hiding the scroll until it reach the limit
				// '80' is about 4 lines of text
				if( bodyHeight < 80){
					element.css('overflow-y','hidden');
					if(bodyHeight > parent_height){
						e.editor.resize('100%', bodyHeight,true);
					}
				}else{
					// Showing the scroll bar after it reach the 80 limit
					element.css('overflow-y','auto');
				}
			});

			setTimeout(function() {
				$(e.editor.editable().$).css({margin:0})
				$(e.editor.container.$).find('.cke_toolgroup').css({'margin-left':6});
			}, 200);
		};

		//must set name attr before the ckeditor is created
		element.setAttribute('name', viewModel.to_id);
		CKEDITOR.replace(element, options);
	},
	update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		// This will be called once when the binding is first applied to an element,
		// and again whenever any observables/computeds that are accessed change
		// Update the DOM element based on the supplied values here.
	}
};
