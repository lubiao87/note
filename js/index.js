$(function () {
    var btn = $('.btn-primary'),
        //liLast = btn.parent(),
        find = $('.nav-tabs').html(),
        content = $('.tab-content').html(),
        base = $('#save'),
        sm = $('.glyphicon-asterisk');
        //length = sm.next().children().length;
    $('.form-group').css({ 'width': '100%' });
    var length3 = 2;
    render(); //重新加载第一页的数据

    //  点击标题跳转页面
    $('.nav-tabs').on('click', '.active', function () {
        $('.tab-content ul').toggleClass('hidden');
    });

// 显示btn-var 按钮
    btn.click(function () {
        btnBlock();

    });

//取消增加
    $('#btn-var').on('click', '.close', function () {
        btnNone();
    });

//点击确定按钮
    base.click(function () {
        var val = $(" input[ type='text' ] ").val();
        // console.log();
        if (val !== '' && val !== ' ') {
            var formData = $('#form').serialize();  // 表单序列化
            console.log(formData);
            $.ajax({
                type: 'post',
                url: 'api/saveUser.php',
                data: formData,
                dataType: 'json',

                success: function (info) {   //响应成功
                    console.log(info);

                },
                complete: function () {     //响应完成
                    render(1); //重新加载第一页的数据
                },
                error: function (error) {
                    console.log('响应失败');
                    // console.log(error);
                }

            });



            btnNone(); //隐藏对话框



        } else {
            alert('输入的是非法值');
        };

    });

//百变背景
    $('#bgc').click(function  (){
        $('body').css('background-color',getRandomColor);
    });
    function getRandomColor(){
        return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
    };



    // 刷新页面
    function render(index) {
        $.ajax({
            type: 'get',
            url: 'api/findUsers.php',
            data: {
                pageNum: index || 1,
                pageSize: 50
            },
            beforeSend: function () {  //请求反应前
                $('.loading').show();
            },
            success: function (info) { //响应成功时
                // console.log(info);
                var html = template('tmp', info);
                // console.log(html);

                $('.nav-tabs').html(find);
                $('.nav-tabs').append(html);

                // console.log(1)

                addContent(info);
            },
            error: function (err) {    // 响应错误时
                console.log(err);
            },
            complete: function () {    // 渲染结束时
                inbox();      // 徽章的功能

            }
        })
    };

//显示btn-var 按钮
    function btnBlock() {
        $('#btn-var').css('display', 'block');
        // console.log($('#btn-var').attr());
    };

    // 隐藏
    function btnNone() {
        $('#btn-var').css('display', 'none');
    };
    //增加内名对应content中的按钮
    function addContent(info) {


        $('.tab-content').html(content);
        for (var i = 0; i < info.list.length; i++) {
            var length2 = $('.tab-pane').length;
            length2 += 1;
            // console.log(length2);
            var str =         '<!--  .............  模态框       ................     -->'+
                '<!-- Button trigger modal -->'+
                '<button type="button" class="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#myModa'+length2+'">'+
                '增加知识点'+
                '</button>'+

                '<!-- Modal -->'+
                '<div class="modal fade  bs-example-modal-lg" id="myModa'+length2+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
                '<div class="modal-dialog modal-lg" role="document">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                '<h4 class="modal-title">增加内容</h4>'+
                '</div>'+
                '<div class="modal-body">'+
                '<form class="form-horizontal">'+
                '<div class="form-group">'+
                '<label class="col-sm-2 control-label">标题</label>'+
                '<div class="col-sm-10">'+
                '<input type="text" class="form-control" placeholder="title">'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-2 control-label">内容</label>'+
                '<span class="glyphicon-asterisk glyphicon glyphicon-plus"></span>'+
                '<div class="col-sm-10 add-input">'+
                '<input type="text" class="form-control" placeholder="1">'+
                '<input type="text" class="form-control" placeholder="2">'+
                '</div>'+
                '</div>'+

                '</form>'+

                '</div>'+
                '<div class="modal-footer">'+
                '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                '<button type="button" class="btn btn-primary">确认增加</button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<!-- Button trigger modal -->';


            $('.tab-content').prepend(
                '<div class="tab-pane" id="nav' + length2 + '">' +
                str +
                //创建 content 中的内容
                '</div>'
            );
        }
    };

    //删除页面
    $('.nav-tabs').on('click', '.delete', function () {
        if (window.confirm('确实要删除此页面吗？')) {
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: 'api/removeUser.php',
                data: { id: id },
                dataType: 'json',
                success: function (info) {
                    console.log(info);
                    render();
                    alert('删除成功');
                }
            })
        } else {
            alert('删除失败');

        }


    });

// 增加内容条
        $('.tab-content').on('click', '.glyphicon-asterisk', function () {
            console.log(length3);
            length3 += 1;
            var str = '<input type="text" class="form-control" placeholder="' + length3 + '">';
            $('.add-input').append(str);
        });

    // 取消键
      $('.tab-content').on('click','.modal-footer>.btn-default',function  (){
          length3 = 2;
          var html = sm.next().html();
          $('.form-group>.add-input').html(html);
          console.log($('.form-group>.add-input').html());

      });

    // 徽章功能
    function inbox() {
        $('.loading').hide();
        var badges = $('.badge');
        i = 0,
            l = badges.length;
        for (; i < l; i++) {
            var div = badges.eq(i).parent().next(),

                lis = div.children(),
                length = lis.length;
            var badge = badges.eq(i);
            badge.html(length);
        };
        $('.badge').click(function () {
            $(this).parent().next().toggleClass('hidden');
        });
    };










});