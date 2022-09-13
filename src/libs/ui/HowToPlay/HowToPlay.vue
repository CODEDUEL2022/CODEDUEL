<template>
  <div class="overlay" @click.self="$emit('handleHowToPlayModalClose')">
    <div class="animation">
      <div class="modal">
        <span class="close-btn" @click="$emit('handleHowToPlayModalClose')"
          >×</span
        >
        <div class="modal-content">
          <div class="title">CODE_DUELとは</div>
          <div class="content">
            CODE DUELとは1対1で対戦するカードゲームです
            <br />
            プレイヤーはプログラミング言語やフレームワークなどをモチーフにしたカードを用いて戦います
          </div>
          <div class="title">プレイ画面の説明</div>
          <v-img
            class="HowToPlayImg"
            width="500px"
            :src="require(`../../ui/assets/HowToPlay/HowToPlay.png`)"
          ></v-img>
          <div class="content">
            <div class="paragraph">
              ①手札 <br />
              &emsp;- 基本的に6枚 <br />
              &emsp;- カードを使用した毎ターン6枚になるまで補充されます
            </div>
            <div class="paragraph">
              ②フィールド <br />
              &emsp;- 使用するカードを置く場所 <br />
              &emsp;-
              手札のカードをドラック＆ドロップして持ってくることができます
            </div>
            <div class="paragraph">
              ③ターミナル<br />
              &emsp;-
              フィールドにおいてあるカードとコンボできるカードを提示します
            </div>
            <div class="paragraph">
              ④HP<br />
              &emsp;-自分と相手のHPを表示しています
            </div>
            <div class="paragraph">
              ⑤<span>OSfield</span><br />
              &emsp;- 場に設定いるフィールド<br />
              &emsp;- 一部のカードはOSフィールドによってボーナスが付きます
            </div>
            <div class="paragraph">
              ⑥発動ボタン<br />
              &emsp;- フィールドにおいてあるカードを使用するボタン<br />
              &emsp;-
              フィールドにおいてあるカードに問題がなければ押せるようになります<br />
              &emsp;-
              フィールドにカードが置かれていない、カードの組み合わせがコンボできない場合は押せません
            </div>
            <div class="paragraph">
              ⑦カードリスト<br />
              &emsp;- カードの一覧が見られます<br />
              &emsp;- カードのイラスト、名称、そのカードの説明が見られます
            </div>
          </div>
          <div class="title">基本的な遊び方</div>
          <div class="content">
            <v-img
              class="Play&UserNameImg"
              width="500px"
              :src="require(`../../ui/assets/HowToPlay/Play&UserName.png`)"
            ></v-img>
            <div class="paragraph">
              1.&emsp;<span>Input your name</span>
              と書かれているところに自分が使いたい名前を入力しましょう<br />
              ここで入力された名前は対戦中のHPバーに表示され、相手の画面にも表示されます<br />
            </div>
            <div class="paragraph">
              2.&emsp;＞<span>PLAY</span>ボタンを押し、ゲームモードを選択しましょう<br />
              このゲームには
              <span>Custom match</span>,　<span>Random match</span>,　
              <span>CPU match</span>の三種類のモードがあります
            </div>
            <v-img
              class="PlayImg"
              width="500px"
              :src="require(`../../ui/assets/HowToPlay/Play.png`)"
            ></v-img>
            <v-img
              class="HumanOrCPUImg"
              width="500px"
              :src="require(`../../ui/assets/HowToPlay/HumanOrCPU.png`)"
            ></v-img>
            <v-img
              class="CustomOrRandomImg"
              width="500px"
              :src="require(`../../ui/assets/HowToPlay/CustomOrRandom.png`)"
            ></v-img>
            <v-img
              class="RoomIdImg"
              width="500px"
              :src="require(`../../ui/assets/HowToPlay/RoomId.png`)"
            ></v-img>
            <div class="paragraph">
              <strong><span>Custom match</span>を遊びたい場合</strong><br />
              ＞<span>PLAY</span>ボタン -> <span>Play against Human </span>->
              <span>Custom match</span>
              を順に押し、<span>roomID</span>を入力してから＞<span
                >GAME START</span
              >を押しましょう<br />
            </div>
            <div class="paragraph">
              <strong><span>Random match</span>を遊びたい場合</strong><br />
              ＞<span>PLAY</span>ボタン -> <span>Play against Human</span> ->
              <span>Random match</span>を順に押しましょう<br />
            </div>
            <div class="paragraph">
              <strong><span>CPU match</span>を遊びたい場合</strong><br />
              ＞<span>PLAY</span>ボタン ->
              <span>Play against CPU</span>を順に押しましょう<br />
            </div>
            <div class="paragraph">
              3.プレイ画面に移ったら、相手プレイヤーとの対戦が始まります<br />
              自分のターン：手札から使用したいカードを選びフィールドに置きましょう<br />
              基本的にはカードは一枚ずつしか使用できませんが、コンボを組むことのできるカードがそろっている場合は複数枚同時に出せます<br />
              相手のターン：相手が行動しているので、相手がカードを使用するのを待ちましょう<br />
              基本的に自分のターン→相手のターン→自分のターン→…と繰り返していき、どちらかのHPが0になった時点でゲーム終了です<br />
              相手のHPを０にした場合：勝利<br />
              自分のHPが０になった場合：敗北<br />
            </div>
          </div>
          <div class="title">3つのゲームモード</div>
          <div class="content">
            <div class="paragraph">
              - <span>Custom match</span><br />
              同じ<span>roomID</span>を入力することで任意のプレイヤーと対戦できます<br />
            </div>
            <div class="paragraph">
              - <span>Random match</span><br />
              他のプレイヤーと対戦するモードです
              対戦相手はランダムに決まります<br />
            </div>
            <div class="paragraph">
              - <span>CPU match</span><br />
              他のプレイヤーではなくコンピュータと戦うモードです
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HowToPlay",
  };
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;

    .animation {
      .modal {
        position: relative;
        width: 600px;
        min-height: 500px;
        height: 500px;
        margin: 5rem auto;
        padding: 1rem;
        border: 9px solid #d3fffd;
        background-color: #0e3145;
        box-shadow: 0px 0px 20px #d3fffd;
        z-index: 10;

        &::before {
          background-color: #0e3145;
          position: absolute;
          content: "";
          display: block;
          top: -8px;
          bottom: -8px;
          left: 40px;
          right: 40px;
        }

        &::after {
          background-color: #0e3145;
          position: absolute;
          content: "";
          display: block;
          top: 40px;
          bottom: 40px;
          left: -8px;
          right: -8px;
        }

        div {
          position: relative;
        }

        .modal-content {
          z-index: 100;
          overflow-y: scroll;
          overflow-x: hidden;
          height: 400px;
          padding: 0 1.5rem;
          .title {
            font-size: 1.75rem;
            letter-spacing: 0.15rem !important;
            padding-bottom: 0.25rem;
            @keyframes neon {
              0% {
                text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
              }
              100% {
                text-shadow: 0 0 10px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
              }
            }
            animation: neon 2s infinite alternate;
          }
          .content {
            font-size: 1rem;
            color: white;
            padding: 0.75rem 0.75rem 2.5rem;

            .paragraph {
              padding: 0.5rem 0;
            }

            span {
              letter-spacing: 0.1rem !important;
            }
          }
        }

        .close-btn {
          display: block;
          padding: 0;
          cursor: pointer;
          text-align: right;
          z-index: 10;
          text-shadow: none;
          animation: none;
        }

        .contents {
          display: grid;
          place-items: center;
          align-items: top;
          min-height: 325px;
          z-index: 10;
        }
      }
    }
  }
</style>
