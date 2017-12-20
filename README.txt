# vuePagelist
vue.js和Pagination.js封装实现快速分页展示（js主要区别在dataTable.js,注意与前面的template.js与vue.js的不同）

html:
<div class="sale-lis part" id="sale-lis">
			<h2>销售商铺列表</h2>
			<table>
				<thead>
					<tr>
						<th>楼层</th>
						<th>商铺号</th>
						<th>面积</th>
						<th>开间</th>
						<th>进深</th>
						<th>层高</th>
						<th></th>
					</tr>
				</thead>
				<tbody class="shop_list" id="shoplists">
					<tr v-for="shop in items" v-bind:id='shop.id'>
						<td>{{shop.floor_name}} </td>
						<td>{{shop.shop_no}}</td>
						<td>{{shop.shop_area}} ㎡</td>
						<td>{{shop.bay}} m</td>
						<td>{{shop.depth}} m</td>
						<td>{{shop.story_height}} m</td>
						<td class="order">预约看铺</td>
					</tr>
				</tbody>
			</table>
			<div class="shop_more clear"></div><!--分页容器-->
		</div>
    
    javascript:
    
    $(function() {
      //管理列表
      $('.sale-lis').dataTable({
        param: "pid=" + $('#pid').val(),
        url: " /creShop/shopPage",
        listContainer: '.shop_list', // 列表显示的容器
        pagerContainer: '.shop_more' // 分页器显示的容器
      });
	})
  
    
    
