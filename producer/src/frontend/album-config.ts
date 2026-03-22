import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('album-config')
export class AlbumConfig extends LitElement {
  static styles = css`
    :host { display: block; }
    label { display: block; margin-bottom: 4px; font-size: 0.9em; color: #555; }
    input { display: block; width: 100%; box-sizing: border-box; padding: 6px 8px; font-size: 1em; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `;

  @state() private albumUrl = '';
  @state() private status = '';

  override async connectedCallback() {
    super.connectedCallback();
    const res = await fetch('/config-album');
    const data = await res.json() as { albumUrl: string };
    this.albumUrl = data.albumUrl;
  }

  private async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.status = 'Zapisywanie...';
    try {
      const res = await fetch('/config-album', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumUrl: this.albumUrl }),
      });
      this.status = res.ok ? 'Zapisano.' : `Błąd: ${res.status}`;
    } catch {
      this.status = 'Błąd połączenia.';
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label for="url">URL albumu Google Photos</label>
        <input id="url" type="url" .value=${this.albumUrl}
          @input=${(e: InputEvent) => { this.albumUrl = (e.target as HTMLInputElement).value; }}
          placeholder="https://photos.app.goo.gl/..." required>
        <button type="submit">Zapisz</button>
      </form>
      <div id="status">${this.status}</div>
    `;
  }
}
