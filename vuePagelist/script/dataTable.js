define([
	'jquery', 'pager', 'vue'
], function($, pager, Vue) {

	var DataTable = function(element, options) {
		this.$element = element;
		this.options = $.extend({}, DataTable.DEFAULTS, options);
		this.currentPage = 1;
		this.vm = new Vue({
			el: '#shoplists',
			data: {
				items: {}
			}
		});
		this.init();
	};

	DataTable.DEFAULTS = {
		form: null, // 绑定的数据搜索表单
		param: '', // 未绑定表单时附带的参数
		url: '', // 获取列表数据的网址
		template: null, // 列表数据渲染模板
		listContainer: '.list-body', // 列表显示的容器
		pagerContainer: '.load-more' // 分页器显示的容器
	};

	$.extend(DataTable.prototype, {
		init: function() {
			this.initContainer();
			this.bindFormEvent();
			this.getData(this.currentPage, true);
		},
		initContainer: function() {
			this.$bodyContainer = this.$element.find(this.options.listContainer);
			this.$loadMore = this.$element.find(this.options.pagerContainer);
		},
		//获取数据
		getData: function(currentPage, isFirst) {
			var self = this;
			var param;

			// 绑定列表的搜索表单
			if(this.options.form) {
				$(this.options.form).find('input[name=currentPage]').val(currentPage);
				param = $(this.options.form).serialize();
				// console.log(param);
			} else {
				param = (this.options.param == '') ? 'currentPage=' + currentPage : this.options.param + '&currentPage=' + currentPage;
			}

			$.ajax({
				type: 'POST',
				url: self.options.url,
				data: param,
				dataType: "json",
				success: function(data) {
					console.log(data);
					// 这里加入解除当前页面交互的阻塞代码

					self.analyzeData(data, isFirst);
				},
				beforeSend: function() {
					// 这里加入阻塞当前页面交互的代码
				},
				error: function() {
					// 这里加入解除当前页面交互的阻塞代码
				}
			});
		},
		//解析从api获取到的数据
		analyzeData: function(data, isFirst) {
			var self = this;

			//渲染数据前触发事件
			if($.isFunction(self.options.onRender)) {
				self.options.onRender.call($(this), data);
			}

			var code = data['code'];
			var message = data['message'];
			var data = data['data'];

			if(code !== 1) {
				return;
			}
			if(data.page.totalRecord === 0) {
				self.renderNoDataDisplay();
				return;
			}
			if(self.options.dataTransform) {
				data = self.options.dataTransform(data);
			}

			self.renderBody(data);
			self.renderPager(data.page.totalPage, isFirst);
			//          self.scrollTop();
		},
		//渲染数据列表
		renderBody: function(data) {
			var self = this;
			this.vm.items = data.list;
		},
		//渲染分页器
		renderPager: function(totalPages, isFirst) {
			//如果不是第一页，直接返回
			if(!isFirst) return;

			var self = this;

			//移除分页器缓存
			if(this.$pagerWrap != null) {
				var pager = this.$pagerWrap.data('ui-pagination');
				if(pager) this.$pagerWrap.removeData('ui-pagination');
			}
			self.$loadMore.empty();
			if(totalPages > 1) {
				$pagerWrap = $('<div class="pagination"></div>').appendTo(self.$loadMore);
				$pagerWrap.pagination({
					pages: totalPages,
					styleClass: ['pagination-large'],
					showCtrl: false,
					displayPage: 6,
					onSelect: function(num) {
						//点击分页时获取数据
						self.currentPage = num;
						self.getData(num, false);
					}
				});
			}

		},
		bindFormEvent: function() {
			var self = this;
			if(this.options.form) {
				var $form = $(this.options.form);
				$form.on('submit', function(e) {
					e.preventDefault();
					self.getData(1, true);
					return false;
				});
				$form.find('[type="reset"]').on('click', function(e) {
					e.preventDefault();
					$form.find('input').each(function() {
						$(this).val("");
					});
					$form.find('input[name="currentPage"]').val(1);
					$form.find('input[name="pageSize"]').val(20);
				});
			}
		},
		//无数据时显示提示
		renderNoDataDisplay: function() {
			var _html = '<span></span>无更多数据';
			this.$bodyContainer.empty();
			this.$loadMore.empty().html(_html);
		},
		reload: function() {
			this.getData(this.currentPage, false);
		},
		//返回顶部
		scrollTop: function() {
			$('html,body').animate({
				'scrollTop': 0
			}, 200);
		}
	});

	var dataAttr = 'dataTable';

	$.fn.dataTable = function(options) {
		return this.each(function() {
			var dataTable = $.data(this, dataAttr);
			if(!dataTable) {
				$.data(this, dataAttr, new DataTable($(this), options));
			} else {
				dataTable.reload();
			}
		});
	}
});