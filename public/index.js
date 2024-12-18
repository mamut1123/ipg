let bufferState = '';

window.onload = function () {
    initDate();
    // check
    const checkboxCard = document.querySelector('.checkboxCard')
    if (localStorage.getItem("SaveCard")) {
        checkboxCard.checked = JSON.parse(localStorage.getItem("SaveCard")).checked
        card.unmaskedValue = JSON.parse(localStorage.getItem("SaveCard")).lastvalue
    } else {
        localStorage.setItem("SaveCard", JSON.stringify({checked: false, lastvalue: ''}))
    }

    const checkboxSaldo = document.querySelector('.checkboxSaldo')
    if (localStorage.getItem("SaveSaldo")) {
        checkboxSaldo.checked = JSON.parse(localStorage.getItem("SaveSaldo")).checked
        saldo.unmaskedValue = JSON.parse(localStorage.getItem("SaveSaldo")).lastvalue
    } else {
        localStorage.setItem("SaveSaldo", JSON.stringify({checked: false, lastvalue: ''}))
    }

    const checkboxTimeCheck = document.querySelector('.checkboxTimeCheck')
    if (localStorage.getItem("ChangeTimeCheck")) {
        checkboxTimeCheck.checked = JSON.parse(localStorage.getItem("ChangeTimeCheck")).checked
        checkboxTimeCheck.checked ? document.querySelector('.input.time.check').setAttribute('disabled', 'disabled') : ''
    } else {
        localStorage.setItem("ChangeTimeCheck", JSON.stringify({checked: false}))
    }
    // form 
    const checkboxName = document.querySelector('.checkboxName')
    if (localStorage.getItem("SaveName")) {
        checkboxName.checked = JSON.parse(localStorage.getItem("SaveName")).checked
        name.unmaskedValue = JSON.parse(localStorage.getItem("SaveName")).lastvalue
    } else {
        localStorage.setItem("SaveName", JSON.stringify({checked: false, lastvalue: ''}))
    }
    
    const checkboxAdres = document.querySelector('.checkboxAdres')
    if (localStorage.getItem("SaveAdres")) {
        checkboxAdres.checked = JSON.parse(localStorage.getItem("SaveAdres")).checked
        adres.unmaskedValue = JSON.parse(localStorage.getItem("SaveAdres")).lastvalue
    } else {
        localStorage.setItem("SaveAdres", JSON.stringify({checked: false, lastvalue: ''}))
    }

    const checkboxTimeForm = document.querySelector('.checkboxTimeForm')
    if (localStorage.getItem("ChangeTimeForm")) {
        checkboxTimeForm.checked = JSON.parse(localStorage.getItem("ChangeTimeForm")).checked
        checkboxTimeForm.checked ? document.querySelector('.input.time.form').setAttribute('disabled', 'disabled') : ''
    } else {
        localStorage.setItem("ChangeTimeForm", JSON.stringify({checked: false}))
    }

    const radios = document.querySelectorAll('input[name="screenType"]')
    if (localStorage.getItem("SaveScreenFormType")) {
        const type = JSON.parse(localStorage.getItem("SaveScreenFormType")).type
        radios.forEach( r => {
            if (r.value == type) {
                r.checked = true
            }
        })
    } else { 
        localStorage.setItem("SaveScreenFormType", JSON.stringify({ type: document.querySelector('input[name="screenType"]:checked').value }))
    }

    const timeInputCheck = document.querySelector('.input.time.check')
    timeInputCheck.value = getTime()
    const timeInputForm = document.querySelector('.input.time.form')
    timeInputForm.value = getTime()
    const timeInputDesc= document.querySelector('.input.time.desc')
    timeInputDesc.value = getTime()
    generateImgDesc()

    let checkTime = setInterval(() => {
        if (document.querySelector('.checkboxTimeCheck').checked && document.querySelector('.input.time.check').value != getTime()) {
            console.log(getTime())
            timeInputCheck.value = getTime()
            generateImgCheck()
        }
        if (document.querySelector('.checkboxTimeForm').checked && document.querySelector('.input.time.form').value != getTime()) {
            console.log(getTime())
            timeInputForm.value = getTime()
            generateImgForm()
        }
        if (document.querySelector('.checkboxTimeDesc').checked && document.querySelector('.input.time.desc').value != getTime()) {
            console.log(getTime())
            timeInputDesc.value = getTime()
            generateImgDesc()
        }

    }, 1000);
}

