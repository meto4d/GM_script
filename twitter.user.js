﻿// ==UserScript==
// @name twitter multi picture url
// @namespace show twitter multi picture url
// @description There are some picture at twitter. That URL of picture appear. refer twitter@meto4d
// @grant none
// @match https://twitter.com/*/status/*
// ==/UserScript==

////
// この値を変えることで表示される形式を変更することができます
// LINK_TITLEは画像へのリンクで表示される文字をTwitterによるURLに合わせるかLINK_NAMEで設定した文字に合わせるかどうか
// NEW_TABは画像を新しいタブで開くようにするか、直接開くかどうか
// true:1 false:0
var LINK_TITLE = 1;
var LINK_NAME = "画像";
var NEW_TAB = 1;


	var body = document.getElementsByTagName("body")[0];
	
( function(){
	if(body.innerHTML.match(/pic.twitter.com/) ){
		
		
		var tag_meta = document.getElementsByTagName("meta");	//metaタグ
		var tag_img = [];	//imgダグ
		var tag_meta_first = -1;
		var tag_meta_;
		
		//metaタグに囲まれてるものに関してfor　[tag_meta_num]
		for(var tag_meta_num = 0; tag_meta_num < tag_meta.length; tag_meta_num++){
			//metaダグに囲まれていて、contentの要素に"pbs.twimg.com/media/"を含んでいるものを抜き取り
			if(tag_meta[tag_meta_num].getAttribute("content") != null ){
				tag_meta_ = tag_meta[tag_meta_num].getAttribute("content");
				if(tag_meta_.match(/pbs.twimg.com\/media\//i))
					tag_img.push(RegExp.rightContext);
			}
			else
				var tag_meta_first = 1;
		}
		
		var tag_div = document.getElementsByTagName("div");
		var tag_div_p ;
		var a_tag;
		if(NEW_TAB == 0)
			a_tag = "　<a href=\"https://pbs.twimg.com/media/";
		else
			a_tag = "　<a target=\"_blank\" href=\"https://pbs.twimg.com/media/";
		
		for(var tag_div_num = 0; tag_div_num < tag_div.length; tag_div_num++){
			if(tag_div[tag_div_num].getAttribute("class") == "permalink-inner permalink-tweet-container" ){
				
				tag_div_p = tag_div[tag_div_num].getElementsByTagName("p");
				
				for(var tag_div_p_num = 0; tag_div_p_num < tag_div_p.length; tag_div_p_num++){
					if(tag_div_p[tag_div_p_num].getAttribute("class").match(/TweetTextSize--28px/i) ){
						if(tag_meta[7].getAttribute("content") != null){
							for(var tag_img_num = 0; tag_img_num < tag_img.length; tag_img_num++){
								if(LINK_TITLE == 0){
									tag_div_p[tag_div_p_num].innerHTML += "<p>"+ a_tag + tag_img[tag_img_num] +"\">" + tag_img[tag_img_num].replace(/:large/i,"</a>");
								}
								else{
									tag_div_p[tag_div_p_num].innerHTML += "<p>"+ a_tag + tag_img[tag_img_num] +"\">" + LINK_NAME + (tag_img_num + 1) + "</a>";
								}
							}
						}
					}
				}
			}
		}
		
	}
	
}) ();
