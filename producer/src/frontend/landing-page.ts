import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('landing-page')
export class LandingPage extends LitElement {
  static styles = css`
    :host { display: block; }
    .pages { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
    button {
      padding: 16px 20px;
      font-size: 1em;
      cursor: pointer;
      text-align: left;
      border: 1px solid #ccc;
      border-radius: 6px;
      background: #fafafa;
    }
    button:hover { background: #f0f0f0; }
  `;

  private navigate(page: string) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: page, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <h2>Co chcesz zrobić?</h2>
      <div class="pages">
        <button @click=${() => this.navigate('ramka-form')}>Wyślij zdjęcie na ekran</button>
        <button @click=${() => this.navigate('album-viewer')}>Album Viewer</button>
        <button @click=${() => this.navigate('album-config')}>Ustawienia albumu</button>
      </div>
    `;
  }
}
