define([
	'underscore',
	'm/ToolboxModel', 'm/ToolboxCollection',
	'text!tmpl/news_tmpls.js'
], function(_,
	ToolboxModel, ToolboxCollection,
	news_tmpl) {
	
	return describe('测试ToolboxModel/Collection', function() {
		var tbc = false;
		var news = JSON.parse(news_tmpl);
		
		beforeEach(function() {
			tbc = new ToolboxCollection(news);
		});

		afterEach(function() {
			tbc = false;
		});


		it('Collection支持preAdd方法', function() {
			expect(tbc.preAdd).not.toBeUndefined();	
			
			tbc.preAdd('testAdd', '测试添加');
			var first = tbc.at(0);

			expect(first.get('name')).toEqual('testAdd');
			expect(first.get('label')).toEqual('测试添加');
		});

		it('Collection支持未使用的filter: notIn', function() {
			expect(tbc.notIn).not.toBeUndefined();
			var ret = tbc.notIn(
[{"label":"标题别名","name":"SubTitle"},{"label":"拟播长度","name":"EstimateLength"},{"label":"稿件体裁","name":"CreatMethod"},{"label":"来源","name":"NewsSource"},{"label":"类别","name":"NewsType"},{"label":"备注","name":"NewsRemark"},{"label":"关键字","name":"NewsKeyword"},{"label":"专栏","name":"EstimatePage"},{"label":"通讯员","name":"BatMan"},{"label":"节目名称","name":"ProgramName"},{"label":"节目代码","name":"ProgramCode"},{"label":"视频长度","name":"VideoLength"},{"label":"口播长度","name":"BroadLength"},{"label":"文字长度","name":"WordsLength"},{"label":"特约记者","name":"GuestMan"},{"label":"摄像员","name":"Camerist"},{"label":"拟播栏目","name":"EstimateColumn"},{"label":"稿件类别","name":"NewsLevel"},{"label":"文稿类型","name":"IsSpecial"},{"label":"创建人","name":"Creater"},{"label":"所属栏目","name":"OwnColumn"},{"label":"创建时间","name":"CreateTime"},{"label":"修改时间","name":"ModifyTime"},{"label":"配音员","name":"DubMan"},{"label":"语速","name":"BroadSpeed"},{"label":"保存位置","name":"SaveFloder"},{"label":"采访时间","name":"TaskTime"},{"label":"采访地点","name":"TaskPlace"},{"label":"重要性","name":"NewsGrade"},{"label":"语言","name":"NewsLanguage"},{"label":"内容","name":"NewsContent"},{"label":"播出类别","name":"BroadType"},{"label":"剪辑员","name":"Editor"},{"label":"司机","name":"Driver"},{"label":"其他人员","name":"Assistant"},{"label":"拟播时间","name":"EstimateTime"},{"label":"拟播长度","name":"EstimateLength"},{"label":"报片","name":"IsBaoPian"},{"label":"报播","name":"IsBaoBo"},{"label":"文稿状态","name":"NewsState"},{"label":"视频状态","name":"VideoState"},{"label":"报播栏目","name":"BaoBoColumn"},{"label":"修改人","name":"Modifier"}]);
			expect(ret[0].toJSON()).toEqual({"label":"标题","name":"NewsTitle"});

		});
	});
});


