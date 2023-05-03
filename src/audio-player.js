import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import { SimpleColors } from '@lrnwebcomponents/simple-colors';
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";

class AudioPlayer extends SimpleColors {
  static get properties() {
    return{
    ...super.properties,
    header: { type: String, reflect: true },
    audioFile: { attribute: "audio-file", type: String },
    playButton: { type: String },
    icon: {type: String, reflect: true},
    isPlaying: { type: Boolean, reflect: true }
  }
}

  static styles = [...super.styles, css`
    :host {
      --audio-player-padding: 8px 6px 8px 4px;
      --audio-player-margin: 8px 2px 8px;
      --audio-player-border: 0;
      --audio-player-icon-padding: 0px 4px 0px 0px;
      --audio-player-align-items: center;

      min-height: 100vh;
      display: inline;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #02326d;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      
    }
  
    .container {
      display: inline-flex;
      align-items: center;
    
      border-radius: 10px;
      min-width: 50px;
      height: 50px;
      cursor: pointer;
      font-size: 50px;
      font-family: "Impact";

      padding: var(--audio-player-padding);
      background: var(--simple-colors-default-theme-grey-4);
      border: var(--audio-player-border);
      margin: var(--audio-player-margin);
    }
    simple-icon {
      --simple-icon-color: #02326d;
      --simple-icon-width: 24px;
      --simple-icon-height: 24px;
      padding: var(--audio-player-icon-padding);
    }
    `];

  constructor() {
    super();
    this.header = 'My app';
    this.audioFile = new URL('../assets/Rick Roll Sound Effect.mp3', import.meta.url).href;
    this.playButton = "av:play-arrow";
    this.isPlaying = false;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.shadowRoot.querySelector('.player').pause();
      this.isPlaying = false;
      this.playButton = "av:play-arrow";
    }
  }

  progressBar() {
    var duration = this.shadowRoot.querySelector(".player").duration;
    var currentTime = this.shadowRoot.querySelector(".player").currentTime;
    var percentage = (currentTime / duration) * 100;

    if (this.shadowRoot.querySelector(".player").ended) {
      this.Play = false;
      this.playButton = "av:play-arrow";
    }

    this.shadowRoot.querySelector(".container").style.background = `linear-gradient(to right, var(--simple-colors-default-theme-accent-4) 0% ${percentage}%, var(--simple-colors-default-theme-grey-4) ${percentage}% 100%)`;
    
  }

  handlePlayPause() {
    if (this.shadowRoot.querySelector('audio').paused) {
      this.shadowRoot.querySelector('.player').play();
      this.Play = true;
      this.playButton = "av:pause";
      }
    else {
      this.shadowRoot.querySelector('.player').pause();
      this.Play = false;
      this.playButton = "av:play-arrow";
    }
  }
  
  render() {
    return html`
    <div class="container" @click="${this.handlePlayPause}" @visibilitychange="${this.handleVisibilityChange}"> 
      <simple-icon class="icon" icon="${this.playButton}"></simple-icon>
      <p>${this.header}</p>
      <audio class="player" src="${this.audioFile}" type="audio/mpeg" @timeupdate="${this.progressBar}"></audio>
    </div>
    `;
  }
}

customElements.define('audio-player', AudioPlayer);