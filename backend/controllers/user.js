'use strict';

var user = require('../models/user');
var log = require('../commons/logger/bunyanLogger');
const ipcMain = require('electron').ipcMain;
var $q = require('q');

exports.init = function(credential) {
    // validate login and initialize
    //avoid login

    /*
    user.login(credential).then(function(userInfo){
        log.info('User Logged in as: ' + userInfo.profile.nickname);

        for (var i = 0 ; i < userInfo.bindings.length; i ++){
            userInfo.bindings[i].tokenJsonStr = JSON.stringify(userInfo.bindings[i].tokenJsonStr);
        }

        console.log( JSON.stringify(userInfo) );

        return userInfo;
    });
    */

    var userInfoJson = '{"loginType":0,"code":200,"account":{"id":30781277,"userName":"2_1734755291","type":2,"status":0,"whitelistAuthority":0,"createTime":0,"tokenVersion":0,"ban":0,"baoyueVersion":1,"donateVersion":0,"vipType":10,"anonimousUser":false},"profile":{"signature":"By Faith We Are One.","authority":0,"description":"","userId":30781277,"nickname":"时雨小径","avatarUrl":"http://p4.music.126.net/hqkBKLakvgqbNy1D4UpXJg==/5983542278816213.jpg","mutual":false,"vipType":10,"expertTags":null,"avatarImgId":5983542278816213,"backgroundImgId":2002210674180204,"province":1000000,"city":1004400,"birthday":-2209017600000,"gender":1,"accountStatus":0,"userType":0,"authStatus":0,"defaultAvatar":false,"detailDescription":"","backgroundUrl":"http://p1.music.126.net/5L9yqWa_UnlHtlp7li5PAg==/2002210674180204.jpg","followed":false,"djStatus":0},"bindings":[{"id":17878595,"type":2,"userId":30781277,"url":"http://weibo.com/u/1734755291","tokenJsonStr":"{\\\"uid\\\":\\\"1734755291\\\",\\\"block_app\\\":0,\\\"remark\\\":\\\"\\\",\\\"location\\\":\\\"海外 美国\\\",\\\"expires_in\\\":619725,\\\"verified_reason\\\":\\\"\\\",\\\"statuses_count\\\":1407,\\\"city\\\":\\\"1\\\",\\\"favourites_count\\\":0,\\\"idstr\\\":\\\"1734755291\\\",\\\"verified\\\":false,\\\"description\\\":\\\"By Faith We Are One.\\\",\\\"province\\\":\\\"400\\\",\\\"gender\\\":\\\"m\\\",\\\"weihao\\\":\\\"\\\",\\\"access_token\\\":\\\"2.00DGr5tB0Gg4613315da638d2dbVvC\\\",\\\"cover_image\\\":\\\"http://ww4.sinaimg.cn/crop.0.188.980.245/676643dbgw1dx3zbk1t28j.jpg\\\",\\\"remind_in\\\":\\\"619725\\\",\\\"class\\\":1,\\\"mbrank\\\":0,\\\"url\\\":\\\"http://ganlu.name\\\",\\\"friends_count\\\":88,\\\"follow_me\\\":false,\\\"profile_image_url\\\":\\\"http://tp4.sinaimg.cn/1734755291/50/40061991817/1\\\",\\\"ptype\\\":0,\\\"verified_source_url\\\":\\\"\\\",\\\"verified_type\\\":-1,\\\"lang\\\":\\\"zh-cn\\\",\\\"verified_source\\\":\\\"\\\",\\\"credit_score\\\":80,\\\"id\\\":1734755291,\\\"verified_trade\\\":\\\"\\\",\\\"following\\\":false,\\\"name\\\":\\\"时雨小径\\\",\\\"domain\\\":\\\"imganlu\\\",\\\"created_at\\\":\\\"Mon Apr 26 21:18:43 +0800 2010\\\",\\\"user_ability\\\":0,\\\"followers_count\\\":151,\\\"online_status\\\":0,\\\"profile_url\\\":\\\"imganlu\\\",\\\"bi_followers_count\\\":64,\\\"geo_enabled\\\":true,\\\"star\\\":0,\\\"urank\\\":22,\\\"avatar_hd\\\":\\\"http://ww2.sinaimg.cn/crop.1.19.477.477.1024/676643dbgw1ej2mmxh4itj20dc0hs0us.jpg\\\",\\\"allow_all_comment\\\":true,\\\"allow_all_act_msg\\\":false,\\\"avatar_large\\\":\\\"http://tp4.sinaimg.cn/1734755291/180/40061991817/1\\\",\\\"pagefriends_count\\\":0,\\\"verified_reason_url\\\":\\\"\\\",\\\"mbtype\\\":0,\\\"screen_name\\\":\\\"时雨小径\\\",\\\"block_word\\\":0,\\\"status\\\":{\\\"created_at\\\":\\\"Fri Jan 08 13:25:07 +0800 2016\\\",\\\"id\\\":3929002714568641,\\\"mid\\\":\\\"3929002714568641\\\",\\\"idstr\\\":\\\"3929002714568641\\\",\\\"text\\\":\\\"手机网易新闻的财经频道的url参数叫money，尽管UI做的不错但是立刻觉得low了许多，说实话换成caijing我觉得都更好啊。 #论程序员英语词汇量的重要性#\\\",\\\"textLength\\\":139,\\\"source_allowclick\\\":0,\\\"source_type\\\":1,\\\"source\\\":\\\"<a href=\\\\\\\"http://app.weibo.com/t/feed/3y2VmR\\\\\\\" rel=\\\\\\\"nofollow\\\\\\\">Smooth</a>\\\",\\\"favorited\\\":false,\\\"truncated\\\":false,\\\"in_reply_to_status_id\\\":\\\"\\\",\\\"in_reply_to_user_id\\\":\\\"\\\",\\\"in_reply_to_screen_name\\\":\\\"\\\",\\\"pic_urls\\\":[],\\\"geo\\\":null,\\\"reposts_count\\\":0,\\\"comments_count\\\":0,\\\"attitudes_count\\\":0,\\\"isLongText\\\":false,\\\"mlevel\\\":0,\\\"visible\\\":{\\\"type\\\":0,\\\"list_id\\\":0},\\\"biz_feature\\\":0,\\\"page_type\\\":32,\\\"darwin_tags\\\":[],\\\"userType\\\":0}}","expired":false,"expiresIn":619725,"refreshTime":1452274398},{"id":59296198,"type":0,"userId":30781277,"url":"","tokenJsonStr":"{\\\"email\\\":\\\"gan-676@163.com\\\"}","expired":false,"expiresIn":2147483647,"refreshTime":1452264971}]}';

    var userInfo = JSON.parse(userInfoJson);

    return $q.when(userInfo);

};

