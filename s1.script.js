 var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', 'session1-data.csv');
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

var preload = {
  type: jsPsychPreload,
  auto_preload: true
}

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1500, // 表示時間
};

// 空白画面
var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000, // 表示時間 
};

// ------------------------------------------------------------------------
// 教示文
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-沼倉-セッション1</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
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
本実験は「文字が与える印象」，「文字が認知に及ぼす影響」についての2セッション構成で，本日は「文字が与える印象」の実験です。<br><br>\
注視点が表示され，その後で呈示された語に対して，連想されるものとして最も適切なものを三つの選択肢から選んでください。<br><br>\
練習として3問行った後，本番として20問行います。<br><br>\
正しい答えや間違った答えというものはありませんので，他者と相談することなく，思った通りにお答えください。また，実験の途中で体調が悪くなった方は，実験を中断していただいて構いません。<br><br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

var instruction_p3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
練習<br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

// 実験の終了
var bye = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
以上で，本日の実験は終了となります。<br>\
ご協力ありがとうございました。<br>\
来週は「文字が認知に及ぼす影響」の実験を行う予定ですので，引き続きご協力いただけますと幸いです。<br>\
よろしくお願い致します。<br>\
<br>\
何かご不明な点等がございましたら，下記のメールアドレスまでご連絡ください。<br>\
<br></div><div  align="right">\
人間科学部心理学科<br>\
渡辺ゼミナール　4年<br>\
沼倉 日菜子<br>\
31900875＠tokiwa-u.jp<br>\
<br>\
<br></font></div>\
',
choices: ['実験を終わる'],
};

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '参加者ID（例　A1，B2）を入力してください。', columns: 10, required: true, name: 'id'},
    {prompt: '性別（1：男性，2：女性，3：回答しない）を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: '年齢（半角数字のみ）を入力してください', columns: 10, required: true, name: 'age'},
  ],
  button_label: '実験の開始',
};


// ------------------------------------------------------------------------
// 問題の作成(練習)
// ------------------------------------------------------------------------
var trials_pre = {
  timeline: [],
};

// 刺激
var varexam_pre = [
  { index:0,label: 'コオリ'   , select:["冷たい","クール","冬"] },
  { index:1,label: 'サツキ'   , select:["五月","植物","アニメ"] },
  { index:2,label: 'レモン'   , select:["すっぱい","黄色","果物"] },
]  

// 配列から問題のペアを作成
for (let i = 0; i< varexam_pre.length; i++) {
  // 単語を呈示
  var exam_pre = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 48px;'>" + varexam_pre[i].label + "</p>"; },
    trial_duration: 2500, // 表示時間
    choices: "NO_KEYS",
  };
  // その単語の印象を選択
  var choiceone_pre = {
  type: jsPsychSurveyMultiChoice,
  button_label: "次へ",
  questions: [
    {
      prompt: "この中から一番印象の強い単語を1つ選んでください。", 
      name: 'selectedword', 
      options: varexam_pre[i].select, 
      required: true,
      horizontal: false
    }, 
  ]
  };
  // 出来上がった問題をtimelineにpush
  trials_pre.timeline.push(eyepoint) ;
  trials_pre.timeline.push(exam_pre) ;
  trials_pre.timeline.push(choiceone_pre) ;
}

// ------------------------------------------------------------------------
// 問題の作成(本番)
// ------------------------------------------------------------------------
// ここに各問題を格納
var trials = {
  timeline: [],
};

// 刺激
var varexam = [
  { index: 0,label: 'アクマ'   , select:["魔物","デーモン","天使"] },
  { index: 1,label: 'キアツ'   , select:["大気","圧力","天候"] },
  { index: 2,label: 'センイ'   , select:["闘志","布","医者"] },
  { index: 3,label: 'ハクイ'   , select:["医療従事者","化学研究","死に装束"] },
  { index: 4,label: 'ユカタ'   , select:["夏","入浴","和服"] },
  { index: 5,label: 'カラス'   , select:["黒色","鳥類","不吉"] },
  { index: 6,label: 'スルメ'   , select:["イカ","干物","おつまみ"] },
  { index: 7,label: 'コイン'   , select:["硬貨","金属","表裏"] },
  { index: 8,label: 'タヌキ'   , select:["だます","哺乳類","寝る"] },
  { index: 9,label: 'メマイ'   , select:["回る","忙しい","体調不良"] },
  { index:10,label: 'キリン'   , select:["首","哺乳類","神童"] },
  { index:11,label: 'エホン'   , select:["子ども","絵","物語"] },
  { index:12,label: 'シカイ'   , select:["進行役","眼","海"] },
  { index:13,label: 'ナマリ'   , select:["にぶる","金属","方言"] },
  { index:14,label: 'ユウヒ'   , select:["夕方","朝日","オレンジ"] },
  { index:15,label: 'カシワ'   , select:["植物","餅","縁起木"] },
  { index:16,label: 'サクラ'   , select:["植物","春","ピンク"] },
  { index:17,label: 'センス'   , select:["感覚","扇","夏"] },
  { index:18,label: 'ナイフ'   , select:["切る","料理","カトラリー"] },
  { index:19,label: 'モナカ'   , select:["菓子","名月","あんこ"] },
  ]  

// ランダマイズ
var sequence = [] ;
for (let i = 0; i< varexam.length; i++) {
  sequence[i] = i ;
}
for (let i = 0; i< varexam.length; i++) {
  target           =  Math.floor(Math.random() * varexam.length) ;
  tmpseq           = sequence[i] ;
  sequence[i]      = sequence[target] ;
  sequence[target] = tmpseq
}

// 配列から問題のペアを作成
for (let i = 0; i< varexam.length; i++) {
  // 単語を呈示
  var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 48px;'>" + varexam[sequence[i]].label + "</p>"; },
    trial_duration: 2500, // 表示時間
    choices: "NO_KEYS",
  };
  // その単語の印象を選択
  var choiceone = {
  type: jsPsychSurveyMultiChoice,
  button_label: "次へ",
  questions: [
    {
      prompt: "この中から一番印象の強い単語を1つ選んでください。", 
      name: 'selectedword', 
      options: varexam[sequence[i]].select, 
      required: true,
      horizontal: false
    }, 
  ]
  };
  // 出来上がった問題をtimelineにpush
  trials.timeline.push(eyepoint) ;
  trials.timeline.push(exam) ;
  trials.timeline.push(choiceone) ;
}

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

//jsPsych.run([enter_fullscreen,par_id,hello,trials,bye,exit_fullscreen]);
jsPsych.run([enter_fullscreen,instruction_p1,instruction_p2,instruction_p3,trials_pre,par_id,trials,bye,exit_fullscreen]);
