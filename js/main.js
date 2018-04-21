var apiURL = 'http://116.196.89.56:8080/qiuxx-crm-restapi/'
function ajaxRequest(url, data, doSuccess) {//sign图片上传

  $.ajax({
    url: apiURL + url,
    type: 'post',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',

    error: function (res) {
        console.error(res)
        layer.msg('请求失败',{icon:2})
    },
    success: function (res) {
      console.log(res)
        if(res.result){
            doSuccess(res)
        }else{
          layer.msg('网络异常',{icon:2})
        }


    }
  })
}
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function (ele, url,columns) {
        ele.bootstrapTable({
            method: 'post',
            contentType: "application/json",//必须要有！！！！
            url:apiURL+url,//要请求数据的文件路径
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            dataField: "data",
            classes: 'table',
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [ 10, 15, 20,25],        //可供选择的每页的行数（*）
            //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大

            clickToSelect: true,                //是否启用点击选中行

            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: columns,
            responseHandler: function (res) {
                //在ajax获取到数据，渲染表格之前，修改数据源
                console.log(res)

                return {
                    total: res.data.total, //总页数,前面的key必须为"total"
                    data: res.data.list//行数据，前面的key要与之前设置的dataField的值一致.
                };
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var data = {
            pageSize: params.limit, //每一页的数据行数，默认是上面设置的10(pageSize)
            pageNum: params.offset/params.limit+1, //当前页面,默认是上面设置的1(pageNumber)
            //这里是其他的参数，根据自己的需求定义，可以是多个
        }
        return data
    };
    return oTableInit;
};

function enumType(ele,type) {
    var url='crm/50010/100'
    var data={enumType:type}
    var doSuccess=function(res){
        var level = res.data;
        var str = ''
        level.map(function (i) {
            str += '<option value=' + i.enumValue + '>' + i.enumTxt + '</option>'
        })
        ele.html(str)
    }
    ajaxRequest(url,data,doSuccess)
}