const price = new IMask(
    document.querySelector('.price'),
    {
      mask: Number,
      min: 0,
      max: 1000000,
    }
)

const card = new IMask(
    document.querySelector('.card'),
    {
      mask: '0000 0000',
      overwrite: 'shift'
    }
)

const saldo = new IMask(
    document.querySelector('.saldo'),
    {
      mask: '0[00][,][00]',
      overwrite: 'shift'
    }
)

const name = new IMask(
    document.querySelector('.name'),
    {
      mask: String
    }
)

const adres = new IMask(
    document.querySelector('.adres'),
    {
      mask: String
    }
)

const check = {
    card: "",
    price: 0,
    date: "",
    saldo: 0,
    date_waluty: "",
    number_ref: 0,
    price_2: 0,
    pln_step: 0,
    time: ""
}

const form = {
    name: "",
    adres: "",
    time: "",
    type: ""
}

const desc = {
    time: ""
}

function generateImgCheck() {
    check.price = `-${price.value}`
    check.date = formatDateToScreen(checkForm.querySelector('.date').value);
    check.card = card.value ? card.value : `${getNumber(4)} ${getNumber(4)}`
    check.saldo = saldo.value ? `${saldo.value} PLN` : `${getRandomInt(1,1000)},${getRandomInt(0,10)}${getRandomInt(1,10)} PLN`
    check.date_waluty = formatDateToScreen(checkForm.querySelector('.date').value);
    check.number_ref = `05272423213283${getNumber(9)}`
    check.price_2 = `${checkForm.querySelector('.price').value} PLN`
    check.pln_step = price.value.toString().length - 1
    check.time = document.querySelector('.input.time.check').value

    const obj = {
        "files": [ 
            "https://raw.githubusercontent.com/mamut1123/ipg/main/psd/pkocheck%204.1.psd"
        ],
        "resources": [
            "https://raw.githubusercontent.com/mamut1123/ipg/main/fonts/0.ttf",
            "https://raw.githubusercontent.com/mamut1123/ipg/main/fonts/1.otf"
        ],
        "environment": {
    
        },
        "script" : `var a = app.activeDocument.layers.getByName('card'); a.textItem.contents = '53 (...) ${check.card}';
        a = app.activeDocument.layers.getByName('time'); a.textItem.contents = '${check.time}';
        a = app.activeDocument.layers.getByName('summa_1'); a.textItem.contents = '${check.price}';
        a = app.activeDocument.layers.getByName('data_operacji'); a.textItem.contents = '${check.date}';
        a = app.activeDocument.layers.getByName('saldo'); a.textItem.contents = '${check.saldo}';
        a = app.activeDocument.layers.getByName('data_waluty'); a.textItem.contents = '${check.date_waluty}';
        a = app.activeDocument.layers.getByName('numer_ref'); a.textItem.contents = '${check.number_ref}';
        a = app.activeDocument.layers.getByName('summa_2'); a.textItem.contents = '${check.price_2}';
        a = app.activeDocument.layers.getByName('PLN'); a.translate(${11 * check.pln_step},0);
        app.echoToOE('receipt');
        app.activeDocument.saveToOE("png");`
    }
    const url = encodeURI(`https://www.photopea.com#${JSON.stringify(obj)}`)
    console.log(url)
    // delete and create new iframe el
    // downloadBtn.style.display = "none"
    //     copyBtn.style.display = "none"
    if (document.querySelector('.iframe')) {
        document.querySelector('.iframe').remove()
    }
    const iframe = document.createElement('iframe')
    iframe.className = "iframe"
    iframe.style.display = "none"
    iframe.src = url
    const place = document.querySelector(".iframe-place-check")
    place.append(iframe)
}

