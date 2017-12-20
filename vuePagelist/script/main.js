requirejs.config({
	shim: {
		'layer': ['jquery'],

		'niceScroll': ['jquery']
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		jquery: '../jquery',
		'layer': '../layer',
		'disc': '../disc',
		'funUnit': '../funUnit',
		'nicescroll': '../scroll/niceScroll',
		'vue': '../vue.min',
		'pager': '../pagination/pagination',
		'dataTable': '../ui/dataTable',
	}
})
require(['jquery', 'layer', 'disc', 'funUnit', 'nicescroll', 'vue', 'pager', 'dataTable'], function($, layer, D, F, nicescroll, Vue) {
	$(function() {
		//管理列表
		$('.sale-lis').dataTable({
			param: "pid=" + $('#pid').val(),
			url: " /creShop/shopPage",
			listContainer: '.shop_list', // 列表显示的容器
			pagerContainer: '.shop_more' // 分页器显示的容器
		});
		
	})
})