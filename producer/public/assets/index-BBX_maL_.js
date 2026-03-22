import{LitElement as e,css as t,html as n}from"lit";import{customElement as r,state as i}from"lit/decorators.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function a(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var o=class extends e{constructor(...e){super(...e),this.status=``}static{this.styles=t`
    :host { display: block; }
    input[type="file"] { display: block; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async handleSubmit(e){e.preventDefault();let t=e.target,n=new FormData(t);this.status=`Wysyłanie...`;try{let e=await fetch(`/display`,{method:`POST`,body:n});this.status=e.ok?`Gotowe.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return n`
      <form @submit=${this.handleSubmit}>
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Wyślij na ekran</button>
      </form>
      <div id="status">${this.status}</div>
    `}};a([i()],o.prototype,`status`,void 0),o=a([r(`ramka-form`)],o);var s=class extends e{static{this.styles=t`
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
  `}navigate(e){this.dispatchEvent(new CustomEvent(`navigate`,{detail:e,bubbles:!0,composed:!0}))}render(){return n`
      <h2>Co chcesz zrobić?</h2>
      <div class="pages">
        <button @click=${()=>this.navigate(`ramka-form`)}>Wyślij zdjęcie na ekran</button>
        <button @click=${()=>this.navigate(`album-viewer`)}>Album Viewer</button>
        <button @click=${()=>this.navigate(`album-config`)}>Ustawienia albumu</button>
      </div>
    `}};s=a([r(`landing-page`)],s);var c=class extends e{constructor(...e){super(...e),this.urls=[],this.loading=!0,this.error=``}static{this.styles=t`
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
  `}async connectedCallback(){super.connectedCallback();try{let e=await fetch(`/photos`);if(!e.ok)throw Error(`HTTP ${e.status}`);this.urls=await e.json()}catch(e){this.error=String(e)}finally{this.loading=!1}}render(){return this.loading?n`<p class="loading">Ładowanie zdjęć...</p>`:this.error?n`<p class="error">Błąd: ${this.error}</p>`:n`
      <p>${this.urls.length} zdjęć</p>
      <div class="grid">
        ${this.urls.map(e=>n`
          <a href=${e} target="_blank">
            <img src=${e} alt="">
          </a>
        `)}
      </div>
    `}};a([i()],c.prototype,`urls`,void 0),a([i()],c.prototype,`loading`,void 0),a([i()],c.prototype,`error`,void 0),c=a([r(`album-viewer`)],c);var l=class extends e{constructor(...e){super(...e),this.albumUrl=``,this.status=``}static{this.styles=t`
    :host { display: block; }
    label { display: block; margin-bottom: 4px; font-size: 0.9em; color: #555; }
    input { display: block; width: 100%; box-sizing: border-box; padding: 6px 8px; font-size: 1em; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async connectedCallback(){super.connectedCallback(),this.albumUrl=(await(await fetch(`/config-album`)).json()).albumUrl}async handleSubmit(e){e.preventDefault(),this.status=`Zapisywanie...`;try{let e=await fetch(`/config-album`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({albumUrl:this.albumUrl})});this.status=e.ok?`Zapisano.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return n`
      <form @submit=${this.handleSubmit}>
        <label for="url">URL albumu Google Photos</label>
        <input id="url" type="url" .value=${this.albumUrl}
          @input=${e=>{this.albumUrl=e.target.value}}
          placeholder="https://photos.app.goo.gl/..." required>
        <button type="submit">Zapisz</button>
      </form>
      <div id="status">${this.status}</div>
    `}};a([i()],l.prototype,`albumUrl`,void 0),a([i()],l.prototype,`status`,void 0),l=a([r(`album-config`)],l);var u=class extends e{constructor(...e){super(...e),this.page=`landing`}static{this.styles=t`
    :host { display: block; font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }
    .back { background: none; border: none; cursor: pointer; color: #555; padding: 0; margin-bottom: 16px; font-size: 0.9em; }
    .back:hover { color: #000; }
  `}onNavigate(e){this.page=e.detail}renderPage(){return this.page===`landing`?n`<landing-page @navigate=${this.onNavigate}></landing-page>`:n`
      <button class="back" @click=${()=>{this.page=`landing`}}>← Wróć</button>
      ${this.page===`ramka-form`?n`<ramka-form></ramka-form>`:n``}
      ${this.page===`album-viewer`?n`<album-viewer></album-viewer>`:n``}
      ${this.page===`album-config`?n`<album-config></album-config>`:n``}
    `}render(){return n`
      <h1>Ramka</h1>
      ${this.renderPage()}
    `}};a([i()],u.prototype,`page`,void 0),u=a([r(`ramka-app`)],u);