import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

class AudioPlayer extends LitElement {
  static properties = {
    header: { type: String },
    audioFile: { attribute: "audio-file", type: String},
    playerIcon: { type: String},
    isPlaying: { type: Boolean, reflect: true}
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #ffffff;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--audio-player-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'My app';
    this.audioFile = new URL('../assets/Rick Roll Sound Effect.mp3', import.meta.url).href;
    this.playerIcon = "av:play-arrow";
    this.isPlaying = false;
  }
  progressBar(){
    var duration = this.shadowRoot.querySelector(".player").duration;
    var currentTime = this.shadowRoot.querySelector(".player").currentTime;
    
    if(this.shadowRoot.querySelector(".player").ended)
    {
      this.Play = false;
      this.PlayButton = "av:play-arrow";
    }
  }
  }
  

  render() {
    return html`
      <div></div>


    `;
  }



customElements.define('audio-player', AudioPlayer);