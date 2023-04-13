import { html } from 'lit';
import '../src/audio-player.js';

export default {
  title: 'AudioPlayer',
  component: 'audio-player',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <audio-player
      style="--audio-player-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </audio-player>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
