var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', 'data.csv');
//    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 固定の実験パーツ
// ------------------------------------------------------------------------
var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-1-セッション2</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1500,
};

var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000,
};

// 実験の終了
var bye2nd = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これで実験は終了です。 PCには触れずに実験者の指示に従ってください。',
};

// ------------------------------------------------------------------------
// 練習用問題の作成
// ------------------------------------------------------------------------

// 実験の説明
var pre_hello2nd = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '再認セッションの練習を始めます。いまから、一つずつ、画面の中央に ”ひらがな” あるいは、漢字の単語が表示されます。<br><br>\
表示される単語が、セッション１で\
見た単語の場合、左手人差し指で<font size=36px;">ｊ</font>、\
見たことがない単語ならば、右の人差し指で<font size=36px;">K</font>を、なるべく早く・正確に押して下さい。<br><br>\
セッション１では、ひらがなで表示されていて、再認セションでは、漢字で提示される場合、またその逆の場合もありますので、気をつけて下さい。'
,
};

var pre_examSession2 = [
  { label: 'たいせいほうかん'   , group:'j' },
  { label: '新陳代謝'           , group:'j' },
  { label: 'こうつうあんぜん'   , group:'j' },
  { label: '大量生産'           , group:'j' },
];

// 順番をランダマイズしたいので指定しておく
var pre_trials = {
  timeline: [],
  timeline_variables: pre_examSession2,
  randomize_order: true,
};

// 問題の本体
var pre_exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return "<p style='font-size: 48px;'>" + jsPsych.timelineVariable('label') + "</p>"; },
    choices: ["j","k"],
    data: {
      label: jsPsych.timelineVariable('label'),
    },
    on_finish: function (data) {
      data.amswer  = data.response ;
      data.correct = jsPsych.timelineVariable('group') ;
    },
};

pre_trials.timeline.push(eyepoint) ;
pre_trials.timeline.push(pre_exam) ;
pre_trials.timeline.push(blankscreen) ;

// ------------------------------------------------------------------------
// 本番用問題の作成
// ------------------------------------------------------------------------

// 実験の説明
var hello2nd = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '再認セッションを始めます。いまから、一つずつ、画面の中央に ”ひらがな” あるいは、漢字の単語が表示されます。<br><br>\
表示される単語が、セッション１で\
見た単語の場合、左手人差し指で<font size=36px;">ｊ</font>、\
見たことがない単語ならば、右の人差し指で<font size=36px;">K</font>を、なるべく早く・正確に押して下さい。<br><br>\
セッション１では、ひらがなで表示されていて、再認セションでは、漢字で提示される場合、またその逆の場合もありますので、気をつけて下さい。'
,
};


var examSession2 = [
  { label: 'あおいろしんこく'   , group:'j' },
  { label: 'かんりくみあい'     , group:'j' },
///*
  { label: 'けんげんきょうか'   , group:'j' },
  { label: 'こじんしょとく'     , group:'j' },
  { label: 'しゃかいほしょう'   , group:'j' },
  { label: 'せいめいほけん'     , group:'j' },
  { label: 'たんしんふにん'     , group:'j' },
  { label: 'にっしんせんそう'   , group:'j' },
  { label: 'ふくごうそざい'     , group:'j' },
  { label: 'めいじけんぽう'     , group:'j' },
  { label: '印鑑証明'           , group:'j' },
  { label: '規制緩和'           , group:'j' },
  { label: '健康食品'           , group:'j' },
  { label: '古典学派'           , group:'j' },
  { label: '少数激戦'           , group:'j' },
  { label: '太陽電池'           , group:'j' },
  { label: '内需拡大'           , group:'j' },
  { label: '表示価格'           , group:'j' },
  { label: '補正予算'           , group:'j' },
  { label: '落語協会'           , group:'j' },

  { label: 'えいようまんてん'   , group:'k' },
  { label: 'かいはつぎんこう'   , group:'k' },
  { label: 'きそちしき'         , group:'k' },
  { label: 'けいきかいふく'     , group:'k' },
  { label: 'けんていしけん'     , group:'k' },
  { label: 'こうてききかん'     , group:'k' },
  { label: 'じつようえいご'     , group:'k' },
  { label: 'しゅっきんきょひ'   , group:'k' },
  { label: 'しょうほうかいせい' , group:'k' },
  { label: 'せかいすいじゅん'   , group:'k' },
  { label: '耐用年数'           , group:'k' },
  { label: '伝統芸能'           , group:'k' },
  { label: '南極条約'           , group:'k' },
  { label: '灰色高官'           , group:'k' },
  { label: '標準金利'           , group:'k' },
  { label: '文化勲章'           , group:'k' },
  { label: '舗装工事'           , group:'k' },
  { label: '弥生文化'           , group:'k' },
//*/
  { label: '量子力学'           , group:'k' },
  { label: '労働市場'           , group:'k' },
];

// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
  timeline_variables: examSession2,
  randomize_order: true,
};

// 回答をチェックして文字列で返す
function checkresponse(response,correct)
{
  if (response == correct) return "正解" ; else return "不正解" ;
}

// 問題の本体
var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return "<p style='font-size: 48px;'>" + jsPsych.timelineVariable('label') + "</p>"; },
    choices: ["j","k"],
    data: {
      label: jsPsych.timelineVariable('label'),
    },
    on_finish: function (data) {
      data.amswer  = data.response ;
      data.correct = jsPsych.timelineVariable('group') ;
      data.culc    = checkresponse(data.response ,jsPsych.timelineVariable('group')) ;
    },
};

trials.timeline.push(eyepoint) ;
trials.timeline.push(exam) ;
trials.timeline.push(blankscreen) ;

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([enter_fullscreen,  pre_hello2nd,pre_trials, hello2nd,trials,bye2nd,exit_fullscreen]);
