<h1>Big contest - opencarelab 팀 "맞춤형 카드 혜택 서비스"</h1>
<h4>opencarelab팀에서 사용한 데이터를 한 눈에 볼 수 있는 시각화로, 미세먼지 여부 및 사용자 특성에 따른 구입 품목 데이터 시각화 입니다.</h4>
<br>

<h2>실행 방법</h2>
우선 git clone 을 하시거나, zip 파일을 다운로드 받습니다.<br>
그런 후 실행을 위해서는 로컬에 서버를 만들어야 합니다. <br>

파이썬이 있다면 아래의 명령어를 실행합니다.

<pre><code>python -m SimpleHTTPServer 8888 &</code></pre>

파이썬 3은 아래의 명령어를 실행합니다.

<pre><code>>> python -m http.server 8888 &</code></pre>

<br>

웹 브라우저를 이용하여 <a>http://localhost:8888</a> 주소를 방문하면 페이지를 확인할 수 있습니다.<br>
(크롬, 마이크로소프트 엣지, 인터넷익스플로러로 테스트했으므로, 가능한 이 브라우저들을 사용해주세요!)<br>
참고: https://bl.ocks.org/kerryrodden/766f8f6d31f645c39f488a0befa1e3c8 의 d3.js 코드를 활용하여 제작하였습니다.
