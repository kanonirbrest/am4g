export default `
window.didAppear = function () {
    const outputList = [...document.querySelectorAll(\`output[data-element="output"]\`)];

    outputList.forEach((output) => {
        const id = output.dataset.index;
        const max = +output.dataset.max;
        const input = document.querySelector(\`div[data-index="\${id}"] .range\`);

        const thumbHalfWidth = +getComputedStyle(input).getPropertyValue('--thumb-size')
            .split('px')[0] / 2;
        const borderSize = +getComputedStyle(input)
            .getPropertyValue('--thumb-border-size').split('px')[0];
        const totalInputWidth = input.clientWidth + 4;

        const left = (((input.value) / ((max) - 1)) * ((totalInputWidth - thumbHalfWidth)
            - thumbHalfWidth));

        output.style.left = left+'px';
    })
}
document.addEventListener("DOMContentLoaded", window.didAppear);

    window.onChangeInput = (val, el) => {
  const mapper = JSON.parse(el.dataset.mapper);
  const founded = mapper.find((item, index) => index == val);

  const id = el.dataset.id;
  const score = document.querySelector(\`div[data-index="$\{id}"] .score\`);
  score.innerText = founded.score;

  const desc = document.querySelector(\`div[data-index="$\{id}"] .desc\`);
  desc.innerText = founded.description || '';

    const input = document.querySelector(\`div[data-index="\${id}"] .range\`);
    input.value = val;
    const thumbHalfWidth = +getComputedStyle(input)
    .getPropertyValue('--thumb-size').split('px')[0] / 2;
    borderSize = +getComputedStyle(input)
    .getPropertyValue('--thumb-border-size').split('px')[0];
    const totalInputWidth = input.clientWidth + 4;
     const left = (((val) / ((mapper.length) - 1)) *
        ((totalInputWidth - thumbHalfWidth)
            - thumbHalfWidth));
    const scoreIndex = document
        .querySelector(\`div[data-index="\${id}"] #output-slider\`);

    if(scoreIndex) {
        scoreIndex.style.left = left+'px';
        scoreIndex.innerText = +input.value;
        scoreIndex.style.visibility = 'visible';
    }
    const npsButton = document.querySelector(\`div[data-index="\${id}"] .nps-button\`);
    npsButton.removeAttribute('disabled');
    
    score.style.visibility = 'visible';
    desc.style.visibility = 'visible';
};`;

export const onClickClose = `
    const allPages = JSON.parse(this.dataset.pages);
    const currentPageUuid = allPages
        .find((p) => p.index == this.dataset.currentpage).uuid;

    amBridge.close({
        element_id: this.dataset.key,
        page_id: currentPageUuid,
    });
`;

export const onClickPurchase = (id, offerId, value, page) => `
    amBridge.logEvent('HTML_OpenPurchase', {
        element_id: this.dataset.key,
        pageId: '${page}'
    });
    amBridge.purchase('${id}', '${offerId}', ${JSON.stringify(value)}); 
`;

export const onClickPurchaseTrigger = (value, page) => `
    let offerId, productId;
    const radioList = [...document.querySelectorAll(\`input[type="radio"], [data-currentpage="${page}"]\`)]
    .forEach((el) => {
        if(el.checked === true) {
            offerId = el.dataset.offerid;
            productId = el.dataset.productid;
        }
    });
   amBridge.logEvent('HTML_OpenPurchase', {
        element_id: this.dataset.key,
        pageId: '${page}' 
    });
    amBridge.purchase(productId, offerId, ${JSON.stringify(value)}); 
`;

export const onClickAnalytics = (name, params) => `
    amBridge.logAnalyticsEvent('${name}', ${JSON.stringify(params)});
`;