function generateImgForm() {
    form.name = document.querySelector('.input.name').value
    form.adres = adres.value
    form.time = document.querySelector('.input.time.form').value
    form.type = document.querySelector('input[name="screenType"]:checked').value
    const obj = {
        "files": [
            form.type == 'phone' ? "https://raw.githubusercontent.com/mamut1123/ipg/main/psd/form%203.psd" : "https://raw.githubusercontent.com/mamut1123/ipg/main/psd/form%203(email).psd"
        ],
        "resources": [
            "https://raw.githubusercontent.com/mamut1123/ipg/main/fonts/0.ttf",
            "https://raw.githubusercontent.com/mamut1123/ipg/main/fonts/1.otf"
        ],
        "environment": {
    
        },
        "script" : `var a = app.activeDocument.layers.getByName('time'); a.textItem.contents = '${form.time}';
        a = app.activeDocument.layers.getByName('Name'); a.textItem.contents = '${form.name}';
        a = app.activeDocument.layers.getByName('Adres'); a.textItem.contents = '${form.adres}';
        app.echoToOE('form');
        app.activeDocument.saveToOE("png");`
    }
    const url = encodeURI(`https://www.photopea.com#${JSON.stringify(obj)}`)
    console.log(url)

    if (document.querySelector('.iframe2')) {
        document.querySelector('.iframe2').remove()
    }
    const iframe = document.createElement('iframe')
    iframe.className = "iframe2"
    iframe.style.display = "none"
    iframe.src = url
    const place = document.querySelector(".iframe-place-form")
    place.append(iframe)
}

function generateImgDesc() {
    desc.time = document.querySelector('.input.time.desc').value
    const obj = {
        "files": [ 
            "https://raw.githubusercontent.com/mamut1123/ipg/main/psd/description%201.psd"
        ],
        "resources": [
            "https://raw.githubusercontent.com/mamut1123/ipg/main/fonts/1.otf"
        ],
        "environment": {
    
        },
        "script" : `var a = app.activeDocument.layers.getByName('time'); a.textItem.contents = '${desc.time}';
        app.echoToOE('desc');
        app.activeDocument.saveToOE("png");`
    }
    const url = encodeURI(`https://www.photopea.com#${JSON.stringify(obj)}`)
    console.log(url)

    if (document.querySelector('.iframe3')) {
        document.querySelector('.iframe3').remove()
    }
    const iframe = document.createElement('iframe')
    iframe.className = "iframe3"
    iframe.style.display = "none"
    iframe.src = url
    const place = document.querySelector(".iframe-place-desc")
    place.append(iframe)
}

window.addEventListener("message", function(e) {
    console.log(e.target.tagName) 
    if (e.data != 'done') {
        switch (e.data) {
            case 'receipt':
                bufferState = 'receipt'
                break;
            case 'form':
                bufferState = 'form'
                break;
            case 'desc':
                bufferState = 'desc'
                break;
        }
        var arrayBufferView = new Uint8Array(e.data);
        var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        switch (bufferState) {
            case 'receipt':
                var img = document.querySelector("#photoCheck");
                img.src = imageUrl;
                // downloadBtn.style.display = "inline-block"
                // copyBtn.style.display = "inline-block"
                linkCheck.download = `${check.price}`
                linkCheck.href = imageUrl;
                console.log(imageUrl)
                break;
            case 'form':
                var img = document.querySelector("#photoForm");
                img.src = imageUrl;
                linkForm.download = `${form.name}_${form.adres}`
                linkForm.href = imageUrl;
                console.log(imageUrl)
                break;
            case 'desc':
                var img = document.querySelector("#photoDescription");
                img.src = imageUrl;
                linkDesc.download = `${desc.time}`
                linkDesc.href = imageUrl;
                console.log(imageUrl)
                break;
        }
    }
    console.log(e) 
});

let downloadBtn = document.querySelector("#download-btn");
let copyBtn = document.querySelector("#copy-btn");
let linkCheck = document.querySelector("#linkCheck");

const img = new Image();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// downloadBtn.addEventListener("click", function (e) {
//     linkCheck.click();
// })

// copyBtn.addEventListener("click", function (e) {
//     copyToClipboard(linkCheck.href);
// })

checkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateImgCheck();
});

formForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateImgForm();
});

photoCheck.addEventListener("click", function (e) {
    copyToClipboard(linkCheck.href);
})

photoForm.addEventListener("click", function (e) {
    copyToClipboard(linkForm.href);
})

photoDescription.addEventListener("click", function (e) {
    copyToClipboard(linkDesc.href);
})


