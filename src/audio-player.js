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
      min-height: 100vh;
      display: inline;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #da6868;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      
    }
  
    .container {
      display: inline-flex;
      align-items: center;
      
      
      //border-radius: 15px;
      min-width: 50px;
      height: 40px;
      cursor: pointer;
      font-size: 25px;
      font-family: "Courier New";

      padding: var(--inline-audio-padding);
      background: var(--simple-colors-default-theme-yellow-4);
      border: var(--inline-audio-border);
      margin: var(--inline-audio-margin);
    }
    simple-icon {
      --simple-icon-color: red;
      --simple-icon-button-focus-color: red;
      --simple-icon-button-focus-opacity: 70%;
      --simple-icon-width: 24px;
      --simple-icon-height: 24px;
      padding: var(--inline-audio-icon-padding);
    }
    simple-icon-button::part(button){
      outline: none;
    }

    
    `];

  constructor() {
    super();
    this.header = 'My app';
    this.audioFile = new URL('../assets/Rick Roll Sound Effect.mp3', import.meta.url).href;
    this.playButton = "av:play-arrow";
    this.isPlaying = false;
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
      console.log(this.play);
    }
    else {
      this.shadowRoot.querySelector('.player').pause();
      this.Play = false;
      this.playButton = "av:play-arrow";
    }
  }

  render() {
    return html`
    <div class="container" @click="${this.handlePlayPause}"> 
      <simple-icon class="icon" icon="${this.playButton}"></simple-icon>
      <p>${this.header}</p>
      <audio class="player" src="${this.audioFile}" type="audio/mpeg" @timeupdate="${this.progressBar}"></audio>
    </div>
    `;
  }
}


customElements.define('audio-player', AudioPlayer);