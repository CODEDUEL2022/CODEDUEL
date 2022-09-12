<template>
  <div class="overlay" @click.self="$emit('handleHowToPlayModalClose')">
    <div class="animation">
      <div class="modal">
        <span class="close-btn" @click="$emit('handleHowToPlayModalClose')"
          >×</span
        >
        <div class="modal-content">
          <div class="title">CUDE_DUELとは</div>
          <div class="contest">
            CUDE_DUELとは１対１で対戦するカードゲームです
            プレイヤーはプログラミング言語やフレームワークなどをモチーフにしたカードを用いて戦います
          </div>
          <p></p>
          <div class="title">基本的な情報</div>
          <div class="contest">
            - 手札 <br />&emsp;- 基本的に６枚<br />
            &emsp;- カードを使用した毎ターン6枚になるまで補充されます<br />
            - フィールド <br />&emsp;- 使用するカードを置く場所<br />
            &emsp;-
            手札のカードをドラック＆ドロップして持ってくることができます<br />
            - ターミナル<br />
            - フィールドにおいてあるカードとコンボできるカードを提示します<br />
            - HP<br />
            &emsp;-自分と相手のHPを表示しています<br />
            - OSfield<br />
            &emsp;- 場に設定いるフィールド<br />
            &emsp;- 一部のカードはOSフィールドによってボーナスが付きます<br />
            - 発動ボタン<br />
            &emsp;- フィールドにおいてあるカードを使用するボタン<br />
            &emsp;-
            フィールドにおいてあるカードに問題がなければ押せるようになります<br />
            &emsp;-
            フィールドにカードが置かれていない、カードの組み合わせがコンボできない場合は押せません<br />
            - カードリスト<br />
            &emsp;- カードの一覧が見れます<br />
            &emsp;- カードのイラスト、名称、そのカードの説明を見れます<br />
            - 遊び方<br />
            &emsp;- 遊び方が見れます
          </div>
          <p></p>
          <div class="title">基本的な遊び方</div>
          <div class="contest">
            1. メイン画面に来たらまず、Input your name
            と書かれているところの下に自分が使いたい名前を入力しましょう.
            ここで入力された名前は対戦中のHPバーに表示され、相手の画面にも表示されます.<br />
            2. ＞PLAYボタンを押し、ゲームモードを選択しましょう. このゲームには
            `Custom match`, `Random match`, `CPU
            match`の三種類のモードがあります<br />
            `Custom match`を遊びたい場合<br />
            ＞PLAYボタン -> Play against Human -> Custom
            matchを順に押し、roomIDを入力してから＞GAME STARTを押しましょう.<br />
            `Random match`を遊びたい場合 ＞PLAYボタン -> Play against Human ->
            Random matchを順に押しましょう.<br />
            `CPU match`を遊びたい場合 ＞PLAYボタン -> Play against
            CPUを順に押しましょう<br />
            3.プレイ画面に移ったら、相手プレイヤーとの対戦が始まります<br />
            自分のターン：手札から使用したいカードを選びフィールドに置きましょう。基本的にはカードは一枚ずつしか使用できませんが、コンボを組むことのできるカードがそろっている場合は複数枚同時に出せます<br />
            相手のターン：相手が行動しているので、相手がカードを使用するのを待ちましょう<br />
            基本的に自分のターン→相手のターン→自分のターン→…と繰り返していき、どちらかのHPが0になった時点でゲーム終了です<br />
            相手のHPを０にした場合：勝利<br />
            自分のHPが０になった場合：敗北<br />
          </div>
          <p></p>
          <div class="title">３つのゲームモード</div>
          <div class="contest">
            - `Custom match`
            同じRoomIDを入力することで任意のプレイヤーと対戦できます。 - `Random
            match` 他のプレイヤーと対戦するモードです
            対戦相手はランダムに決まります - `CPU match`
            他のプレイヤーではなくコンピュータと戦うモードです
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
      font-size: 1.25rem;
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
        letter-spacing: 0.15em;
      }

      .modal-content {
        z-index: 100;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 400px;
        .title {
          font-size: 1.25rem;
          color: white;
        }
        .content {
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