checkForm.oninput = function(event) { 
    if (event.target.type == "checkbox") { 
        let t = event.target; 
        switch (t.className) {
            case 'checkboxCard':
                t.checked ? localStorage.setItem("SaveCard", JSON.stringify({checked: true, lastvalue: card.value})) : localStorage.setItem("SaveCard", JSON.stringify({checked: false, lastvalue: ''}))
                break
            case 'checkboxSaldo':
                t.checked ? localStorage.setItem("SaveSaldo", JSON.stringify({checked: true, lastvalue: saldo.value})) : localStorage.setItem("SaveSaldo", JSON.stringify({checked: false, lastvalue: ''}))
                break
            case 'checkboxTimeCheck': 
                t.checked ? localStorage.setItem("ChangeTimeCheck", JSON.stringify({checked: true})) : localStorage.setItem("ChangeTimeCheck", JSON.stringify({checked: false}))
                const input = document.querySelector('.input.time.check')
                t.checked ? input.setAttribute('disabled', 'disabled') : input.removeAttribute("disabled");
                break
      }
    }

    if (event.target.type == "text") { 
        let t = event.target;
        let checkbox; 
        switch (t.className) {
            case 'input card':
                checkbox = JSON.parse(localStorage.getItem("SaveCard")).checked
                checkbox ? localStorage.setItem("SaveCard", JSON.stringify({ ...JSON.parse(localStorage.getItem("SaveCard")), lastvalue: card.value })) : ''
                break
            case 'input saldo':
                checkbox = JSON.parse(localStorage.getItem("SaveSaldo")).checked
                checkbox ? localStorage.setItem("SaveSaldo", JSON.stringify({ ...JSON.parse(localStorage.getItem("SaveSaldo")), lastvalue: saldo.value })) : ''
                break
      }
    }
};

formForm.oninput = function(event) { 
    if (event.target.type == "checkbox") { 
        let t = event.target; 
        switch (t.className) {
            case 'checkboxName':
                t.checked ? localStorage.setItem("SaveName", JSON.stringify({checked: true, lastvalue: name.value})) : localStorage.setItem("SaveName", JSON.stringify({checked: false, lastvalue: ''}))
                break
            case 'checkboxAdres':
                t.checked ? localStorage.setItem("SaveAdres", JSON.stringify({checked: true, lastvalue: adres.value})) : localStorage.setItem("SaveAdres", JSON.stringify({checked: false, lastvalue: ''}))
                break
            case 'checkboxTimeForm': 
                t.checked ? localStorage.setItem("ChangeTimeForm", JSON.stringify({checked: true})) : localStorage.setItem("ChangeTimeForm", JSON.stringify({checked: false}))
                const input = document.querySelector('.input.time.form')
                t.checked ? input.setAttribute('disabled', 'disabled') : input.removeAttribute("disabled");
                break
      }
    }

    if (event.target.type == "text") { 
        let t = event.target;
        let checkbox; 
        switch (t.className) {
            case 'input name':
                checkbox = JSON.parse(localStorage.getItem("SaveName")).checked
                checkbox ? localStorage.setItem("SaveName", JSON.stringify({ ...JSON.parse(localStorage.getItem("SaveName")), lastvalue: name.value })) : ''
                break
            case 'input adres':
                checkbox = JSON.parse(localStorage.getItem("SaveAdres")).checked
                checkbox ? localStorage.setItem("SaveAdres", JSON.stringify({ ...JSON.parse(localStorage.getItem("SaveAdres")), lastvalue: adres.value })) : ''
                break
      }
    }

    if (event.target.type == "radio") {
        let r = event.target;
        switch (r.className) {
            case 'screenType':
                localStorage.setItem("SaveScreenFormType", JSON.stringify({ type: r.value }))
                break
      }
    }
}

async function copyToClipboard(src) {
    const image = await writeToCanvas(src);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [image.type]: image,
        })
      ]);
  
      console.log("Success copy");
    } catch(e) {
      console.log("Copy failed: " + e);
    }
}

function writeToCanvas(src) {
    return new Promise((res, rej) => {
      img.src = src;
      img.onload = function() {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img,0,0)
        canvas.toBlob((blob) => {
          res(blob);
        }, 'image/png');
      }
    });
}

function initDate() {
    const input = document.querySelector(".date")
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    input.value = [year, month, day].join('-');
}

function getTime() {
    const date = new Date(moment().tz("Europe/Warsaw").format('YYYY-MM-DD HH:mm'))
    // const date = new Date('2023-09-12 10:01')
    let h = '' + date.getHours(),
        m = '' + date.getMinutes();
    
    if (h.length < 2)
        h = '0' + h;
    if (m.length < 2) 
        m = '0' + m;

    return [h, m].join(':')
}

function getNumber(n) {
    let number = '';
    for(let i = 0; i < n; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function formatDateToScreen(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('.');
}