export const onClickNext = `
    const form = document.getElementById('campaign-form');
    form.classList.add('fadeIn');
    const el = document.getElementsByClassName('react-grid-layout')[0];
    
    const destination = this.dataset.destination;
    const pages = JSON.parse(this.dataset.pages);
    const nextPageIndex = pages.find((p) => p.uuid == destination).index;

    const currentPageUUID = pages
        .find((p) => p.index == this.dataset.currentpage).uuid;
    const newPageFormElements = document.querySelectorAll(\`[data-input]\`);

    newPageFormElements.forEach((el) => {
        if(el.dataset.currentpage == nextPageIndex) {
            el.disabled = false;
        } else {
            el.disabled = true;
        }
    })
    
    const step = el.clientWidth / pages.length;
    const offset = -1 * (step * (nextPageIndex - 1));
    setTimeout(() => {
        el.style.transform = \`translateX(\`+offset+\`px)\`
        form.classList.remove('fadeIn');
        form.classList.add('fadeOut');
        setTimeout(() => {
            form.classList.remove('fadeOut');
        }, 200)
    }, 200);
    
    amBridge.logEvent('HTML_OpenPage', {
        from:currentPageUUID, to: destination, 
        element_id: this.dataset.key,
        pageId: currentPageUUID
    });
`;
export const onClickNextForm = `
    const form = document.getElementById('campaign-form');
    form.classList.add('fadeIn');
    const el = document.getElementsByClassName('react-grid-layout')[0];
    submitter.disabled = true; // to fix AM4G-1939
    const destination = submitter.dataset.destination;
    const pages = JSON.parse(submitter.dataset.pages);
    const nextPageIndex = pages.find((p) => p.uuid == destination).index;
    const currentPageUUID = pages
        .find((p) => p.index == submitter.dataset.currentpage).uuid;

    const newPageElements = document.querySelectorAll(\`[data-input]\`);
    newPageElements.forEach((el) => {
        if(el.dataset.currentpage == nextPageIndex) {
            el.disabled = false;
        } else {
            el.disabled = true;
        }
    })

    const step = el.clientWidth / pages.length;
    const offset = -1 * (step * (nextPageIndex - 1));
    setTimeout(() => {
        el.style.transform = \`translateX(\`+offset+\`px)\`
        form.classList.remove('fadeIn');
        form.classList.add('fadeOut');
        setTimeout(() => {
            form.classList.remove('fadeOut');
        }, 200)
        submitter.disabled = false; // to fix AM4G-1939
    }, 200);

    amBridge.logEvent('HTML_OpenPage', {
        from: currentPageUUID, 
        to: destination,
        element_id: submitter.dataset.key,
        pageId: currentPageUUID
    });
`;

export const sendPageEvents = `
    event.preventDefault();

    var elements = event.target.elements;

    var obj ={};
    let has_text_input_filled = false;
    const pages = JSON.parse(submitter.dataset.pages);

    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        if(!item?.dataset?.ignoreSubmit) {
            if(item.dataset.currentpage == submitter.dataset.currentpage) { 
                const currentPageUUID = pages
                        .find((p) => p.index == item.dataset.currentpage).uuid;
                if(item.name.includes('-nps')) {
                    amBridge.logEvent('HTML_SliderResultSubmitted', {
                        value:  item.value,
                        element_id: submitter.dataset.key,
                        page_id: currentPageUUID
                    });
                }
                if(item.name.includes('-feedback')) {
                    if(item.value) {
                        has_text_input_filled = true;
                        amBridge.logEvent('HTML_TextInputSubmitted',  
                        {
                            element_name:item.name, 
                            content: item.value,
                            element_id: submitter.dataset.key,
                            page_id: currentPageUUID
                        });
                    }
                }
            }
        }
    }
    
    if(submitter.dataset.analytic) {
        const analyticEvents = JSON.parse(submitter.dataset.analytic);

        Object.keys(analyticEvents)
            .forEach((event) => {
                if(event === 'NPS Recorded') {
                    [...elements].forEach((element) => {
                        if(element.type === 'range' && !element.dataset.ignoreSubmit) {
                            amBridge.logAnalyticsEvent('NPS Recorded', 
                            {score:  element.value});
                        }
                    });
                } else if(event === 'FormSubmitted') {
                   const currentFormPageUUID = pages
                        .find((p) => p.index == submitter.dataset.currentpage).uuid;
                    amBridge.logAnalyticsEvent('FormSubmitted', {
                        has_text_input_filled, page_id: currentFormPageUUID
                    });
                } else {
                    amBridge.logAnalyticsEvent(event, analyticEvents[event]);
                }
            })
    }
    
     if(submitter.dataset.close == 'true') {
           const allPages = JSON.parse(submitter.dataset.pages);
           const currentPageUUID = allPages
                .find((p) => p.index == item.dataset.currentpage).uuid;
          amBridge.close({
            element_id: submitter.dataset.key,
            page_id: currentPageUUID
          });
     } 
`;

export const onFormSubmitString = `onsubmit="function sub(){
    var submitter = event.submitter? event.submitter : event.customSubmitter;

    if(submitter?.dataset?.destination) {
        ${onClickNextForm}
    }
    
    ${sendPageEvents}

    return false;
  }; sub();"`;
