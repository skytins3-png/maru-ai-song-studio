(function(root,build) {
  "use strict";
  const api=build();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.MaruHumanRadio=api;
})(typeof globalThis==="object"?globalThis:this,function(){
  "use strict";
  // The guests are explicitly fictional and the dialogue is prewritten.
  // Never claim to be monitoring BIGO, reading real comments or interviewing
  // a real person without an approved live connection.
  const intros=[
    t=>["아환","이어지는 곡은 "+t+"입니다. 바로 들어볼게요."],
    t=>["윤솔","이번에는 "+t+". 잠깐 말은 줄이고 음악을 들어보죠."],
    t=>["아환","다음 곡 제목은 "+t+"입니다. 어떤 장면이 떠오를지 궁금하네요."],
    t=>["윤솔","한 곡 더 이어갈까요? "+t+" 준비했습니다."],
    t=>["아환","이번 순서는 "+t+"입니다. 편안하게 감상해 주세요."],
    t=>["윤솔",t+", 지금 이어집니다."],
    t=>["아환","음악으로 분위기를 바꿔볼게요. "+t+"입니다."],
    t=>["윤솔","바로 다음 곡으로 가죠. "+t+" 들려드릴게요."],
    t=>["아환","지금 만나볼 곡은 "+t+"입니다."],
    t=>["윤솔","여기서 "+t+" 한 곡 더 들어요."],
    t=>["아환","다음 곡으로 넘어가겠습니다. 제목은 "+t+"입니다."],
    t=>["윤솔","오늘의 음악은 계속됩니다. "+t+"입니다."]
  ];
  const endings=[
    t=>["윤솔",t+"였습니다. 곡의 여운을 잠시 느껴볼까요?"],
    t=>["아환","방금 들은 곡은 "+t+"였습니다."],
    t=>["윤솔","음악이 끝나니까 잠깐 조용해졌네요. 다음 이야기도 함께해요."],
    t=>["아환",t+" 들으셨습니다. 잠시 다음 순서를 준비할게요."],
    t=>["윤솔","한 곡이 지나갔네요. 지금의 기분은 어떠세요?"],
    t=>["아환",t+"였어요. 다음에는 조금 다른 분위기의 곡으로 이어가죠."],
    t=>["윤솔","좋아요. 노래 뒤에 남는 그 짧은 침묵도 괜찮죠."],
    t=>["아환","여기까지 "+t+"였습니다. 이어서 다른 이야기로 가볼게요."]
  ];
  const topics={
    KR:[
      ["아환","초대석에서는 노래의 정답보다 어떤 감정이 남는지가 궁금하죠. 윤솔 씨는 어떤가요?"],
      ["윤솔","맞아요. 같은 가사를 듣고도 각자 떠올리는 장면은 다르잖아요."],
      ["하린","그럴 땐 설명을 많이 하기보다 한 번 더 귀 기울이고 싶어지죠."],
      ["아환","그 이야기는 다음 곡에서도 이어가 볼게요."]
    ],
    CN:[
      ["아환","중국어 노래를 들을 때는 말의 뜻과 선율 중 어디에 먼저 귀가 가세요?"],
      ["윤솔","저라면 처음에는 목소리의 흐름을 듣고, 그다음 가사 의미를 찾아볼 것 같아요."],
      ["린아","서로 다른 언어라도 음악으로 전해지는 느낌이 있죠."],
      ["아환","좋은 이야기네요. 이 분위기 그대로 다음 곡을 만나죠."]
    ],
    WEST:[
      ["아환","이번엔 음악의 분위기를 바꿔봤어요. 어떠셨어요?"],
      ["윤솔","같은 방송에서도 스타일이 달라지면 새 장면을 보는 기분이에요."],
      ["민혁","맞아요. 그런데 곡 소개가 너무 길면 음악 기다리는 분이 서운하겠는데요?"],
      ["아환","하하, 그건 인정이죠. 짧게 이야기하고 다음 무대로 가요."]
    ],
    INSTR:[
      ["아환","가사가 없는 연주곡은 듣는 사람마다 이야기가 달라지겠죠?"],
      ["윤솔","그러게요. 저는 한 악기 소리에 오래 집중할 수 있다는 점이 좋아요."],
      ["하린","설명을 덜 할수록 더 잘 들리는 순간도 있고요."],
      ["아환","그럼 오늘은 그 여백도 음악의 일부로 남겨둘게요."]
    ]
  };
  const extra=[
    [
      ["아환","노래를 소개할 때는 제목부터 말하지만 듣는 사람에게는 기억이 먼저 찾아올 때도 있죠."],
      ["윤솔","맞아요. 그래서 어떤 곡은 다 듣고 나서야 제목이 마음에 들어오더라고요."],
      ["아환","그 말 좋네요. 잠깐 더 듣고 다음 이야기로 넘어가죠."]
    ],
    [
      ["아환","좋아하는 노래는 왜 자꾸 다시 듣게 될까요?"],
      ["민혁","글쎄요. 음악도 그렇지만 그 곡을 들었던 시간이 같이 떠오르기 때문 아닐까요?"],
      ["윤솔","노래를 기억한다는 건 어느 날의 기분도 기억한다는 말 같아요."]
    ],
    [
      ["윤솔","오늘은 음악을 따라가다 보니 말이 조금 길어졌네요."],
      ["아환","그래도 이 정도면 참은 거예요. 사실 더 할 얘기가 있거든요."],
      ["하린","그 이야기는 다음 초대석에서요. 지금은 음악을 기다리시는 분들이 계시니까요."],
      ["아환","좋아요. 다시 노래로 이어갈게요."]
    ],
    [
      ["아환","곡에 악기가 많이 들어가면 무조건 풍성한 음악이 될까요?"],
      ["서아","꼭 그렇지는 않죠. 때로는 피아노 한 대가 더 많은 말을 해주는 느낌이에요."],
      ["윤솔","그러네요. 여백도 편곡의 중요한 부분일 수 있겠어요."],
      ["아환","그럼 이번엔 소리 사이의 공간에도 귀를 기울여봐요."]
    ],
    [
      ["아환","초대석에서 이야기할 때 가장 조심해야 하는 건 뭘까요?"],
      ["하린","상대가 말하고 있는데 다음 질문만 생각하는 거요."],
      ["윤솔","오늘은 제가 그 말을 좀 새겨들어야겠네요."],
      ["아환","하하, 저도요. 천천히 듣는 게 먼저죠."]
    ],
    [
      ["윤솔","노래가 끝난 뒤 첫마디를 바로 꺼내는 게 좋을까요?"],
      ["민혁","저는 잠깐 조용한 쪽이 좋아요. 곡이 끝났다고 감정도 바로 끝나는 건 아니니까요."],
      ["아환","좋은 말이네요. 다음 곡 전에 잠깐의 숨도 남겨두죠."]
    ],
    [
      ["아환","서로 다른 나라의 노래를 이어 듣는 재미는 뭘까요?"],
      ["린아","말을 전부 이해하지 못해도 리듬이나 목소리로 먼저 느낄 수 있다는 거요."],
      ["윤솔","맞아요. 그래서 언어가 바뀌면 듣는 마음도 새로워지는 것 같아요."]
    ],
    [
      ["아환","무대에서 가장 중요한 건 큰 조명일까요, 작은 표정일까요?"],
      ["강태준","가상의 무대라면 저는 노래가 시작되기 직전의 표정을 더 중요하게 생각할 것 같아요."],
      ["윤솔","그 짧은 순간이 다음 노래를 기대하게 하죠."],
      ["아환","좋아요. 이제 무대로 시선을 돌려볼게요."]
    ],
    [
      ["윤솔","노래가 끝나면 꼭 대단한 감상평을 해야 할까요?"],
      ["청호","그럴 필요 없죠. 가끔은 한마디면 충분하고, 어떤 곡은 그냥 다음 곡으로 이어도 좋잖아요."],
      ["아환","맞아요. 오늘은 우리 말보다 음악에 한 번 더 자리를 내주죠."]
    ]
  ];
  function clean(value,max=90){
    return String(value==null?"":value).replace(/[<>\u0000-\u001f\u007f]/g,"")
      .replace(/\s+/g," ").trim().slice(0,max);
  }
  function title(track){return clean(track&&track.title||"제목 없는 곡",80)||"제목 없는 곡";}
  function line(speaker,text,pauseMs=300,lang="ko-KR"){
    return {speaker,lang,text:clean(text,240),pauseMs};
  }
  function flow(value){return ["balanced","music","talk"].includes(value)?value:"balanced";}
  function ordinal(number){return Math.max(1,Math.floor(Number(number)||1));}
  function intro(track,number,setting="balanced"){
    const mode=flow(setting),n=ordinal(number),t=title(track);
    if(n===1){
      const first=[
        line("아환","안녕하세요. MARU RADIO의 아환입니다. 음악 한 곡씩 천천히 만나볼까요?",430),
        line("윤솔","저도 함께할게요. 오늘 첫 곡부터 들어보고 이야기 나눠요.",400),
        line("아환","첫 곡은 "+t+"입니다. 함께 들어보시죠.",250)
      ];
      if(track&&track.category==="CN")first.push(line("윤솔","接下来，请欣赏我们的原创歌曲。",260,"zh-CN"));
      if(track&&track.category==="WEST")first.push(line("강태준","And here is our first original song.",260,"en-US"));
      return first;
    }
    const turn=intros[(n-2)%intros.length](t);
    if(track&&track.category==="CN"&&n%3===0)return [
      line("윤솔","接下来，请欣赏《"+t+"》。",280,"zh-CN")
    ];
    if(track&&track.category==="WEST"&&n%3===0)return [
      line("강태준","Coming up next: "+t+".",280,"en-US")
    ];
    if(mode==="talk"&&n%4===0)return [
      line("아환","다음 곡은 어떨까요?"),
      line("윤솔","제목부터 들어볼게요. "+t+"입니다.")
    ];
    return [line(turn[0],turn[1],260)];
  }
  function after(track,number,setting="balanced"){
    const mode=flow(setting),n=ordinal(number);
    if(mode==="music"&&n%3!==0)return [];
    if(mode==="balanced"&&n%2===0)return [];
    const turn=endings[(n-1)%endings.length](title(track));
    return [line(turn[0],turn[1],450)];
  }
  function guestTalk(track,number,setting="balanced"){
    const mode=flow(setting),n=ordinal(number);
    if(mode==="music"||n<2)return [];
    if(mode==="balanced"&&n%3!==0)return [];
    if(mode==="talk"&&n%2!==0)return [];
    const category=track&&track.category||"KR";
    // Rotate through ten distinct discussion topics before a script repeats.
    const bank=[topics[category]||topics.KR,...extra];
    const interviewIndex=mode==="talk"?Math.floor(n/2)-1:Math.floor(n/3)-1;
    const turns=bank[((interviewIndex%bank.length)+bank.length)%bank.length];
    return turns.map((turn,i)=>line(turn[0],turn[1],i===turns.length-1?470:380));
  }
  return {intro,after,guestTalk,flow,clean};
});