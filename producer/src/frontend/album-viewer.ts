import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('album-viewer')
export class AlbumViewer extends LitElement {
  static styles = css`
    :host { display: block; }
    .loading { color: gray; }
    .error { color: red; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
      margin-top: 16px;
    }
    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
    }
    img:hover { opacity: 0.85; }
  `;

  @state() private urls: string[] = [];
  @state() private loading = true;
  @state() private error = '';

  override async connectedCallback() {
    super.connectedCallback();
    try {
      const res = await fetch('/photos');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.urls = await res.json() as string[];
    } catch (err) {
      this.error = String(err);
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) return html`<p class="loading">Ładowanie zdjęć...</p>`;
    if (this.error)   return html`<p class="error">Błąd: ${this.error}</p>`;

    return html`
      <p>${this.urls.length} zdjęć</p>
      <div class="grid">
        ${this.urls.map(url => html`
          <a href=${url} target="_blank">
            <img src=${url} alt="">
          </a>
        `)}
      </div>
    `;
  }
}
