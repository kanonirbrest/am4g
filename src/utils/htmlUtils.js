import { campaignType } from 'components/constants';
import { DEVICE_CONTROL } from 'utils/constants';
import { OPEN_ACTION } from 'utils/constants/campaign';
import sliderScript, { onFormSubmitString } from './constants/html';

export const widthKF = 3.73;
export const heightKF = 8.1;
const svgRegexp = /<svg(.|\n)*<\/svg>/ig;
/* eslint-disable max-len */

export const wrapField = (value, type, languages, pages) => {
  if (!value) return null;
  let textWithoutSvg = value.replace(svgRegexp, '');
  /* add onclick */
  textWithoutSvg = textWithoutSvg.replaceAll('data-onclick', 'onclick')
    .replaceAll('data-onchange', 'oninput')
    .replaceAll('data-focus', 'onfocus');

  const hasSubmit = !!languages[0].fields
    .filter(
      (f) => {
        if (!f.actions) return false;

        const fieldActions = f.actions.map((action) => action.action);

        return fieldActions.includes(OPEN_ACTION.SUBMIT);
      },
    ).length;

  // add submit only if we have submit button
  if (hasSubmit) {
    textWithoutSvg = textWithoutSvg.replaceAll('data-onsubmit="true"', onFormSubmitString);
  }

  const html = document.createElement('html');
  html.innerHTML = textWithoutSvg;

  // only if slider exist
  if (type === campaignType.inAppHTML) {
    const isSliderExist = languages[0].fields
      .findIndex(({ type: languageType }) => languageType === DEVICE_CONTROL.NPS_SLIDER) > 0;
    if (isSliderExist) {
      const script = document.createElement('script');
      script.type = 'application/javascript';
      script.text = sliderScript;
      html.appendChild(script);
    }
  }
  const bodyElement = html.querySelector('#device-bound');
  bodyElement.style.overflowX = 'hidden';
  const { backgroundSize } = bodyElement.style;
  if (backgroundSize) {
    bodyElement.style.backgroundImage = 'none';
  }

  // add default left offset
  const layout = html.getElementsByClassName('react-grid-layout');
  if (layout.length) {
    layout[0].style.left = 0;
  }
  // remove hovered artefact
  const item = html.getElementsByClassName('hover-item');
  if (item.length) {
    item[0].remove();
  }
  // add width to form
  const form = html.getElementsByTagName('form');
  if (form.length) {
    form[0].style.width = `${100 * pages.length}vw`;
  }
  // remove resize artefact
  const resizeElements = html.querySelectorAll('[data-type="resize-handler"]');

  resizeElements.forEach((el) => {
    el.remove();
  });

  const elements = html.getElementsByClassName('react-grid-item');
  if (elements) {
    // change offsets in px with %
    Array.from(elements).forEach((e) => {
      const { width, height, transform } = e.style;

      const perWidth = Number(width.slice(0, -2)) / widthKF;
      const perHeight = Number(height.slice(0, -2)) / heightKF;
      e.style.width = `${perWidth / pages.length}%`;
      e.style.height = `${perHeight}%`;
      const [x, y] = transform.slice(10, -1).split(',');

      const xVal = Number(x.slice(0, -2)) / widthKF;
      const yVal = Number(y.slice(0, -2)) / heightKF;
      e.style.transform = 'translate(0, 0)';
      e.style.top = `${yVal}%`;
      e.style.left = `${xVal / pages.length}%`;
      e.style.position = 'absolute';
    });
  }

  return `<!DOCTYPE html>
<html lang="en" style="width: 100vw; height: 100vh;
 margin: 0; display: flex;">
<head>   
<title>peview</title>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="viewport" 
content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=*no*"
>
<style type="text/css">
    input[type=text], input[type=password], 
    input[type=email], input[type=number], 
    input[type=time], input[type=date], textarea {
        /* on selection */
        -webkit-touch-callout: auto;
        -webkit-user-select: auto;
    }
    * {
        /* off selection */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }
    button:enabled:active {
      opacity: .8;
    }
    img:active {
      opacity: .8;
    }
    input[type=range]{
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
    }

  input[type=range]::-webkit-slider-runnable-track {
    width: 300px;
    height: var(--line-size);
    background: var(--tooltip-background);
    border: none;
    border-radius: 3px;
  }

  output {
    text-align: center;
  }
  
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    border: var(--thumb-border-size) solid var(--thumb-border);
    background: var(--tooltip-thumb);
    margin-top: calc((var(--thumb-size) - var(--line-size)) / -2);
  }
  
  .nps-button[disabled]{
    background-color: rgb(255, 0255, 255, .3) !important;
  }
  
  .textAreaOpacity {
    opacity: 0.4;
  }
  .textAreaOpacity:focus {
    opacity: 1;
  }
  textarea::placeholder {
    color: var(--placeholder-color);
    padding: var(--placeholder-vertical) var(--placeholder-horizontal);
    word-wrap: normal;
    white-space: pre;
    resize: none;
    box-sizing: border-box;
    height: 100%;
  } 
  textarea:focus::placeholder {
    color: transparent;
  }
  textarea {
    touch-action: pinch-zoom;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  
  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  .fadeIn {
    animation: fadeIn 200ms;
  }
  .fadeOut {
    animation: fadeOut 200ms;
  }
  button[data-child="image"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  html {
    overflow: hidden;
  }
  body {
    overflow: hidden;
  }
  .root-editor-block {
    white-space: initial;
  }

  /* reset link decoration */
  :any-link {
    text-decoration: none;
  }
  /* reset link decoration */
  .template {
    display: none!important;
  }
  span[data-offers] {
    white-space: initial;
  }
</style>
<!-- polyfill for https://caniuse.com/mdn-api_submitevent_submitter -->
<script>
  !function(){
    var lastBtn = null
    document.addEventListener('click',function(e){
        if (!e.target.closest) return;
        lastBtn = e.target.closest('button, input[type=submit]');
    }, true);
    document.addEventListener('submit',function(e){
        if ('submitter' in e && !!e.submitter) return;
        var canditates = [document.activeElement, lastBtn];
        lastBtn = null;
        for (var i=0; i < canditates.length; i++) {
            var candidate = canditates[i];
            if (!candidate) continue;
            if (!candidate.form) continue;
            if (!candidate.matches('button, input[type=button], input[type=image]')) continue;
            e.customSubmitter = candidate;
            return;
        }
        e.customSubmitter = e.target.querySelector('button, input[type=button], input[type=image]')
    }, true);
}();
</script>
</head>
${html.innerHTML || ''}
  <script>
    const ANDROID_PRODUCT_SEPARATOR = '__';
    function getMobileOperatingSystem() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
      }
    
      if ((/iPad|iPhone|iPod/.test(userAgent) 
       || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints >= 0))
          && !window.MSStream) {
        return 'iOS';
      }
      
      if (/android/i.test(userAgent)) {
        return 'Android';
      }

      return 'unknown';
    };
    const isArraysContain = (a = [], b = []) => {
      if (a?.length && b?.length) {
        return a.every((v) => b.includes(v));
      }
    
      return false;
    };

    const openPage = (productId, extras, destination, button, currentPageUUID) => {
      const form = document.getElementById('campaign-form');
      form.classList.add('fadeIn');
      const el = document.getElementsByClassName('react-grid-layout')[0];
    
      const pages = JSON.parse(button.dataset.pages);
      const nextPageIndex = pages.find((p) => p.uuid == destination).index;
      const newPageFormElements = document.querySelectorAll('[data-input]');
    
      newPageFormElements.forEach((el) => {
        if (el.dataset.currentpage == nextPageIndex) {
          el.disabled = false;
        } else {
          el.disabled = true;
        }
      });
    
      const step = el.clientWidth / pages.length;
      const offset = -1 * (step * (nextPageIndex - 1));
      setTimeout(() => {
        el.style.transform = \`translateX(\`+offset+\`px)\`
        form.classList.remove('fadeIn');
        form.classList.add('fadeOut');
        setTimeout(() => {
          form.classList.remove('fadeOut');
        }, 200);
      }, 200);
    
      amBridge.logEvent('HTML_OpenPage', {
        from: currentPageUUID,
        to: destination,
        element_id: button.dataset.key,
        pageId: currentPageUUID,
      });
    };

    const getModifiedProducts = (products) => {
      if(getMobileOperatingSystem() === 'Android') {
         return products.map((p) => ({
          ...p,
          productId: p.productId + ANDROID_PRODUCT_SEPARATOR + p.basePlanId,
        }));
      } else {
         return products;
      }
    }
    const amBridge = {
      action(name) {
        const isIos = getMobileOperatingSystem() === 'iOS';
        if (isIos) {
          if (window.webkit?.messageHandlers) {
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({
                action: 'action',
                properties: {
                  name,
                },
              });
          }
        } else if (appMessagesBridge) {
          appMessagesBridge.action(name);
        }
      },
      purchase(id, offerId, extras) {
        const isIos = getMobileOperatingSystem() === 'iOS';
        let offer = window.offerList?.find((offer) => {
          return (offer.productId+'&'+offer.id) === offerId;
        });

        if (isIos) {
          if (window.webkit?.messageHandlers) {
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({
                action: 'purchase',
                properties: {
                  id,
                  offer: offer?.id,
                  extras,
                },
              });
          }
        } else if (appMessagesBridge) {
          if(!offer) {
            offer = window.products.find((p) => {
              return p.productId === id;
            })
          }
          appMessagesBridge.purchase(id.split(ANDROID_PRODUCT_SEPARATOR)[0], offer?.offerToken, JSON.stringify(extras));
        }
      },
      logEvent(name, parameters) {
        const isIos = getMobileOperatingSystem() === 'iOS';
        if (isIos) {
          if (window.webkit?.messageHandlers) {
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({
                action: 'logEvent',
                properties: {
                  name,
                  parameters,
                },
              });
          }
        } else if (appMessagesBridge) {
          appMessagesBridge.logEvent(name, JSON.stringify(parameters));
        }
      },
      logAnalyticsEvent(name, parameters) {
        const isIos = getMobileOperatingSystem() === 'iOS';
        if (isIos) {
          if (window.webkit?.messageHandlers) {
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({
                action: 'logAnalyticsEvent',
                properties: {
                  name,
                  parameters,
                },
              });
          }
        } else if (appMessagesBridge) {
          appMessagesBridge.logAnalyticsEvent(name, JSON.stringify(parameters));
        }
      },
      close(parameters) {
        const isIos = getMobileOperatingSystem() === 'iOS';
        if (isIos) {
          if (window.webkit?.messageHandlers) {
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({
                action: 'logEvent',
                properties: { name: 'close', parameters },
              });
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({ action: 'close' });
          }
        } else if (appMessagesBridge) {
          if (parameters) {
            appMessagesBridge.logEvent('close', JSON.stringify(parameters));
          } else {
            appMessagesBridge.logEvent('close');
          }
          appMessagesBridge.close();
        }
      },
      openExternalUrl(url) {
        const isIos = getMobileOperatingSystem() === 'iOS';
        if (isIos) {
          if (window.webkit?.messageHandlers) {
            window.webkit.messageHandlers.appMessagesBridge
              .postMessage({
                action: 'openExternalUrl',
                properties: {
                  url
                },
              });
          }
        } else if (appMessagesBridge) {
          appMessagesBridge.openExternalUrl(url);
        }
        return false;
      },
      loadProducts(products) {
        const productsData = getModifiedProducts(JSON.parse(products));
        [...document.querySelectorAll("[data-oldtemplate]")]
        .forEach((el) => {
          const id = el.getAttribute("data-productId");
          const oldtemplate = el.getAttribute("data-oldtemplate");
          const field = el.getAttribute("data-field");
          const offerIdent = el.getAttribute("data-offeridentifier");
          const product = productsData.find((p) => {
            return p.productId === id;
          }) || {};
          if(oldtemplate) {
            if(offerIdent) {
              const offerIndex = product?.discounts?.findIndex((o) => o.id === offerIdent);
              if(offerIndex > -1) {
                let value = product.discounts[offerIndex][field];
                el.innerHTML = el.innerHTML
                    .replaceAll(oldtemplate, typeof value === 'number' ? value : value || '');
              }
            } else {
              el.innerHTML = el.innerHTML
                .replaceAll(oldtemplate, product[field] || '');
            }
          }
          el.setAttribute('style', 'display: inline!important');
        });
        /*logic to show eligible variant*/
        const offerList = productsData
        .reduce((acc, next) => acc.concat(next?.discounts?.map((of) => ({
          ...of,
          productId: next.productId,
        })) || []), [])

        const eligibleOffers = offerList.map((off) => (off.productId + '&' + off.id));
        window.offerList = offerList;
        window.products = productsData;
        const extractAllText = (str) => {
          const re = /data-offers="(.*?)"/ig;
          const result = [];
          let current;
          while (current = re.exec(str)) {
            result.push(JSON.parse(current.pop().replaceAll('&quot;', '\\"').replaceAll('&amp;', "&")));
          }
        
          return result;
        };

        [...document.querySelectorAll(".multiple:has([data-offers])")]
          .forEach((container) => {
            let offerState = extractAllText(container.innerHTML);
            let eligibleIndex = offerState.findIndex((o) => {
              return isArraysContain(o,eligibleOffers);
            });

            if(eligibleIndex >=0) {
               [...container.childNodes].forEach((node, ind) => {
                 if (node && node?.nodeType !== 3) {
                   node.style.display = "none"; 
                 }
               });
               
               [...container.querySelectorAll("[data-offers]")].forEach((node, ind) => {
                 if(ind === eligibleIndex) {
                   node.style.display = "block"; 
                 } else if (node) {
                   node.style.display = "none"; 
                 }
               });
             }
          });
      },
      onPurchaseSuccess(productId, extras) {
        const destination = JSON.parse(extras).successPage;
        const button = document.querySelector('button:not([disabled=true])');
        const pages = JSON.parse(button.dataset.pages);
        const currentPageUUID = pages
            .find((p) => p.index == button.dataset.currentpage).uuid;
            
        if(destination) {
         openPage(productId, extras, destination, button, currentPageUUID);
        } else {
          amBridge.close({
            element_id: button.dataset.key,
            page_id: currentPageUUID,
          });
        }
      },
      onPurchaseError (productId, extras) {
        const destination = JSON.parse(extras).errorPage;
        const button = document.querySelector('button:not([disabled=true])');
        const pages = JSON.parse(button.dataset.pages);
        const currentPageUUID = pages
            .find((p) => p.index == button.dataset.currentpage).uuid;
                    
        if(destination) {
          openPage(productId, extras, destination, button, currentPageUUID);
        } else {
          amBridge.close({
            element_id: button.dataset.key,
            page_id: currentPageUUID,
          });
        }
      }
    };    
    window.amBridge = amBridge;  
    </script>
  <script>
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    document.addEventListener("touchstart", function(){ }, true);
    setTimeout(()=> {
      if(getMobileOperatingSystem() === 'Android') {
        /*to fix android keyboard*/
        document.querySelector("meta[name=viewport]")
          .setAttribute("content", "height=" + screen.height * 0.9 + "px, width=device-width, initial-scale=1.0")
      }
    }, 300);
    
  </script> 
  <script id="load-products">
  </script>
</html>`;
};

export const htmlToElement = (html) => {
  const body = document.createElement('body');
  // eslint-disable-next-line no-param-reassign
  html = html.trim();
  body.innerHTML = html;

  return body;
};
