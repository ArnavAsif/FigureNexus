/* ============================================================
   NEXUS QUIZ ENGINE v5 - Live Recommendations + Mission Briefings
   ============================================================ */
(function(){
'use strict';
var ST=6,LOAD_MS=4000,ini={};

/* ---- SVG ICONS ---- */
var IC={
  fighter:'<svg viewBox="0 0 48 48"><path d="M24 6L10 20h5v18h18V20h5L24 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="16" r="3" fill="currentColor" opacity=".5"/></svg>',
  sniper:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/><circle cx="24" cy="24" r="3" fill="currentColor" opacity=".6"/><line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" stroke-width="2"/><line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" stroke-width="2"/><line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" stroke-width="2"/><line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" stroke-width="2"/></svg>',
  stealth:'<svg viewBox="0 0 48 48"><path d="M24 6c-8 0-14 6-14 14 0 10 14 22 14 22s14-12 14-22c0-8-6-14-14-14z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="18" r="2.5" fill="currentColor" opacity=".6"/><circle cx="28" cy="18" r="2.5" fill="currentColor" opacity=".6"/></svg>',
  leader:'<svg viewBox="0 0 48 48"><path d="M24 4L6 14v20l18 10 18-10V14L24 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6 14l18 10 18-10" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  collector:'<svg viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 16l8-8h16l8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  casual:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 20s2 4 6 4 6-4 6-4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="16" r="2" fill="currentColor" opacity=".5"/><circle cx="30" cy="16" r="2" fill="currentColor" opacity=".5"/></svg>',
  hoodie:'<svg viewBox="0 0 48 48"><path d="M10 42V18l6-10h16l6 10v24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 18c4-4 8-2 14-2s10-2 14 2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  tshirt:'<svg viewBox="0 0 48 48"><path d="M12 42V18l6-10h12l6 10v24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 18c4-4 8-2 12-2s8-2 12 2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  figure:'<svg viewBox="0 0 48 48"><circle cx="24" cy="10" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 18h12v10l-3 8h-6l-3-8V18z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 22l-6 4M34 22l6 4" stroke="currentColor" stroke-width="2"/></svg>',
  weapon:'<svg viewBox="0 0 48 48"><path d="M8 24l14-14h10l8 8-14 14-10-10-8 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 32l-4 8M30 24l8 8" stroke="currentColor" stroke-width="2"/></svg>',
  accessory:'<svg viewBox="0 0 48 48"><path d="M24 8l-16 8v16l16 8 16-8V16L24 8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M24 8v32M8 16l16 8 16-8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".4"/></svg>',
  gaming:'<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><line x1="24" y1="34" x2="24" y2="40" stroke="currentColor" stroke-width="2"/><line x1="16" y1="40" x2="32" y2="40" stroke="currentColor" stroke-width="2"/></svg>',
  cyber:'<svg viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="2" fill="currentColor" opacity=".5"/></svg>',
  fire:'<svg viewBox="0 0 48 48"><path d="M24 4c2 8-6 12-6 20a8 8 0 0 0 16 0c0-8-8-12-6-20h-4z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  military:'<svg viewBox="0 0 48 48"><path d="M24 4L8 12v12c0 10 16 18 16 18s16-8 16-18V12L24 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  neon:'<svg viewBox="0 0 48 48"><polygon points="28,4 12,24 22,24 20,44 36,24 26,24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  dark:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="24" cy="24" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/></svg>',
  br:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".4"/></svg>',
  wallet:'<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 18h40" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  banknote:'<svg viewBox="0 0 48 48"><rect x="4" y="12" width="40" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  credit:'<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><line x1="4" y1="20" x2="44" y2="20" stroke="currentColor" stroke-width="2"/></svg>',
  crown:'<svg viewBox="0 0 48 48"><path d="M8 36h32" stroke="currentColor" stroke-width="2"/><path d="M10 36l4-20 10 10 4-14 4 14 10-10 4 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  solo:'<svg viewBox="0 0 48 48"><circle cx="24" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 42v-6c0-6 4-10 10-10s10 4 10 10v6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  duo:'<svg viewBox="0 0 48 48"><circle cx="16" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 42v-4c0-5 3-8 8-8M40 42v-4c0-5-3-8-8-8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  squad:'<svg viewBox="0 0 48 48"><circle cx="14" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 42v-4c0-4 3-7 8-7M42 42v-4c0-4-3-7-8-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  trophy:'<svg viewBox="0 0 48 48"><path d="M14 8h20v12a10 10 0 0 1-20 0V8z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 12H8a4 4 0 0 0 0 8h2M34 12h6a4 4 0 0 1 0 8h-2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="24" y1="30" x2="24" y2="36" stroke="currentColor" stroke-width="2"/><line x1="18" y1="36" x2="30" y2="36" stroke="currentColor" stroke-width="2"/></svg>',
  custom:'<svg viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="24" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30 21v6M27 24h6" stroke="currentColor" stroke-width="1.5"/></svg>',
  casual2:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 20s2 4 6 4 6-4 6-4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="16" r="2" fill="currentColor" opacity=".5"/><circle cx="30" cy="16" r="2" fill="currentColor" opacity=".5"/></svg>',
  rifle:'<svg viewBox="0 0 80 80"><path d="M10 40l25-15h15l15 8-25 15-15-8-15 5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M35 55l-8 15M50 40l15 15" stroke="currentColor" stroke-width="1.5"/></svg>',
  chk:'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="3" fill="none"/></svg>',
  x:'<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/></svg>',
  arr:'<svg viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
  arrL:'<svg viewBox="0 0 24 24"><path d="M19 12H5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
  refresh:'<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
  target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
  pkg:'<svg viewBox="0 0 24 24"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
  eye:'<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
  cart:'<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.5" fill="currentColor"/><circle cx="20" cy="21" r="1.5" fill="currentColor"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" stroke-width="2" fill="none"/></svg>'
};

/* ---- QUESTIONS ---- */
var QS=[
  {key:'playerStyle',title:'WHAT KIND OF SURVIVOR ARE YOU?',sub:'Choose the style that defines your gameplay.',brief:'Choose the combat style that best represents your battlefield strategy.',icon:IC.target,
   opts:[
     {id:'fighter',label:'Aggressive Fighter',desc:'I go in, I fight, I come out on top.',icon:IC.fighter,tags:['fighter','aggressive','combat','battle','warrior','fight'],clr:'#ff5b1a',bg:'linear-gradient(180deg,#2a1a0e,#1a0e06)'},
     {id:'sniper',label:'Sniper',desc:'I take my shot from far away.',icon:IC.sniper,tags:['sniper','precision','long-range','aim'],clr:'#22c55e',bg:'linear-gradient(180deg,#0e1a14,#060d0a)'},
     {id:'stealth',label:'Stealth Assassin',desc:'I move in silence. I strike in shadows.',icon:IC.stealth,tags:['stealth','assassin','shadow','ninja'],clr:'#a855f7',bg:'linear-gradient(180deg,#1a0e2a,#0d0616)'},
     {id:'leader',label:'Squad Leader',desc:'I lead, I strategize, we win together.',icon:IC.leader,tags:['leader','squad','command','captain'],clr:'#FFB000',bg:'linear-gradient(180deg,#2a2210,#161208)'},
     {id:'collector',label:'Collector',desc:'I collect everything that stands out.',icon:IC.collector,tags:['collector','rare','exclusive','special'],clr:'#06b6d4',bg:'linear-gradient(180deg,#0e1a22,#060d12)'},
     {id:'casual',label:'Casual Player',desc:'I play for fun and the thrill.',icon:IC.casual,tags:['casual','relax','chill','fun','easy'],clr:'#ef4444',bg:'linear-gradient(180deg,#22120e,#120806)'}
   ]},
  {key:'favoriteProduct',title:'WHAT EXCITES YOU THE MOST?',sub:'Pick your gear category.',brief:'Select the type of gear you enjoy collecting the most.',icon:IC.pkg,
   opts:[
     {id:'hoodie',label:'Premium Hoodies',desc:'Wear the battlefield everywhere.',icon:IC.hoodie,tags:['hoodie','hoodies','premium','wearable','sweatshirt','jacket'],clr:'#FFB000',bg:'linear-gradient(180deg,#1a1a10,#0d0d06)'},
     {id:'tshirt',label:'Graphic T-Shirts',desc:'Make a statement with your style.',icon:IC.tshirt,tags:['tshirt','t-shirt','graphic','tee','shirt','apparel'],clr:'#FF7A00',bg:'linear-gradient(180deg,#1a1408,#0d0a04)'},
     {id:'figure',label:'Action Figures',desc:'Collectible legends for your shelf.',icon:IC.figure,tags:['figure','figures','collectible','toy','figurine'],clr:'#a855f7',bg:'linear-gradient(180deg,#1a0e22,#0d0612)'},
     {id:'weapon',label:'Weapon Replicas',desc:'Display-worthy arsenal pieces.',icon:IC.weapon,tags:['weapon','replica','prop','blade','sword'],clr:'#ef4444',bg:'linear-gradient(180deg,#220e0e,#120606)'},
     {id:'accessory',label:'Accessories',desc:'Complete your tactical loadout.',icon:IC.accessory,tags:['accessory','accessories','gear','gadget','chain','bag'],clr:'#06b6d4',bg:'linear-gradient(180deg,#0e1a20,#060d10)'},
     {id:'gaming',label:'Gaming Setup',desc:'Build your ultimate war station.',icon:IC.gaming,tags:['gaming','setup','desk','mousepad','keyboard'],clr:'#22c55e',bg:'linear-gradient(180deg,#0e1a12,#060d08)'}
   ]},
  {key:'theme',title:'CHOOSE YOUR FAVORITE THEME',sub:'Match your aesthetic to your gear.',brief:'Pick the visual theme that matches your personality.',icon:IC.cyber,
   opts:[
     {id:'cyber',label:'Cyber Future',desc:'Tech-noir vibes from tomorrow.',icon:IC.cyber,tags:['cyber','future','tech','technology','digital','sci-fi'],clr:'#06b6d4',bg:'linear-gradient(180deg,#0e1620,#060b10)'},
     {id:'fire',label:'Fire',desc:'Burn bright, burn hot.',icon:IC.fire,tags:['fire','flame','burn','hot','inferno'],clr:'#ef4444',bg:'linear-gradient(180deg,#200e08,#100604)'},
     {id:'military',label:'Military',desc:'Tactical precision always.',icon:IC.military,tags:['military','tactical','army','soldier','combat'],clr:'#22c55e',bg:'linear-gradient(180deg,#0e1a10,#060d08)'},
     {id:'neon',label:'Neon',desc:'Electric glow energy.',icon:IC.neon,tags:['neon','glow','electric','light','bright'],clr:'#a855f7',bg:'linear-gradient(180deg,#1a0e28,#0d0614)'},
     {id:'dark',label:'Dark Tactical',desc:'Silent stealth operations.',icon:IC.dark,tags:['dark','tactical','shadow','stealth','black'],clr:'#6b7280',bg:'linear-gradient(180deg,#121214,#090910)'},
     {id:'br',label:'Classic Battle Royale',desc:'OG survivor style forever.',icon:IC.br,tags:['battle','royale','classic','survivor','original'],clr:'#FFB000',bg:'linear-gradient(180deg,#1a1810,#0d0c08)'}
   ]},
  {key:'color',title:'PICK YOUR FAVORITE COLOR',sub:'Your signature hue for all gear.',brief:'Choose your preferred color palette for your equipment.',icon:IC.target,
   colors:[
     {id:'yellow',label:'Yellow',hex:'#FFC72C',tags:['yellow','gold','golden']},
     {id:'orange',label:'Orange',hex:'#FF7A00',tags:['orange','amber']},
     {id:'black',label:'Black',hex:'#1a1a2e',tags:['black','dark','midnight']},
     {id:'purple',label:'Purple',hex:'#9333ea',tags:['purple','violet']},
     {id:'blue',label:'Blue',hex:'#3b82f6',tags:['blue','azure','navy']},
     {id:'red',label:'Red',hex:'#ef4444',tags:['red','crimson','scarlet']}
   ]},
  {key:'budget',title:"WHAT'S YOUR BUDGET?",sub:'Set your spending range.',brief:'Set your preferred budget to personalize your loadout.',icon:IC.wallet,
   opts:[
     {id:'low',label:'Starter',range:'$20 - $50',icon:IC.wallet,tags:['budget','cheap','affordable','starter']},
     {id:'mid',label:'Standard',range:'$50 - $100',icon:IC.banknote,tags:['mid-range','standard','regular']},
     {id:'high',label:'Premium',range:'$100 - $250',icon:IC.credit,tags:['premium','high-end','deluxe','pro']},
     {id:'unlimited',label:'Unlimited',range:'No Limit',icon:IC.crown,tags:['unlimited','no-limit','whale','ultimate']}
   ]},
  {key:'gameMode',title:'HOW DO YOU USUALLY PLAY?',sub:'Your preferred combat mode.',brief:'Tell us how you usually enter the battlefield.',icon:IC.squad,
   opts:[
     {id:'solo',label:'Solo',desc:'Lone wolf operations.',icon:IC.solo,tags:['solo','lone','individual','private']},
     {id:'duo',label:'Duo',desc:'Best partner wins every time.',icon:IC.duo,tags:['duo','partner','pair','buddy']},
     {id:'squad',label:'Squad',desc:'Team up and dominate.',icon:IC.squad,tags:['squad','team','group','crew']},
     {id:'rank',label:'Rank Push',desc:'Climb to the top of leaderboards.',icon:IC.trophy,tags:['rank','competitive','push','pro']},
     {id:'custom',label:'Custom Rooms',desc:'Host private tactical matches.',icon:IC.custom,tags:['custom','private','room','host']},
     {id:'casual2',label:'Casual',desc:'Play for pure enjoyment.',icon:IC.casual2,tags:['casual','fun','relax','play']}
   ]}
];

var STEP_LABELS=['PLAY STYLE','PRODUCT TYPE','THEME','COLOR','BUDGET','GAME MODE'];
var MSGS=['Initializing AI scanner...','Checking inventory...','Scanning player profile...','Analyzing combat style...','Matching battle personality...','Finding best equipment...','Almost ready...'];

var S={step:0,ans:{},open:false},sid=null;
var allProducts=null; /* cached product list */

function $(s,c){return(c||document).querySelector(s)}
function $$(s,c){return Array.from((c||document).querySelectorAll(s))}
function save(){try{localStorage.setItem('nxq_p',JSON.stringify({a:S.ans,s:S.step}))}catch(e){}}
function load(){try{var d=JSON.parse(localStorage.getItem('nxq_p'));if(d&&d.a)return d}catch(e){}return null}
function clr(){try{localStorage.removeItem('nxq_p')}catch(e){}}

/* ---- BUILD ---- */
function build(id){
  var m=document.createElement('div');m.className='nxq-m';m.id='nxq-m-'+id;
  var hexes='';for(var i=0;i<ST;i++){hexes+='<div class="nxq-hex" id="nxq-hex-'+i+'-'+id+'">'+(i+1)+'<span class="nxq-hex-label">'+STEP_LABELS[i]+'</span></div>';if(i<ST-1)hexes+='<div class="nxq-hex-line"></div>';}

  m.innerHTML='<div class="nxq-bg"><div class="nxq-glow1"></div><div class="nxq-glow2"></div></div><div class="nxq-over"></div>'+
  '<div class="nxq-frame">'+
    '<div class="nxq-top">'+
      '<div class="nxq-top-left"><h2>MISSION SETUP</h2><p>FIND YOUR PERFECT BATTLE GEAR</p><span class="nxq-stepof" id="nxq-sof-'+id+'">STEP 1 OF 6</span></div>'+
      '<div class="nxq-steps">'+hexes+'</div>'+
      '<div class="nxq-top-right">'+
        '<div class="nxq-timer"><span>TIME REMAINING</span><strong>15 SEC</strong></div>'+
        '<button class="nxq-x" id="nxq-x-'+id+'">'+IC.x+'</button>'+
      '</div>'+
    '</div>'+
    '<div class="nxq-body" id="nxq-body-'+id+'">'+
      '<div class="nxq-qside" id="nxq-qside-'+id+'">'+
        '<div class="nxq-qnum" id="nxq-qnum-'+id+'">1 / 6</div>'+
        '<h3 class="nxq-qtitle" id="nxq-qtitle-'+id+'"></h3>'+
        '<p class="nxq-qsub" id="nxq-qsub-'+id+'"></p>'+
        '<div class="nxq-brief" id="nxq-brief-'+id+'"></div>'+
      '</div>'+
      '<div class="nxq-row" id="nxq-row-'+id+'"></div>'+
      '<div class="nxq-side" id="nxq-side-'+id+'">'+
        '<div class="nxq-side-label">AI RECOMMENDATION</div>'+
        '<div class="nxq-side-title">PERFECT LOADOUT</div>'+
        '<div class="nxq-side-sub" id="nxq-side-sub-'+id+'">Answer questions to refine</div>'+
        '<div class="nxq-weapon" id="nxq-weapon-'+id+'">'+
          '<div class="nxq-weapon-ring"></div><div class="nxq-weapon-ring"></div><div class="nxq-weapon-ring"></div>'+
          '<div class="nxq-weapon-glow"></div>'+
          '<div class="nxq-weapon-icon">'+IC.rifle+'</div>'+
        '</div>'+
        '<div class="nxq-product-slot" id="nxq-pslot-'+id+'"></div>'+
        '<div class="nxq-side-stats" id="nxq-side-stats-'+id+'">'+
          '<div class="nxq-stat"><div class="nxq-stat-label">SMART MATCH</div><div class="nxq-stat-val">AI ANALYZING</div></div>'+
          '<div class="nxq-stat"><div class="nxq-stat-label">BEST PICKS</div><div class="nxq-stat-val">PERSONALIZED</div></div>'+
          '<div class="nxq-stat"><div class="nxq-stat-label">BATTLE READY</div><div class="nxq-stat-val">GAME PROVEN</div></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="nxq-bot">'+
      '<div class="nxq-bot-left"><button class="nxq-btn nxq-btn-sk" id="nxq-sk-'+id+'">'+IC.arrL+' SKIP</button></div>'+
      '<div class="nxq-bot-center">'+
        '<button class="nxq-btn nxq-btn-bk" id="nxq-bk-'+id+'">'+IC.arrL+' BACK</button>'+
        '<button class="nxq-btn nxq-btn-nx" id="nxq-nx-'+id+'" disabled>NEXT '+IC.arr+'</button>'+
      '</div>'+
      '<div class="nxq-bot-right"></div>'+
    '</div>'+
    '<div class="nxq-load" id="nxq-load-'+id+'">'+
      '<div class="nxq-load-radar" style="position:relative">'+
        '<div class="nxq-load-ring"></div><div class="nxq-load-ring"></div><div class="nxq-load-ring"></div><div class="nxq-load-ring"></div>'+
        '<div class="nxq-load-sweep"></div><div class="nxq-load-dot"></div><div class="nxq-load-cross"></div>'+
      '</div>'+
      '<div class="nxq-load-pct" id="nxq-pct-'+id+'">0%</div>'+
      '<div class="nxq-load-title">Analyzing Your <b>Combat Style</b></div>'+
      '<div class="nxq-load-bar"><div class="nxq-load-bar-fill" id="nxq-bar-'+id+'"></div></div>'+
      '<div class="nxq-load-msg" id="nxq-msg-'+id+'">Initializing...</div>'+
    '</div>'+
  '</div>';
  document.body.appendChild(m);return m;
}

/* ---- FETCH PRODUCTS (once) ---- */
function fetchProducts(){
  if(allProducts)return Promise.resolve(allProducts);
  return fetch('/collections/all/products.json?limit=250').then(function(r){return r.json()}).then(function(d){
    allProducts=(d.products||[]).filter(function(p){return p.variants&&p.variants.some(function(v){return v.available})});
    if(!allProducts.length)return fetch('/products.json?limit=250').then(function(r){return r.json()}).then(function(d2){allProducts=d2.products||[];return allProducts});
    return allProducts;
  }).catch(function(){
    return fetch('/products.json?limit=250').then(function(r){return r.json()}).then(function(d){allProducts=d.products||[];return allProducts}).catch(function(){allProducts=[];return allProducts});
  });
}

/* ---- SCORING ---- */
function score(prods){
  var at=[];Object.keys(S.ans).forEach(function(k){var a=S.ans[k];if(a&&a.t)at=at.concat(a.t);});
  if(!at.length)return prods.map(function(p){return{p:p,s:Math.random()*5}});
  return prods.map(function(p){
    var pt=(p.tags||[]).map(function(t){return t.toLowerCase().trim()});
    var tl=(p.title||'').toLowerCase(),vl=(p.vendor||'').toLowerCase(),pl=(p.product_type||'').toLowerCase();
    var sc=0;
    at.forEach(function(tag){
      var tgl=tag.toLowerCase();
      pt.forEach(function(t){if(t===tgl)sc+=10;else if(t.indexOf(tgl)!==-1||tgl.indexOf(t)!==-1)sc+=5;else if(t.split(' ').indexOf(tgl)!==-1)sc+=3;});
      if(tl.indexOf(tgl)!==-1)sc+=6;if(vl.indexOf(tgl)!==-1)sc+=3;if(pl.indexOf(tgl)!==-1)sc+=4;
    });
    sc+=Math.random()*2;return{p:p,s:sc};
  }).sort(function(a,b){return b.s-a.s});
}

/* ---- LIVE SIDEBAR UPDATE ---- */
function updateSidebar(){
  if(!sid||!allProducts)return;
  var scored=score(allProducts);
  if(!scored.length)return;
  var best=scored[0].p;
  var v=best.variants.find(function(v){return v.available})||best.variants[0];
  var img=best.images&&best.images[0]?best.images[0].src:'';
  var price='$'+(v.price/100).toFixed(2);
  var compare=(v.compare_at_price&&v.compare_at_price>v.price)?'$'+(v.compare_at_price/100).toFixed(2):'';
  var avail=v.available;

  var weapon=$('#nxq-weapon-'+sid);
  var pslot=$('#nxq-pslot-'+sid);
  var sideSub=$('#nxq-side-sub-'+sid);
  var sideStats=$('#nxq-side-stats-'+sid);
  var answersCount=Object.keys(S.ans).length;
  var isComplete=answersCount>=ST;
  var blurClass=isComplete?'':' nxq-pslot--pending';

  if(weapon)weapon.style.display='none';
  if(pslot){
    pslot.style.display='block';
    pslot.className='nxq-product-slot'+blurClass;
    pslot.innerHTML=
      (img?'<div class="nxq-pslot-img"><img src="'+img+'" alt="'+(best.title||'').replace(/"/g,'&quot;')+'"></div>':'')+
      '<div class="nxq-pslot-name">'+(best.title||'')+'</div>'+
      '<div class="nxq-pslot-desc">'+((best.description||'').replace(/(<([^>]+)>)/gi,'').substring(0,60)+(best.description&&best.description.length>60?'...':''))+'</div>'+
      '<div class="nxq-pslot-price">'+price+(compare?' <span>'+compare+'</span>':'')+'</div>'+
      '<div class="nxq-pslot-stars">&#9733;&#9733;&#9733;&#9733;&#9733; <span>(128)</span></div>'+
      '<div class="nxq-pslot-status'+(avail?' nxq-pslot-status--in':' nxq-pslot-status--out')+'">'+(avail?'IN STOCK':'SOLD OUT')+'</div>'+
      '<div class="nxq-pslot-btns">'+
        '<button class="nxq-pslot-btn nxq-pslot-btn--primary" data-handle="'+best.handle+'">View Loadout</button>'+
        (avail?'<button class="nxq-pslot-btn nxq-pslot-btn--secondary" data-variant="'+v.id+'">Add to Cart</button>':'')+
      '</div>';
    /* Wire buttons */
    var pbtn=pslot.querySelector('.nxq-pslot-btn--primary');
    if(pbtn)pbtn.addEventListener('click',function(){window.open('/products/'+this.getAttribute('data-handle'),'_blank');});
    var abtn=pslot.querySelector('.nxq-pslot-btn--secondary');
    if(abtn)abtn.addEventListener('click',function(e){
      e.stopPropagation();var vid=parseInt(this.getAttribute('data-variant'));if(!vid)return;
      var self=this;self.textContent='ADDING...';self.disabled=true;
      fetch(window.Shopify.routes.root+'cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id:vid,quantity:1}]})}).then(function(){
        self.textContent='ADDED!';document.dispatchEvent(new CustomEvent('cart:build'));
        if(window.NexusCart){NexusCart.fetchCart();NexusCart.open();}
        setTimeout(function(){self.textContent='ADD TO CART';self.disabled=false},2000);
      }).catch(function(){self.textContent='ADD TO CART';self.disabled=false});
    });
  }
  if(sideSub)sideSub.textContent=answersCount===0?'Answer questions to refine':'Based on '+answersCount+' answer'+(answersCount>1?'s':'');
  if(sideStats){sideStats.innerHTML=
    '<div class="nxq-stat"><div class="nxq-stat-label">SMART MATCH</div><div class="nxq-stat-val">'+(isComplete?'TOP RESULT':'REFINING...')+'</div></div>'+
    '<div class="nxq-stat"><div class="nxq-stat-label">BEST PICK</div><div class="nxq-stat-val">'+answersCount+'/'+ST+' ANSWERED</div></div>'+
    '<div class="nxq-stat"><div class="nxq-stat-label">BATTLE READY</div><div class="nxq-stat-val">'+(isComplete?'VERIFIED':'SCANNING')+'</div></div>';
  }
}

/* ---- RENDER STEP ---- */
function renderStep(idx){
  var id=sid,q=QS[idx],isC=q.key==='color',isB=q.key==='budget';
  /* Update question side */
  var qn=$('#nxq-qnum-'+id);if(qn)qn.textContent=(idx+1)+' / '+ST;
  var qt=$('#nxq-qtitle-'+id);if(qt)qt.textContent=q.title;
  var qs=$('#nxq-qsub-'+id);if(qs)qs.textContent=q.sub;
  var brief=$('#nxq-brief-'+id);if(brief)brief.textContent=q.brief;
  /* Update hexes */
  for(var i=0;i<ST;i++){var h=$('#nxq-hex-'+i+'-'+id);if(!h)continue;h.className='nxq-hex'+(i===idx?' active':i<idx?' done':'');}
  var sl=$('#nxq-sof-'+id);if(sl)sl.textContent='STEP '+(idx+1)+' OF '+ST;
  /* Render cards */
  var row=$('#nxq-row-'+id);if(!row)return;
  if(isC){
    row.innerHTML='<div class="nxq-colors" style="width:100%">'+q.colors.map(function(c){
      return '<div class="nxq-clr" data-key="'+q.key+'" data-value="'+c.id+'" data-tags="'+c.tags.join(',')+'" style="--c:'+c.hex+'">'+
        '<div class="nxq-clr-bg" style="background:'+c.hex+'"></div><div class="nxq-clr-ring"></div>'+
        '<div class="nxq-clr-check">'+IC.chk+'</div><span class="nxq-clr-lbl">'+c.label+'</span></div>';
    }).join('')+'</div>';
  }else if(isB){
    var bImgs=window.NXQ_IMAGES&&window.NXQ_IMAGES['s'+(idx+1)];
    row.innerHTML='<div class="nxq-bud-row" style="margin:0 auto">'+q.opts.map(function(o,ci){
      var bImgUrl=bImgs&&bImgs['c'+(ci+1)];
      var bgStyle=bImgUrl?'background-image:url('+bImgUrl+');background-size:cover;background-position:center':'';
      var iconHtml=bImgUrl?'<div class="nxq-bud-icon nxq-bud-icon--img"><img src="'+bImgUrl+'" alt="'+o.label+'"></div>':'<div class="nxq-bud-icon">'+o.icon+'</div>';
      return '<div class="nxq-bud" data-key="'+q.key+'" data-value="'+o.id+'" data-tags="'+o.tags.join(',')+'">'+
        '<div class="nxq-bud-bg" style="'+bgStyle+'"></div>'+
        '<div class="nxq-bud-check">'+IC.chk+'</div>'+
        iconHtml+'<div class="nxq-bud-lbl">'+o.label+'</div><div class="nxq-bud-rng">'+o.range+'</div></div>';
    }).join('')+'</div>';
  }else{
    var imgs=window.NXQ_IMAGES&&window.NXQ_IMAGES['s'+(idx+1)];
    row.innerHTML=q.opts.map(function(o,ci){
      var imgUrl=imgs&&imgs['c'+(ci+1)];
      var bgStyle=imgUrl?'background-image:url('+imgUrl+');background-size:cover;background-position:center':'background:'+o.bg;
      var iconHtml=imgUrl?'<div class="nxq-char-icon nxq-char-icon--img" style="--clr:'+o.clr+'"><img src="'+imgUrl+'" alt="'+o.label+'"></div>':'<div class="nxq-char-icon" style="--clr:'+o.clr+'">'+o.icon+'</div>';
      return '<div class="nxq-char" data-key="'+q.key+'" data-value="'+o.id+'" data-tags="'+o.tags.join(',')+'" style="--glow:'+o.clr+'">'+
        '<div class="nxq-char-bg" style="'+bgStyle+'"></div>'+
        '<div class="nxq-char-content">'+iconHtml+'<div class="nxq-char-name">'+o.label+'</div><div class="nxq-char-desc">'+o.desc+'</div></div></div>';
    }).join('');
  }
  /* Restore selection */
  if(S.ans[q.key]){
    var v=S.ans[q.key].v;
    var sl2=isC?'.nxq-clr':isB?'.nxq-bud':'.nxq-char';
    var m=$(sl2+'[data-value="'+v+'"]',row);if(m)m.classList.add('sel');
  }
}

/* ---- PARTICLES ---- */
function mkEmbers(c){
  var n=window.innerWidth<768?12:24;
  for(var i=0;i<n;i++){
    var p=document.createElement('div');p.className='nxq-ember';
    var s=Math.random()*3+1.5;
    var colors=['rgba(255,176,0,.7)','rgba(255,120,0,.6)','rgba(255,200,100,.5)','rgba(255,140,0,.4)'];
    p.style.cssText='left:'+(Math.random()*100)+'%;width:'+s+'px;height:'+s+'px;background:'+colors[Math.floor(Math.random()*colors.length)]+';animation-duration:'+(Math.random()*5+4)+'s;animation-delay:'+(Math.random()*6)+'s;--dx:'+(Math.random()*50-25)+'px;box-shadow:0 0 '+(s*2)+'px currentColor;';
    c.appendChild(p);
  }
}

/* ---- SELECTION ---- */
function pick(el){
  var k=el.getAttribute('data-key'),v=el.getAttribute('data-value'),t=el.getAttribute('data-tags')||'';
  var isC=el.classList.contains('nxq-clr'),isB=el.classList.contains('nxq-bud');
  var sel=isC?'.nxq-clr':isB?'.nxq-bud':'.nxq-char';
  var p=el.closest(isC?'.nxq-colors':isB?'.nxq-bud-row':'.nxq-row');
  if(p)$$(sel,p).forEach(function(s){s.classList.remove('sel')});
  el.classList.add('sel');
  S.ans[k]={v:v,t:t.split(',').filter(Boolean)};save();updNav();
}

/* ---- NAV ---- */
function updNav(){
  if(!sid)return;
  var q=QS[S.step],has=q&&S.ans[q.key];
  var nx=$('#nxq-nx-'+sid),bk=$('#nxq-bk-'+sid),sk=$('#nxq-sk-'+sid),sof=$('#nxq-sof-'+sid);
  if(nx){nx.disabled=!has;nx.innerHTML=(S.step===ST-1?'ANALYZE ':'NEXT ')+IC.arr;}
  if(bk)bk.style.display=S.step===0?'none':'';
  if(sk)sk.style.display=S.step===ST-1?'none':'';
  if(sof)sof.textContent='STEP '+(S.step+1)+' OF '+ST;
}

function go(step){
  if(!sid||step<0||step>=ST)return;
  S.step=step;save();renderStep(step);updNav();
}
function next(){S.step===ST-1?loadAnim():go(S.step+1)}
function prev(){if(S.step>0)go(S.step-1)}
function skip(){var q=QS[S.step];if(q)delete S.ans[q.key];next()}

/* ---- LOADING ---- */
function loadAnim(){
  if(!sid)return;
  var body=$('#nxq-body-'+sid),ld=$('#nxq-load-'+sid);
  if(body)body.style.display='none';if(ld)ld.classList.add('on');
  var bar=$('#nxq-bar-'+sid),pct=$('#nxq-pct-'+sid),msg=$('#nxq-msg-'+sid),prog=0,mi=0;
  var iv=setInterval(function(){
    prog+=Math.random()*3+1;if(prog>100)prog=100;
    if(bar)bar.style.width=prog+'%';if(pct)pct.textContent=Math.floor(prog)+'%';
    if(prog>(mi+1)*(100/MSGS.length)&&mi<MSGS.length-1){mi++;if(msg)msg.textContent=MSGS[mi];}
    if(prog>=100){clearInterval(iv);setTimeout(showResult,500);}
  },LOAD_MS/30);
}

var ANSWER_KEYS=['playerStyle','favoriteProduct','theme','color','budget','gameMode'];

/* ---- SHOW RESULT ---- */
function showResult(){
  if(!sid)return;
  var m=document.getElementById('nxq-m-'+sid);
  var ld=$('#nxq-load-'+sid),body=$('#nxq-body-'+sid),bot=$('.nxq-bot',m),top=$('.nxq-top',m);
  if(ld)ld.classList.remove('on');
  if(bot)bot.style.display='none';
  clr();

  /* Update top bar */
  if(top)top.innerHTML='<div class="nxq-top-left"><h2>MISSION COMPLETE</h2><p>FIND YOUR PERFECT BATTLE GEAR</p></div>'+
    '<div class="nxq-steps">'+ANSWER_KEYS.map(function(_,i){return '<div class="nxq-hex done">'+(i+1)+'</div>'+(i<5?'<div class="nxq-hex-line"></div>':'');}).join('')+'</div>'+
    '<div class="nxq-top-right"><div class="nxq-top-right-title">MISSION COMPLETE</div><button class="nxq-x" id="nxq-x-'+sid+'">'+IC.x+'</button></div>';
  var xb=$('#nxq-x-'+sid);if(xb)xb.addEventListener('click',function(){closeQuiz(sid);});

  /* Show body */
  if(body)body.style.display='';

  if(!allProducts||!allProducts.length){
    if(body){body.className='nxq-body nxq-rview';
      body.innerHTML='<div class="nxq-rleft"><div class="nxq-rleft-top"><h2 class="nxq-rl-title">MISSION<br><span>COMPLETE</span></h2><h3 class="nxq-rl-sub">YOUR PERFECT LOADOUT<br>IS READY!</h3><p class="nxq-rl-desc">We analyzed your answers and found the gear that fits you best.</p></div><div class="nxq-rl-browse"><div class="nxq-rl-browse-row"><div class="nxq-rl-browse-icon">'+IC.pkg+'</div><div class="nxq-rl-browse-text"><h4>UNLOCK MORE<br>EXCLUSIVE GEAR</h4><p>Explore more collections and limited editions.</p></div></div><button class="nxq-rl-browse-btn" onclick="window.location.href=\'/collections\'">BROWSE COLLECTIONS '+IC.arr+'</button></div></div>'+
        '<div class="nxq-rcenter"><div class="nxq-rc-logo">'+IC.leader+'</div><div class="nxq-rc-match">YOU FOUND YOUR <span>PERFECT MATCH</span></div><div class="nxq-rc-desc">Based on your play style and preferences,<br>this gear is selected just for you.</div><div class="nxq-rc-features"><div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#ff5b1a">'+IC.fighter+'</div><div class="nxq-rc-feat-title">TAILORED TO YOU</div><div class="nxq-rc-feat-desc">Matches your play style</div></div><div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#FFB000">'+IC.leader+'</div><div class="nxq-rc-feat-title">BATTLE TESTED</div><div class="nxq-rc-feat-desc">Trusted by warriors</div></div><div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#22c55e">'+IC.collector+'</div><div class="nxq-rc-feat-title">TOP QUALITY</div><div class="nxq-rc-feat-desc">Premium gear for real champions</div></div></div></div>'+
        '<div class="nxq-rright"><div class="nxq-rr-label">AI RECOMMENDATION</div><div class="nxq-rr-title">PERFECT LOADOUT</div><div class="nxq-rr-sub">Browse our collection to find your perfect gear.</div><div class="nxq-rr-btns"><button class="nxq-rr-btn nxq-rr-btn--view" onclick="window.location.href=\'/collections\'">BROWSE COLLECTIONS</button></div></div>';
    }
    return;
  }

  var scored=score(allProducts);
  if(!scored.length){
    if(body){body.className='nxq-body nxq-rview';
      body.innerHTML='<div class="nxq-rleft"><div class="nxq-rleft-top"><h2 class="nxq-rl-title">MISSION<br><span>COMPLETE</span></h2><h3 class="nxq-rl-sub">YOUR PERFECT LOADOUT<br>IS READY!</h3><p class="nxq-rl-desc">We analyzed your answers and found the gear that fits you best.</p></div><div class="nxq-rl-browse"><div class="nxq-rl-browse-row"><div class="nxq-rl-browse-icon">'+IC.pkg+'</div><div class="nxq-rl-browse-text"><h4>UNLOCK MORE<br>EXCLUSIVE GEAR</h4><p>Explore more collections and limited editions.</p></div></div><button class="nxq-rl-browse-btn" onclick="window.location.href=\'/collections\'">BROWSE COLLECTIONS '+IC.arr+'</button></div></div>'+
        '<div class="nxq-rcenter"><div class="nxq-rc-logo">'+IC.leader+'</div><div class="nxq-rc-match">YOU FOUND YOUR <span>PERFECT MATCH</span></div><div class="nxq-rc-desc">Based on your play style and preferences,<br>this gear is selected just for you.</div><div class="nxq-rc-features"><div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#ff5b1a">'+IC.fighter+'</div><div class="nxq-rc-feat-title">TAILORED TO YOU</div><div class="nxq-rc-feat-desc">Matches your play style</div></div><div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#FFB000">'+IC.leader+'</div><div class="nxq-rc-feat-title">BATTLE TESTED</div><div class="nxq-rc-feat-desc">Trusted by warriors</div></div><div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#22c55e">'+IC.collector+'</div><div class="nxq-rc-feat-title">TOP QUALITY</div><div class="nxq-rc-feat-desc">Premium gear for real champions</div></div></div></div>'+
        '<div class="nxq-rright"><div class="nxq-rr-label">AI RECOMMENDATION</div><div class="nxq-rr-title">PERFECT LOADOUT</div><div class="nxq-rr-sub">Browse our collection to find your perfect gear.</div><div class="nxq-rr-btns"><button class="nxq-rr-btn nxq-rr-btn--view" onclick="window.location.href=\'/collections\'">BROWSE COLLECTIONS</button></div></div>';
    }
    return;
  }

  var best=scored[0].p;
  var v=best.variants.find(function(v){return v.available})||best.variants[0];
  var img=best.images&&best.images[0]?best.images[0].src:'';
  var price='$'+(v.price/100).toFixed(2);
  var compare=(v.compare_at_price&&v.compare_at_price>v.price)?'$'+(v.compare_at_price/100).toFixed(2):'';
  var desc=(best.description||'').replace(/(<([^>]+)>)/gi,'').substring(0,120);
  if(best.description&&best.description.length>120)desc+='...';

  /* Logo from settings */
  var logoUrl=(window.NXQ_IMAGES&&window.NXQ_IMAGES.logo)||'';

  /* Build results view */
  if(body){
    body.className='nxq-body nxq-rview';

    /* Get hero image from settings if available */
    var heroImg='';
    try{var settings=document.querySelector('[data-section-id]');if(settings)heroImg=settings.getAttribute('data-hero');}catch(e){}

    body.innerHTML=
      /* LEFT */
      '<div class="nxq-rleft">'+
        '<div class="nxq-rleft-top">'+
          '<h2 class="nxq-rl-title">MISSION<br><span>COMPLETE</span></h2>'+
          '<h3 class="nxq-rl-sub">YOUR PERFECT LOADOUT<br>IS READY!</h3>'+
          '<p class="nxq-rl-desc">Based on your answers and battle style, we\'ve found the perfect gear for you.</p>'+
        '</div>'+
        '<div class="nxq-rl-browse">'+
          '<div class="nxq-rl-browse-row">'+
            '<div class="nxq-rl-browse-icon">'+IC.pkg+'</div>'+
            '<div class="nxq-rl-browse-text"><h4>UNLOCK MORE<br>EXCLUSIVE GEAR</h4><p>Explore more collections and limited editions.</p></div>'+
          '</div>'+
          '<button class="nxq-rl-browse-btn" onclick="window.location.href=\'/collections\'">BROWSE COLLECTIONS '+IC.arr+'</button>'+
        '</div>'+
      '</div>'+
      /* CENTER */
      '<div class="nxq-rcenter">'+
        '<div class="nxq-rc-logo">'+(logoUrl?'<img src="'+logoUrl+'" alt="Logo">':IC.leader)+'</div>'+
        '<div class="nxq-rc-match">YOU FOUND YOUR <span>PERFECT MATCH</span></div>'+
        '<div class="nxq-rc-desc">Based on your play style and preferences,<br>this gear is selected just for you.</div>'+
        '<div class="nxq-rc-features">'+
          '<div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#ff5b1a">'+IC.fighter+'</div><div class="nxq-rc-feat-title">TAILORED TO YOU</div><div class="nxq-rc-feat-desc">Matches your play style</div></div>'+
          '<div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#FFB000">'+IC.leader+'</div><div class="nxq-rc-feat-title">BATTLE TESTED</div><div class="nxq-rc-feat-desc">Trusted by warriors</div></div>'+
          '<div class="nxq-rc-feat"><div class="nxq-rc-feat-icon" style="color:#22c55e">'+IC.collector+'</div><div class="nxq-rc-feat-title">TOP QUALITY</div><div class="nxq-rc-feat-desc">Premium gear for real champions</div></div>'+
        '</div>'+
      '</div>'+
      /* RIGHT */
      '<div class="nxq-rright">'+
        '<div class="nxq-rr-label">AI RECOMMENDATION</div>'+
        '<div class="nxq-rr-title">PERFECT LOADOUT</div>'+
        '<div class="nxq-rr-sub">The best gear that matches your battle style and preferences.</div>'+
        '<div class="nxq-rr-img">'+
          '<div class="nxq-rr-img-platform"></div>'+
          '<div class="nxq-rr-img-ring"></div>'+
          '<div class="nxq-rr-img-ring2"></div>'+
          '<div class="nxq-rr-img-glow"></div>'+
          (img?'<img src="'+img+'" alt="'+(best.title||'').replace(/"/g,'&quot;')+'">':'')+
        '</div>'+
        '<h3 class="nxq-rr-name">'+(best.title||'')+'</h3>'+
        '<p class="nxq-rr-desc">'+desc+'</p>'+
        '<div class="nxq-rr-price">'+price+(compare?' <span>'+compare+'</span>':'')+'</div>'+
        '<div class="nxq-rr-stars">&#9733;&#9733;&#9733;&#9733;&#9733; <span>(128)</span></div>'+
        '<div class="nxq-rr-stock'+(v.available?' in':' out')+'">'+(v.available?'IN STOCK':'SOLD OUT')+'</div>'+
        '<div class="nxq-rr-btns">'+
          '<button class="nxq-rr-btn nxq-rr-btn--view" data-handle="'+best.handle+'">'+IC.eye+' VIEW LOADOUT</button>'+
          (v.available?'<button class="nxq-rr-btn nxq-rr-btn--cart" data-variant="'+v.id+'">'+IC.cart+' ADD TO CART</button>':'')+
        '</div>'+
        '<div class="nxq-rr-restart"><button class="nxq-btn nxq-btn-re" id="nxq-re-'+sid+'">'+IC.refresh+' RESTART MISSION</button></div>'+
      '</div>';

    /* Wire up buttons */
    var viewBtn=body.querySelector('.nxq-rr-btn--view');
    if(viewBtn)viewBtn.addEventListener('click',function(){
      var handle=this.getAttribute('data-handle');
      if(handle){
        if(typeof fnOpenQuickView==='function'){fnOpenQuickView(handle,sid);}
        else if(typeof window.fnOpenQuickView==='function'){window.fnOpenQuickView(handle,sid);}
        else{window.open('/products/'+handle,'_blank');}
      }
    });
    var reb=body.querySelector('#nxq-re-'+sid);
    if(reb)reb.addEventListener('click',function(){restart(sid);});
    var cartBtn=body.querySelector('.nxq-rr-btn--cart');
    if(cartBtn)cartBtn.addEventListener('click',function(e){
      e.stopPropagation();var vid=parseInt(this.getAttribute('data-variant'));if(!vid)return;
      var self=this;self.textContent='ADDING...';self.disabled=true;
      fetch(window.Shopify.routes.root+'cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id:vid,quantity:1}]})}).then(function(){
        self.textContent='ADDED!';document.dispatchEvent(new CustomEvent('cart:build'));
        if(window.NexusCart){NexusCart.fetchCart();NexusCart.open();}
        setTimeout(function(){self.textContent='ADD TO CART';self.disabled=false},2000);
      }).catch(function(){self.textContent='ADD TO CART';self.disabled=false});
    });
  }

  /* Hide bottom nav */
  if(bot)bot.style.display='none';
}

/* ---- OPEN / CLOSE ---- */
function openQuiz(id){
  sid=id;var m=document.getElementById('nxq-m-'+id);if(!m)m=build(id);
  S.step=0;S.ans={};S.open=true;allProducts=null;
  var sv=load();if(sv&&sv.a){S.ans=sv.a;S.step=sv.s||0;}
  m.classList.remove('off');m.classList.add('on');document.body.style.overflow='hidden';
  var body=$('#nxq-body-'+id),ld=$('#nxq-load-'+id),bot=$('.nxq-bot',m);
  if(body)body.style.display='';if(ld)ld.classList.remove('on');if(bot)bot.style.display='';
  /* Apply background image */
  var bgWrap=$('.nxq-bg',m);
  if(bgWrap){
    var existingBg=bgWrap.querySelector('.nxq-bg-img');
    if(existingBg)existingBg.remove();
    if(window.NXQ_IMAGES&&window.NXQ_IMAGES.bg){
      var bgDiv=document.createElement('div');
      bgDiv.className='nxq-bg-img';
      bgDiv.style.backgroundImage='url('+window.NXQ_IMAGES.bg+')';
      bgWrap.insertBefore(bgDiv,bgWrap.firstChild);
    }
  }
  /* Reset sidebar */
  var weapon=$('#nxq-weapon-'+id);if(weapon)weapon.style.display='';
  var pslot=$('#nxq-pslot-'+id);if(pslot){pslot.style.display='';pslot.innerHTML='';pslot.className='nxq-product-slot';}
  var sideSub=$('#nxq-side-sub-'+id);if(sideSub)sideSub.textContent='Answer questions to refine';
  var sideLabel=$('.nxq-side-label',document.getElementById('nxq-side-'+id));if(sideLabel)sideLabel.textContent='AI RECOMMENDATION';
  var sideStats=$('#nxq-side-stats-'+id);if(sideStats)sideStats.innerHTML='<div class="nxq-stat"><div class="nxq-stat-label">SMART MATCH</div><div class="nxq-stat-val">AI ANALYZING</div></div><div class="nxq-stat"><div class="nxq-stat-label">BEST PICKS</div><div class="nxq-stat-val">PERSONALIZED</div></div><div class="nxq-stat"><div class="nxq-stat-label">BATTLE READY</div><div class="nxq-stat-val">GAME PROVEN</div></div>';
  /* Reset bottom nav */
  if(bot)bot.innerHTML='<div class="nxq-bot-left"><button class="nxq-btn nxq-btn-sk" id="nxq-sk-'+id+'">'+IC.arrL+' SKIP</button></div><div class="nxq-bot-center"><button class="nxq-btn nxq-btn-bk" id="nxq-bk-'+id+'">'+IC.arrL+' BACK</button><button class="nxq-btn nxq-btn-nx" id="nxq-nx-'+id+'" disabled>NEXT '+IC.arr+'</button></div><div class="nxq-bot-right"></div>';
  $('#nxq-bk-'+id).addEventListener('click',prev);
  $('#nxq-sk-'+id).addEventListener('click',skip);
  $('#nxq-nx-'+id).addEventListener('click',next);
  renderStep(S.step);updNav();
  var fx=$('.nxq-bg',m);if(fx&&!fx.dataset.i){mkEmbers(fx);fx.dataset.i='1';}
  fetchProducts();
}

function closeQuiz(id){
  var m=document.getElementById('nxq-m-'+id);if(!m)return;
  S.open=false;m.classList.add('off');setTimeout(function(){m.classList.remove('on','off');document.body.style.overflow=''},400);
}

function restart(id){
  /* Remove old modal and rebuild */
  var old=document.getElementById('nxq-m-'+id);
  if(old)old.remove();
  ini[id]=false;
  closeQuiz(id);
  setTimeout(function(){
    openQuiz(id);
    /* Re-attach click delegation for card selection on the new modal */
    var m=document.getElementById('nxq-m-'+id);
    if(m){
      m.addEventListener('click',function(e){var c=e.target.closest('.nxq-char,.nxq-clr,.nxq-bud');if(c){pick(c);return;}});
      var ox=m.querySelector('.nxq-x');
      if(ox)ox.addEventListener('click',function(){closeQuiz(id);});
      var ov=m.querySelector('.nxq-over');
      if(ov)ov.addEventListener('click',function(){closeQuiz(id);});
    }
  },500);
}

window.NexusQuiz={open:openQuiz,close:closeQuiz};

function init(id){
  if(ini[id])return;ini[id]=true;
  var m=build(id);
  m.addEventListener('click',function(e){var c=e.target.closest('.nxq-char,.nxq-clr,.nxq-bud');if(c){pick(c);return;}});
  $('#nxq-x-'+id).addEventListener('click',function(){closeQuiz(id)});
  $('.nxq-over',m).addEventListener('click',function(){closeQuiz(id)});
  $('#nxq-bk-'+id).addEventListener('click',prev);
  $('#nxq-sk-'+id).addEventListener('click',skip);
  $('#nxq-nx-'+id).addEventListener('click',next);
  $('#nxq-re-'+id).addEventListener('click',function(){restart(id)});
  document.addEventListener('keydown',function(e){
    if(!S.open)return;if(e.key==='Escape'){closeQuiz(id);return;}
    if(e.key==='ArrowRight'||e.key==='Enter'){e.preventDefault();next();}
    if(e.key==='ArrowLeft'){e.preventDefault();prev();}if(e.key==='s'||e.key==='S')skip();
  });
  var tx=0;m.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  m.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>80){d<0?next():prev();}},{passive:true});
}
window.NexusQuizInit=init;
})();
