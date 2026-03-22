import{ReactiveElement as e}from"@lit/reactive-element";import{noChange as t,render as n}from"lit-html";var r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,s=(e,t)=>{let n={};for(var i in e)r(n,i,{get:e[i],enumerable:!0});return t||r(n,Symbol.toStringTag,{value:`Module`}),n},c=(e,t,n,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=a(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==n&&r(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=i(t,d))||s.enumerable});return e},l=(e,t,n)=>(c(e,t,`default`),n&&c(n,t,`default`));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=s({LitElement:()=>m,_$LE:()=>g});import*as d from"@lit/reactive-element";l(u,d);import*as f from"lit-html";l(u,f);var p=globalThis,m=class extends e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=n(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return t}};m._$litElement$=!0,m.finalized=!0,p.litElementHydrateSupport?.({LitElement:m});var h=p.litElementPolyfillSupport;h?.({LitElement:m});var g={_$AK:(e,t,n)=>{e._$AK(t,n)},_$AL:e=>e._$AL};(p.litElementVersions??=[]).push(`4.2.2`);var _=s({LitElement:()=>m,_$LE:()=>g});import*as v from"lit-html/is-server.js";l(_,v),l(_,u);var y=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})};function b(e){return(t,n)=>{let r=typeof t==`function`?t:t[n];Object.assign(r,e)}}var x=s({customElement:()=>y,eventOptions:()=>b});import*as S from"@lit/reactive-element/decorators/property.js";l(x,S);import*as C from"@lit/reactive-element/decorators/state.js";l(x,C);import*as w from"@lit/reactive-element/decorators/query.js";l(x,w);import*as T from"@lit/reactive-element/decorators/query-all.js";l(x,T);import*as E from"@lit/reactive-element/decorators/query-async.js";l(x,E);import*as D from"@lit/reactive-element/decorators/query-assigned-elements.js";l(x,D);import*as O from"@lit/reactive-element/decorators/query-assigned-nodes.js";l(x,O);function k(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var A=class extends m{constructor(...e){super(...e),this.status=``}static{this.styles=_.css`
    :host { display: block; }
    input[type="file"] { display: block; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async handleSubmit(e){e.preventDefault();let t=e.target,n=new FormData(t);this.status=`Wysyłanie...`;try{let e=await fetch(`/display`,{method:`POST`,body:n});this.status=e.ok?`Gotowe.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return _.html`
      <form @submit=${this.handleSubmit}>
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Wyślij na ekran</button>
      </form>
      <div id="status">${this.status}</div>
    `}};k([(0,x.state)()],A.prototype,`status`,void 0),A=k([y(`ramka-form`)],A);var j=class extends m{static{this.styles=_.css`
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
  `}navigate(e){this.dispatchEvent(new CustomEvent(`navigate`,{detail:e,bubbles:!0,composed:!0}))}render(){return _.html`
      <h2>Co chcesz zrobić?</h2>
      <div class="pages">
        <button @click=${()=>this.navigate(`ramka-form`)}>Wyślij zdjęcie na ekran</button>
        <button @click=${()=>this.navigate(`album-viewer`)}>Album Viewer</button>
        <button @click=${()=>this.navigate(`album-config`)}>Ustawienia albumu</button>
      </div>
    `}};j=k([y(`landing-page`)],j);var M=class extends m{constructor(...e){super(...e),this.urls=[],this.loading=!0,this.error=``}static{this.styles=_.css`
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
  `}async connectedCallback(){super.connectedCallback();try{let e=await fetch(`/photos`);if(!e.ok)throw Error(`HTTP ${e.status}`);this.urls=await e.json()}catch(e){this.error=String(e)}finally{this.loading=!1}}render(){return this.loading?_.html`<p class="loading">Ładowanie zdjęć...</p>`:this.error?_.html`<p class="error">Błąd: ${this.error}</p>`:_.html`
      <p>${this.urls.length} zdjęć</p>
      <div class="grid">
        ${this.urls.map(e=>_.html`
          <a href=${e} target="_blank">
            <img src=${e} alt="">
          </a>
        `)}
      </div>
    `}};k([(0,x.state)()],M.prototype,`urls`,void 0),k([(0,x.state)()],M.prototype,`loading`,void 0),k([(0,x.state)()],M.prototype,`error`,void 0),M=k([y(`album-viewer`)],M);var N=class extends m{constructor(...e){super(...e),this.albumUrl=``,this.status=``}static{this.styles=_.css`
    :host { display: block; }
    label { display: block; margin-bottom: 4px; font-size: 0.9em; color: #555; }
    input { display: block; width: 100%; box-sizing: border-box; padding: 6px 8px; font-size: 1em; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async connectedCallback(){super.connectedCallback(),this.albumUrl=(await(await fetch(`/config-album`)).json()).albumUrl}async handleSubmit(e){e.preventDefault(),this.status=`Zapisywanie...`;try{let e=await fetch(`/config-album`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({albumUrl:this.albumUrl})});this.status=e.ok?`Zapisano.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return _.html`
      <form @submit=${this.handleSubmit}>
        <label for="url">URL albumu Google Photos</label>
        <input id="url" type="url" .value=${this.albumUrl}
          @input=${e=>{this.albumUrl=e.target.value}}
          placeholder="https://photos.app.goo.gl/..." required>
        <button type="submit">Zapisz</button>
      </form>
      <div id="status">${this.status}</div>
    `}};k([(0,x.state)()],N.prototype,`albumUrl`,void 0),k([(0,x.state)()],N.prototype,`status`,void 0),N=k([y(`album-config`)],N);var P=class extends m{constructor(...e){super(...e),this.page=`landing`}static{this.styles=_.css`
    :host { display: block; font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }
    .back { background: none; border: none; cursor: pointer; color: #555; padding: 0; margin-bottom: 16px; font-size: 0.9em; }
    .back:hover { color: #000; }
  `}onNavigate(e){this.page=e.detail}renderPage(){return this.page===`landing`?_.html`<landing-page @navigate=${this.onNavigate}></landing-page>`:_.html`
      <button class="back" @click=${()=>{this.page=`landing`}}>← Wróć</button>
      ${this.page===`ramka-form`?_.html`<ramka-form></ramka-form>`:_.html``}
      ${this.page===`album-viewer`?_.html`<album-viewer></album-viewer>`:_.html``}
      ${this.page===`album-config`?_.html`<album-config></album-config>`:_.html``}
    `}render(){return _.html`
      <h1>Ramka</h1>
      ${this.renderPage()}
    `}};k([(0,x.state)()],P.prototype,`page`,void 0),P=k([y(`ramka-app`)],P);