
import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

class AudioPlayer extends LitElement {
  static properties = {
    header: { type: String, reflect: true },
    audioFile: { attribute: "audio-file", type: String },
    playerIcon: { type: String },
    isPlaying: { type: Boolean, reflect: true }
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

    .container {
      display: inline-flex;
      align-items: center;
      padding: 4px 4px 4px 0px;
      background: red;
      border-radius: 4px;
      min-width: 50px;
      min-height: 40px;
      cursor: pointer;
      font-size: 15px;
    }
    
  `;

  constructor() {
    super();
    this.header = 'My app';
    this.audioFile = new URL('../assets/Rick Roll Sound Effect.mp3', import.meta.url).href;
    this.PlayButton = "av:play-arrow";
    this.isPlaying = false;
  }

  progressBar() {
    var duration = this.shadowRoot.querySelector(".player").duration;
    var currentTime = this.shadowRoot.querySelector(".player").currentTime;
    var percentage = (currentTime / duration) * 100;

    if (this.shadowRoot.querySelector(".player").ended) {
      this.Play = false;
      this.PlayButton = "av:play-arrow";
    }

    this.shadowRoot.querySelector(".container").style.background = `linear-gradient(90deg, blue 0% ${percentage}%, red ${percentage}% 100%)`;

  }

  handlePlayPause() {
    if (this.shadowRoot.querySelector('audio').paused) {
      this.shadowRoot.querySelector('.player').play();
      this.Play = true;
      this.PlayButton = "av:pause";
    }
    else {
      this.shadowRoot.querySelector('.player').pause();
      this.Play = false;
      this.PlayButton = "av:play-arrow";
    }
  }

  render() {
    return html`
    <div class="container" @click="${this.handlePlayPause}"> 
      <simple-icon class="icon" icon="${this.PlayButton}"></simple-icon>
      <p>${this.header}</p>
      <audio class="player" src="${this.audioFile}" type="audio/mpeg" @timeupdate="${this.progressBar}"></audio>
    </div>
    `;
  }
}


customElements.define('audio-player', AudioPlayer);
