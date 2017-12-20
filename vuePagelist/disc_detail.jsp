<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    String basePath = request.getContextPath()+"/";
%>
<!doctype html>
<html lang="en">

	<head>
		<base href="<%=basePath%>">
		<title>demo</title>
		<meta charset="UTF-8">
		<meta name="keyword">
		<meta name="description">
		<link rel="stylesheet" href="../theme/css/disc_detail.css?v=4302b2673d" />
		<link rel="stylesheet" href="../theme/css/layer.css?v=94d48c3703" />
	</head>

	<body>
		<%--销售商铺列表--%>
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
			<div class="shop_more clear"></div>
		</div>
		</div>
		</div>
		</div>
		<!--modal-->
		<div class="model_sec newshop_modal" id="newshop_modal">
			<div class="detail_data">
				<div class="show_sec1 clear">
					<img class="fl" v-bind:src="item.shop_list_picture" width="100" height="74" />
					<ul class="text fl">
						<li>楼层：<span>{{item.floor_name}}</span></li>
						<li>铺位：<span>{{item.shop_no}}</span></li>
						<li>面积：<span>{{item.shop_area}} ㎡</span></li>
					</ul>
				</div>
				<div class="show_sec2">
					<ul>
						<li>开间<span>{{item.bay}} m</span> 进深<span>{{item.depth}} m</span></li>
						<li>层高<span>{{item.story_height}} m</span></li>
						<li>业态规划 <span>{{item.eng_condition}}</span></li>
						<li>补充说明：<span>{{item.more_info}}</span></li>
					</ul>
				</div>
			</div>
		</div>
		<script src="<%=request.getContextPath()%>/script/require.js?v=1d46acb6e4" data-main="<%=request.getContextPath()%>/script/newDiscdetail/main"></script>
	</body>

</html>