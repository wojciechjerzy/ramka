import{ReactiveElement as e}from"@lit/reactive-element";var t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.prototype.hasOwnProperty,a=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},o=(e,a,o,s)=>{if(a&&typeof a==`object`||typeof a==`function`)for(var c=r(a),l=0,u=c.length,d;l<u;l++)d=c[l],!i.call(e,d)&&d!==o&&t(e,d,{get:(e=>a[e]).bind(null,d),enumerable:!(s=n(a,d))||s.enumerable});return e},s=(e,t,n)=>(o(e,t,`default`),n&&o(n,t,`default`));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var c=globalThis,l=e=>e,u=c.trustedTypes,d=u?u.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,f=`$lit$`,p=`lit$${Math.random().toFixed(9).slice(2)}$`,m=`?`+p,ee=`<${m}>`,h=document,g=()=>h.createComment(``),_=e=>e===null||typeof e!=`object`&&typeof e!=`function`,v=Array.isArray,y=e=>v(e)||typeof e?.[Symbol.iterator]==`function`,b=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,te=/>/g,C=RegExp(`>|${b}(?:([^\\s"'>=/]+)(${b}*=${b}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),w=/'/g,ne=/"/g,re=/^(?:script|style|textarea|title)$/i,T=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),E=T(1),D=T(2),O=T(3),k=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),j=new WeakMap,M=h.createTreeWalker(h,129);function ie(e,t){if(!v(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return d===void 0?t:d.createHTML(t)}var ae=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=x;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===x?c[1]===`!--`?o=S:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=C):(re.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=C):o=te:o===C?c[0]===`>`?(o=i??x,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?C:c[3]===`"`?ne:w):o===ne||o===w?o=C:o===S||o===te?o=x:(o=C,i=void 0);let d=o===C&&e[t+1].startsWith(`/>`)?` `:``;a+=o===x?n+ee:l>=0?(r.push(s),n.slice(0,l)+f+n.slice(l)+p+d):n+p+(l===-2?t:d)}return[ie(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},N=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,d]=ae(t,n);if(this.el=e.createElement(l,r),M.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=M.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(f)){let t=d[o++],n=i.getAttribute(e).split(p),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?L:r[1]===`?`?R:r[1]===`@`?z:I}),i.removeAttribute(e)}else e.startsWith(p)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(re.test(i.tagName)){let e=i.textContent.split(p),t=e.length-1;if(t>0){i.textContent=u?u.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],g()),M.nextNode(),c.push({type:2,index:++a});i.append(e[t],g())}}}else if(i.nodeType===8)if(i.data===m)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(p,e+1))!==-1;)c.push({type:7,index:a}),e+=p.length-1}a++}}static createElement(e,t){let n=h.createElement(`template`);return n.innerHTML=e,n}};function P(e,t,n=e,r){if(t===k)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=_(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=P(e,i._$AS(e,t.values),i,r)),t}var oe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??h).importNode(t,!0);M.currentNode=r;let i=M.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new F(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new B(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=M.nextNode(),a++)}return M.currentNode=h,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},F=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),_(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==k&&this._(e):e._$litType$===void 0?e.nodeType===void 0?y(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&_(this._$AH)?this._$AA.nextSibling.data=e:this.T(h.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=N.createElement(ie(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new oe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=j.get(e.strings);return t===void 0&&j.set(e.strings,t=new N(e)),t}k(t){v(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(g()),this.O(g()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=l(e).nextSibling;l(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=P(this,e,t,0),a=!_(e)||e!==this._$AH&&e!==k,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=P(this,r[n+o],t,o),s===k&&(s=this._$AH[o]),a||=!_(s)||s!==this._$AH[o],s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},L=class extends I{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},R=class extends I{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},z=class extends I{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??A)===k)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},B=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}},V={M:f,P:p,A:m,C:1,L:ae,R:oe,D:y,V:P,I:F,H:I,N:R,U:z,B:L,F:B},se=c.litHtmlPolyfillSupport;se?.(N,F),(c.litHtmlVersions??=[]).push(`3.3.2`);var H=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new F(t.insertBefore(g(),e),e,void 0,n??{})}return i._$AI(e),i},U=a({LitElement:()=>G,_$LE:()=>K,_$LH:()=>V,html:()=>E,mathml:()=>O,noChange:()=>k,nothing:()=>A,render:()=>H,svg:()=>D});import*as ce from"@lit/reactive-element";s(U,ce);var W=globalThis,G=class extends e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=H(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};G._$litElement$=!0,G.finalized=!0,W.litElementHydrateSupport?.({LitElement:G});var le=W.litElementPolyfillSupport;le?.({LitElement:G});var K={_$AK:(e,t,n)=>{e._$AK(t,n)},_$AL:e=>e._$AL};(W.litElementVersions??=[]).push(`4.2.2`);var q=a({LitElement:()=>G,_$LE:()=>K,_$LH:()=>V,html:()=>E,isServer:()=>!1,mathml:()=>O,noChange:()=>k,nothing:()=>A,render:()=>H,svg:()=>D});s(q,U);var J=a({});import*as ue from"@lit/reactive-element/decorators/custom-element.js";s(J,ue);import*as de from"@lit/reactive-element/decorators/property.js";s(J,de);import*as fe from"@lit/reactive-element/decorators/state.js";s(J,fe);import*as pe from"@lit/reactive-element/decorators/event-options.js";s(J,pe);import*as me from"@lit/reactive-element/decorators/query.js";s(J,me);import*as he from"@lit/reactive-element/decorators/query-all.js";s(J,he);import*as ge from"@lit/reactive-element/decorators/query-async.js";s(J,ge);import*as _e from"@lit/reactive-element/decorators/query-assigned-elements.js";s(J,_e);import*as ve from"@lit/reactive-element/decorators/query-assigned-nodes.js";s(J,ve);function Y(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var X=class extends G{constructor(...e){super(...e),this.status=``}static{this.styles=q.css`
    :host { display: block; }
    input[type="file"] { display: block; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async handleSubmit(e){e.preventDefault();let t=e.target,n=new FormData(t);this.status=`Wysyłanie...`;try{let e=await fetch(`/display`,{method:`POST`,body:n});this.status=e.ok?`Gotowe.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return E`
      <form @submit=${this.handleSubmit}>
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Wyślij na ekran</button>
      </form>
      <div id="status">${this.status}</div>
    `}};Y([(0,J.state)()],X.prototype,`status`,void 0),X=Y([(0,J.customElement)(`ramka-form`)],X);var ye=class extends G{static{this.styles=q.css`
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
  `}navigate(e){this.dispatchEvent(new CustomEvent(`navigate`,{detail:e,bubbles:!0,composed:!0}))}render(){return E`
      <h2>Co chcesz zrobić?</h2>
      <div class="pages">
        <button @click=${()=>this.navigate(`ramka-form`)}>Wyślij zdjęcie na ekran</button>
        <button @click=${()=>this.navigate(`album-viewer`)}>Album Viewer</button>
        <button @click=${()=>this.navigate(`album-config`)}>Ustawienia albumu</button>
      </div>
    `}};ye=Y([(0,J.customElement)(`landing-page`)],ye);var Z=class extends G{constructor(...e){super(...e),this.urls=[],this.loading=!0,this.error=``}static{this.styles=q.css`
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
  `}async connectedCallback(){super.connectedCallback();try{let e=await fetch(`/photos`);if(!e.ok)throw Error(`HTTP ${e.status}`);this.urls=await e.json()}catch(e){this.error=String(e)}finally{this.loading=!1}}render(){return this.loading?E`<p class="loading">Ładowanie zdjęć...</p>`:this.error?E`<p class="error">Błąd: ${this.error}</p>`:E`
      <p>${this.urls.length} zdjęć</p>
      <div class="grid">
        ${this.urls.map(e=>E`
          <a href=${e} target="_blank">
            <img src=${e} alt="">
          </a>
        `)}
      </div>
    `}};Y([(0,J.state)()],Z.prototype,`urls`,void 0),Y([(0,J.state)()],Z.prototype,`loading`,void 0),Y([(0,J.state)()],Z.prototype,`error`,void 0),Z=Y([(0,J.customElement)(`album-viewer`)],Z);var Q=class extends G{constructor(...e){super(...e),this.albumUrl=``,this.status=``}static{this.styles=q.css`
    :host { display: block; }
    label { display: block; margin-bottom: 4px; font-size: 0.9em; color: #555; }
    input { display: block; width: 100%; box-sizing: border-box; padding: 6px 8px; font-size: 1em; margin-bottom: 12px; }
    button { padding: 8px 20px; cursor: pointer; }
    #status { margin-top: 12px; color: gray; }
  `}async connectedCallback(){super.connectedCallback(),this.albumUrl=(await(await fetch(`/config-album`)).json()).albumUrl}async handleSubmit(e){e.preventDefault(),this.status=`Zapisywanie...`;try{let e=await fetch(`/config-album`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({albumUrl:this.albumUrl})});this.status=e.ok?`Zapisano.`:`Błąd: ${e.status}`}catch{this.status=`Błąd połączenia.`}}render(){return E`
      <form @submit=${this.handleSubmit}>
        <label for="url">URL albumu Google Photos</label>
        <input id="url" type="url" .value=${this.albumUrl}
          @input=${e=>{this.albumUrl=e.target.value}}
          placeholder="https://photos.app.goo.gl/..." required>
        <button type="submit">Zapisz</button>
      </form>
      <div id="status">${this.status}</div>
    `}};Y([(0,J.state)()],Q.prototype,`albumUrl`,void 0),Y([(0,J.state)()],Q.prototype,`status`,void 0),Q=Y([(0,J.customElement)(`album-config`)],Q);var $=class extends G{constructor(...e){super(...e),this.page=`landing`}static{this.styles=q.css`
    :host { display: block; font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }
    .back { background: none; border: none; cursor: pointer; color: #555; padding: 0; margin-bottom: 16px; font-size: 0.9em; }
    .back:hover { color: #000; }
  `}onNavigate(e){this.page=e.detail}renderPage(){return this.page===`landing`?E`<landing-page @navigate=${this.onNavigate}></landing-page>`:E`
      <button class="back" @click=${()=>{this.page=`landing`}}>← Wróć</button>
      ${this.page===`ramka-form`?E`<ramka-form></ramka-form>`:E``}
      ${this.page===`album-viewer`?E`<album-viewer></album-viewer>`:E``}
      ${this.page===`album-config`?E`<album-config></album-config>`:E``}
    `}render(){return E`
      <h1>Ramka</h1>
      ${this.renderPage()}
    `}};Y([(0,J.state)()],$.prototype,`page`,void 0),$=Y([(0,J.customElement)(`ramka-app`)],$);