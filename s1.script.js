 var jsPsych = initJsPsych({
  on_finish: function() {
//    jsPsych.data.get().localSave('csv', 'data.csv');
    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 固定の実験パーツ
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-1-セッション1</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '<strong>これから実験を始めます。</strong><br><br><br>学籍番号を入力してください', columns: 10, required: true, name: 'id'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、答えたくない場合は 3 を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: 'あなたの年齢を入力してください。', columns: 10, required: true, name: 'age'},
  ],
  button_label: '次へ',
};

var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

var preload = {
  type: jsPsychPreload,
  auto_preload: true
}

// 実験の説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験のセッション1を始めます。<br> \
1500 msec の凝視点の後に表示される言葉を音読してください。<br>\
2500msec 表示後に、2000 msec 待った後に次の刺激に切り替わります。<br><br>\
何かキーを押すと始まります。',
};

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
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これでセッション1は終了です。 PCには触れずに実験者の指示に従ってください。',
};

// ------------------------------------------------------------------------
// 画像問題の作成
// ------------------------------------------------------------------------
// ここに各問題を格納
var trials = {
  timeline: [],
};

// 刺激
var varexam = [
  { index:0,label: '1アクマ'   , select:["1マモノ","キジン","デーモン"] },
  { index:1,label: '2キアツ'   , select:["2プレッシャー","ボルテージ","プロセッシング"] },
  { index:2,label: '3センイ'   , select:["3ファイバー","フィラメント","レーヨン"] },
  { index:3,label: '4ハクイ'   , select:["4シロムク","シロショウゾク","ビャクエ"] },
  { index:4,label: '5ユカタ'   , select:["5バスローブ","ヨクイ","パジャマ"] },
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
    trial_duration: 2500,
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
      horizontal: true
    }, 
  ]
  };
  // 出来上がった問題をtimelineにpush
  trials.timeline.push(exam) ;
  trials.timeline.push(choiceone) ;
}

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

//jsPsych.run([enter_fullscreen,par_id,hello,trials,bye,exit_fullscreen]);
jsPsych.run([enter_fullscreen,par_id,hello,trials,bye,exit_fullscreen]);
