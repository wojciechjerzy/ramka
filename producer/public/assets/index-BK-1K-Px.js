import{noChange as e,render as t}from"lit-html";var n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,o=(e,t)=>{let r={};for(var i in e)n(r,i,{get:e[i],enumerable:!0});return t||n(r,Symbol.toStringTag,{value:`Module`}),r},s=(e,t,o,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},c=(e,t,n)=>(s(e,t,`default`),n&&s(n,t,`default`));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=globalThis,u=l.ShadowRoot&&(l.ShadyCSS===void 0||l.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,d=Symbol(),f=new WeakMap,p=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(u&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=f.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&f.set(t,e))}return e}toString(){return this.cssText}},m=e=>new p(typeof e==`string`?e:e+``,void 0,d),h=(e,...t)=>new p(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,d),g=(e,t)=>{if(u)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=l.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},_=u?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return m(t)})(e):e,{is:v,defineProperty:y,getOwnPropertyDescriptor:b,getOwnPropertyNames:x,getOwnPropertySymbols:S,getPrototypeOf:C}=Object,w=globalThis,T=w.trustedTypes,E=T?T.emptyScript:``,D=w.reactiveElementPolyfillSupport,O=(e,t)=>e,k={toAttribute(e,t){switch(t){case Boolean:e=e?E:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},A=(e,t)=>!v(e,t),j={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:A};Symbol.metadata??=Symbol(`metadata`),w.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=j){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&y(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=b(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??j}static _$Ei(){if(this.hasOwnProperty(O(`elementProperties`)))return;let e=C(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O(`properties`))){let e=this.properties,t=[...x(e),...S(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(_(e))}else e!==void 0&&t.push(_(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return g(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?k:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?k:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??A)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:`open`},M[O(`elementProperties`)]=new Map,M[O(`finalized`)]=new Map,D?.({ReactiveElement:M}),(w.reactiveElementVersions??=[]).push(`2.1.2`);var N=o({CSSResult:()=>p,LitElement:()=>I,ReactiveElement:()=>M,_$LE:()=>R,adoptStyles:()=>g,css:()=>h,defaultConverter:()=>k,getCompatibleStyle:()=>_,notEqual:()=>A,supportsAdoptingStyleSheets:()=>u,unsafeCSS:()=>m});import*as P from"lit-html";c(N,P);var F=globalThis,I=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=t(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return e}};I._$litElement$=!0,I.finalized=!0,F.litElementHydrateSupport?.({LitElement:I});var L=F.litElementPolyfillSupport;L?.({LitElement:I});var R={_$AK:(e,t,n)=>{e._$AK(t,n)},_$AL:e=>e._$AL};(F.litElementVersions??=[]).push(`4.2.2`);var z=o({CSSResult:()=>p,LitElement:()=>I,ReactiveElement:()=>M,_$LE:()=>R,adoptStyles:()=>g,css:()=>h,defaultConverter:()=>k,getCompatibleStyle:()=>_,isServer:()=>!1,notEqual:()=>A,supportsAdoptingStyleSheets:()=>u,unsafeCSS:()=>m});c(z,N);var B=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},V={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:A},H=(e=V,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function U(e){return(t,n)=>typeof n==`object`?H(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function W(e){return U({...e,state:!0,attribute:!1})}function G(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var K=class extends I{constructor(...e){super(...e),this.status=``}static{this.styles=h`
    :host { display: block; }
    input[type="file"] { display: block; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async handleSubmit(e){e.preventDefault();let t=e.target,n=new FormData(t);this.status=`Wysyłanie...`;try{let e=await fetch(`/display`,{method:`POST`,body:n});this.status=e.ok?`Gotowe.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return z.html`
      <form @submit=${this.handleSubmit}>
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Wyślij na ekran</button>
      </form>
      <div id="status">${this.status}</div>
    `}};G([W()],K.prototype,`status`,void 0),K=G([B(`ramka-form`)],K);var q=class extends I{static{this.styles=h`
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
  `}navigate(e){this.dispatchEvent(new CustomEvent(`navigate`,{detail:e,bubbles:!0,composed:!0}))}render(){return z.html`
      <h2>Co chcesz zrobić?</h2>
      <div class="pages">
        <button @click=${()=>this.navigate(`ramka-form`)}>Wyślij zdjęcie na ekran</button>
        <button @click=${()=>this.navigate(`album-viewer`)}>Album Viewer</button>
        <button @click=${()=>this.navigate(`album-config`)}>Ustawienia albumu</button>
      </div>
    `}};q=G([B(`landing-page`)],q);var J=class extends I{constructor(...e){super(...e),this.urls=[],this.loading=!0,this.error=``}static{this.styles=h`
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
  `}async connectedCallback(){super.connectedCallback();try{let e=await fetch(`/photos`);if(!e.ok)throw Error(`HTTP ${e.status}`);this.urls=await e.json()}catch(e){this.error=String(e)}finally{this.loading=!1}}render(){return this.loading?z.html`<p class="loading">Ładowanie zdjęć...</p>`:this.error?z.html`<p class="error">Błąd: ${this.error}</p>`:z.html`
      <p>${this.urls.length} zdjęć</p>
      <div class="grid">
        ${this.urls.map(e=>z.html`
          <a href=${e} target="_blank">
            <img src=${e} alt="">
          </a>
        `)}
      </div>
    `}};G([W()],J.prototype,`urls`,void 0),G([W()],J.prototype,`loading`,void 0),G([W()],J.prototype,`error`,void 0),J=G([B(`album-viewer`)],J);var Y=class extends I{constructor(...e){super(...e),this.albumUrl=``,this.status=``}static{this.styles=h`
    :host { display: block; }
    label { display: block; margin-bottom: 4px; font-size: 0.9em; color: #555; }
    input { display: block; width: 100%; box-sizing: border-box; padding: 6px 8px; font-size: 1em; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async connectedCallback(){super.connectedCallback(),this.albumUrl=(await(await fetch(`/config-album`)).json()).albumUrl}async handleSubmit(e){e.preventDefault(),this.status=`Zapisywanie...`;try{let e=await fetch(`/config-album`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({albumUrl:this.albumUrl})});this.status=e.ok?`Zapisano.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return z.html`
      <form @submit=${this.handleSubmit}>
        <label for="url">URL albumu Google Photos</label>
        <input id="url" type="url" .value=${this.albumUrl}
          @input=${e=>{this.albumUrl=e.target.value}}
          placeholder="https://photos.app.goo.gl/..." required>
        <button type="submit">Zapisz</button>
      </form>
      <div id="status">${this.status}</div>
    `}};G([W()],Y.prototype,`albumUrl`,void 0),G([W()],Y.prototype,`status`,void 0),Y=G([B(`album-config`)],Y);var X=class extends I{constructor(...e){super(...e),this.page=`landing`}static{this.styles=h`
    :host { display: block; font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }
    .back { background: none; border: none; cursor: pointer; color: #555; padding: 0; margin-bottom: 16px; font-size: 0.9em; }
    .back:hover { color: #000; }
  `}onNavigate(e){this.page=e.detail}renderPage(){return this.page===`landing`?z.html`<landing-page @navigate=${this.onNavigate}></landing-page>`:z.html`
      <button class="back" @click=${()=>{this.page=`landing`}}>← Wróć</button>
      ${this.page===`ramka-form`?z.html`<ramka-form></ramka-form>`:z.html``}
      ${this.page===`album-viewer`?z.html`<album-viewer></album-viewer>`:z.html``}
      ${this.page===`album-config`?z.html`<album-config></album-config>`:z.html``}
    `}render(){return z.html`
      <h1>Ramka</h1>
      ${this.renderPage()}
    `}};G([W()],X.prototype,`page`,void 0),X=G([B(`ramka-app`)],X);