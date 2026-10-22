/* Fictional anonymous raw sample. Five explicit observations repeat six times;
   each alias has one record and four ratings per sport. No real student data. */
const sample = {
  notice: '가상 자료·설명용 예시 / 실제 수업 결과 아님',
  ratingScale: '설명용 가정: 1~5, 높을수록 긍정. 실제 앱의 척도를 확인하여 사용.',
  ratingOrder: ['재미', '공정성', '안전성', '준비 용이성'],
  patterns: {
    cup: {name:'컵 탑',unit:'개',records:[6,8,10,12,14],ratings:[[2,3,4,5,5],[3,4,4,4,5],[4,4,5,5,5],[3,3,4,4,5]],comment:'쌓는 과정은 재미있지만 무너지면 아쉬웠다.'},
    tongs: {name:'솜공 옮기기',unit:'개',records:[8,9,10,11,12],ratings:[[1,2,3,4,5],[3,4,4,4,5],[4,4,5,5,5],[4,4,4,5,5]],comment:'조작은 단순하지만 반복이 지루했다.'},
    target: {name:'표적 콩주머니',unit:'회',records:[0,1,1,2,3],ratings:[[2,3,4,4,5],[3,3,4,4,5],[3,4,4,5,5],[3,4,4,4,5]],comment:'맞히면 즐겁지만 세 번은 짧게 느껴졌다.'},
    sense: {name:'10초 감각 절대오차',unit:'초',records:[0.2,0.4,0.6,0.8,1],ratings:[[1,2,3,3,4],[3,3,4,4,5],[4,4,5,5,5],[4,4,5,5,5]],comment:'준비는 간단하지만 기다리는 시간이 심심했다.'},
    basket: {name:'종이공 바구니',unit:'회',records:[0,1,2,2,3],ratings:[[1,3,4,5,5],[3,3,4,4,5],[3,4,4,5,5],[4,4,4,5,5]],comment:'성공은 신났지만 모두 실패하면 아쉬웠다.'}
  }
};
sample.raw = Array.from({length:30}, (_, i) => ({
  alias:`가상-${String(i+1).padStart(2,'0')}`,
  sports:Object.fromEntries(Object.entries(sample.patterns).map(([id,s]) => [id,{
    record:s.records[i%5], ratings:s.ratings.map(r=>r[i%5])
  }]))
}));
sample.statistics = Object.fromEntries(Object.entries(sample.patterns).map(([id,s]) => {
  const values=sample.raw.map(r=>r.sports[id].record);
  const mean=values.reduce((a,b)=>a+b,0)/values.length;
  const variance=values.reduce((a,b)=>a+(b-mean)**2,0)/values.length;
  const ratings=sample.ratingOrder.map((_,j)=>{
    const raw=sample.raw.map(r=>r.sports[id].ratings[j]);
    return {n:raw.length,counts:[1,2,3,4,5].map(v=>raw.filter(x=>x===v).length),mean:raw.reduce((a,b)=>a+b,0)/raw.length};
  });
  return [id,{n:values.length,mean,variance,sd:Math.sqrt(variance),min:Math.min(...values),max:Math.max(...values),ratings}];
}));
sample.appRecommendation={label:'명시적 가상 앱 추천',choice:'솜공 옮기기',note:'설명용으로 설정한 선택이며 산출 점수·계산된 순위가 아님.'};
if(typeof module!=='undefined') module.exports=sample;
