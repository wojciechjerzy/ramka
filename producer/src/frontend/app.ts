import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './ramka-form.js';
import './landing-page.js';
import './album-viewer.js';
import './album-config.js';

type Page = 'landing' | 'ramka-form' | 'album-viewer' | 'album-config';

@customElement('ramka-app')
export class RamkaApp extends LitElement {
  static styles = css`
    :host { display: block; font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }
    .back { background: none; border: none; cursor: pointer; color: #555; padding: 0; margin-bottom: 16px; font-size: 0.9em; }
    .back:hover { color: #000; }
  `;

  @state() private page: Page = 'landing';

  private onNavigate(e: CustomEvent<string>) {
    this.page = e.detail as Page;
  }

  private renderPage() {
    if (this.page === 'landing') {
      return html`<landing-page @navigate=${this.onNavigate}></landing-page>`;
    }
    return html`
      <button class="back" @click=${() => { this.page = 'landing'; }}>← Wróć</button>
      ${this.page === 'ramka-form'   ? html`<ramka-form></ramka-form>`     : html``}
      ${this.page === 'album-viewer' ? html`<album-viewer></album-viewer>` : html``}
      ${this.page === 'album-config' ? html`<album-config></album-config>` : html``}
    `;
  }

  render() {
    return html`
      <h1>Ramka</h1>
      ${this.renderPage()}
    `;
  }
}
