import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ramka-form')
export class RamkaForm extends LitElement {
  static styles = css`
    :host { display: block; }
    input[type="file"] { display: block; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `;

  @state() private status = '';

  private async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    this.status = 'Wysyłanie...';
    try {
      const res = await fetch('/display', { method: 'POST', body: data });
      this.status = res.ok ? 'Gotowe.' : `Błąd: ${res.status}`;
    } catch {
      this.status = 'Błąd połączenia.';
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Wyślij na ekran</button>
      </form>
      <div id="status">${this.status}</div>
    `;
  }
}
