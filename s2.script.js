// 保存用のファイル名を生成
function yyyymmddhhmise() {
  // 日付時間秒を文字列で返す	
    const dt = new Date();
    var yyyy = dt.getFullYear();
    var mm = ('00' + (dt.getMonth()+1)).slice(-2);
    var dd = ('00' + dt.getDate()).slice(-2);
    var hh = ('00' + dt.getHours()).slice(-2);
    var mi = ('00' + dt.getMinutes()).slice(-2);
    var se = ('00' + dt.getSeconds()).slice(-2);
  
    var answer = yyyy + mm + dd + "-" + hh + mm + se ;
    return (answer);
  }
var filename = "numakura-s2-" + yyyymmddhhmise() + ".csv" ;
// 

var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', filename);
//    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 共有パーツ
// ------------------------------------------------------------------------
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

// ------------------------------------------------------------------------
// 教示文
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-沼倉-セッション2</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

var instruction_p1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
常磐大学人間科学部心理学科4年・渡辺ゼミナール所属の沼倉 日菜子と申します。<br><br>\
本日は実験にご協力いただき，誠にありがとうございます。<br><br>\
私は現在，「文字が与える印象及び認知に及ぼす影響」をテーマに卒業研究に取り組んでいます。<br><br>\
今回，本研究を行うにあたり，「文字が与える印象」，「文字が認知に及ぼす影響」の二点について調査したく，事前に実験協力に同意いただきました皆様を対象に実験を行います。<br><br>\
本研究への回答は任意であり，回答の有無により皆様に利益・不利益が生じることはありません。得られたデータは厳重な管理の下で本研究のみに使用され，研究終了後に適切に処分します。また，データは統計的な処理を行うため，個人が特定されることはございません。<br><br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

var instruction_p2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
本実験は「文字が与える印象」，「文字が認知に及ぼす影響」についての2セッション構成で，本日は「文字が認知に及ぼす影響」の実験です。今回は2種類の実験を行います。<br><br>\
注視点が表示され，その後で呈示された語に対して，前回の実験で呈示された語であると思えば「j」，呈示されていなかった語であると思えば「k」を選んでください。<br><br>\
練習として3問行った後，本番として20問行います。<br><br>\
その後，二つ目の実験を行います。<br><br>\
正しい答えや間違った答えというものはありませんので，他者と相談することなく，思った通りにお答えください。また，実験の途中で体調が悪くなった方は，実験を中断していただいて構いません。<br><br>\
<br></font></div>\
',
choices: ['練習を始める'],
} ;

var instruction_p3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
練習<br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

var instruction_p4 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
以上で練習は終了です。  <br><br>\
3つの質問にお答えいただいた後，本番が始まります。<br><br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

// 被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '参加者ID（例　A1，B2）を入力してください。', columns: 10, required: true, name: 'id'},
    {prompt: '性別（1：男性，2：女性，3：回答しない）を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: '年齢（半角数字のみ）を入力してください', columns: 10, required: true, name: 'age'},
  ],
  button_label: '実験の開始',
};

// 実験の終了
var bye = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
以上で，一つ目の実験は終了となります。<br>\
五分間の休憩の後，二つ目の実験を行います。<br>\
部屋から出ず，席に着いてお待ちください。<br>\
<br>\
二つ目の実験では筆記用具を使いますので，机上に準備をお願い致します。<br>\
筆記用具をお持ちでない方，何かご不明な点等がある方はお声掛けください。<br>\
<br>\
<br></font></div>\
',
choices: ['終了'],
};

// ------------------------------------------------------------------------
// 練習用問題の作成
// ------------------------------------------------------------------------
// group:'j' = 正解
// group:'k' = 間違え

var pre_examSession2 = [
  { label: 'サツキ'   , group:'j' },
  { label: 'スミレ'   , group:'k' },
  { label: 'レモン'   , group:'j' },
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

var examSession2 = [
  { label: 'アクマ'   , group:'j' },
  { label: 'キアツ'   , group:'j' },
  { label: 'クサリ'   , group:'k' },
  { label: 'コテン'   , group:'k' },
  { label: 'センイ'   , group:'j' },
  { label: 'テント'   , group:'k' },
  { label: 'ハクイ'   , group:'j' },
  { label: 'ヒトミ'   , group:'k' },
  { label: 'マツリ'   , group:'k' },
  { label: 'ユカタ'   , group:'j' },
  { label: 'インク'   , group:'k' },
  { label: 'カラス'   , group:'j' },
  { label: 'キモノ'   , group:'k' },
  { label: 'コイン'   , group:'j' },
  { label: 'サユウ'   , group:'k' },
  { label: 'スルメ'   , group:'j' },
  { label: 'タヌキ'   , group:'j' },
  { label: 'ハカセ'   , group:'k' },
  { label: 'メマイ'   , group:'j' },
  { label: 'ユノミ'   , group:'k' },
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

jsPsych.run([enter_fullscreen,  instruction_p1,instruction_p2,pre_trials, instruction_p4,par_id,trials,bye,exit_fullscreen]);
