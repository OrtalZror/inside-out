
const type = JSON.parse(sessionStorage.getItem('whichTest'));
if (type === 'date') {
    date();
}
if (type === 'image' || type === 'butterfly' || type === 'tree') {
    picture();
}
if (type === 'intelligence') {
    intelligence();
}
if (type === 'communication') {
    communication();
}
if (type === 'learn') {
    learn();
}
if (type === 'see') {
    see();
}
if (type === 'sensory') {
    sensory();
}
if (type === 'trip') {
    trip();
}

function date() {
    const typeOfTree = JSON.parse(sessionStorage.getItem('result'));
    const container = document.getElementById('container');
    const heading = document.createElement('h1');
    const title = document.createElement('h3');
    container.append(heading);
    container.append(title);
    heading.innerHTML = typeOfTree;
    $.ajax({
        method: 'GET',
        url: '/json/kindOfTree.json',
        success: (data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].nameTree === typeOfTree) {
                    title.innerHTML = data[i].d;
                }


            }
        }
    })
}

function picture() {
    const image = JSON.parse(sessionStorage.getItem('result'));
    const container = document.getElementById('container');
    const img = document.createElement('img');
    const title = document.createElement('p');
    const wrap = document.createElement('div');
    container.append(wrap);
    wrap.append(img);
    const wraptext = document.createElement('div');
    container.append(wraptext)
    wraptext.append(title);
    wraptext.style.display = 'flex';
    wraptext.style.margin = 'auto';
    wrap.style.display = 'flex';
    wrap.style.margin = 'auto';
    wrap.style.width = '70%';
    wraptext.style.width = '70%';
    let string;
    if (type === 'image') {
        string = 'image/img/' + image + '.png';
    }
    if (type === 'butterfly') {
        string = 'image/butterfly/' + image + '.png';
    }
    if (type === 'tree') {
        string = 'image/tree/' + image + '.png';
    }

    img.src = string;
    img.style.width = '10vw';

    if (type === 'image') {
        string = '/json/picters.json';
    }
    if (type === 'butterfly') {
        string = '/json/butterfly.json';
    }
    if (type === 'tree') {
        string = '/json/tree2.json';
    }
    $.ajax({
        method: 'GET',
        url: string,
        success: (data) => {
            title.innerHTML = data[image - 1].description;
        }
    })

}

function intelligence() {
    const results = JSON.parse(sessionStorage.getItem('result'));
    const base = document.getElementById('container');
    $.ajax({
        method: 'GET',
        url: '/json/intelligenceResult.json',
        success: (data) => {
            for (let i = 0; i < results.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (results[i] === data[j].intelligence) {
                        const container = document.createElement('div');
                        base.append(container);
                        const title = document.createElement('h2');
                        container.append(title);
                        const text = document.createElement('p');
                        container.append(text);
                        title.innerHTML = 'אינטלגנציה ' + data[j].intelligence;
                        text.innerHTML = data[j].details;
                    }

                }

            }
        }
    })
}

function communication() {
    const container = document.getElementById('container');
    const result = JSON.parse(sessionStorage.getItem('result'));
    $.ajax({
        method: 'GET',
        url: '/json/communicationResults.json',
        success: (data) => {
            const text = document.createElement('div');
            container.append(text);
            const title = document.createElement('h1');
            text.append(title);
            title.innerHTML = result;
            const h6 = document.createElement('p');
            text.append(h6);
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === result) {
                    h6.innerHTML = data[i].text;
                    const ul = document.createElement('ul');
                    ul.style.listStyle = 'none';
                    text.append(ul);
                    for (let j = 0; j < data[i].addition.length; j++) {
                        const li = document.createElement('li');
                        ul.appendChild(li);
                        const bold = document.createElement('strong');
                        const add = document.createElement('p');
                        li.appendChild(bold);
                        li.appendChild(add);
                        bold.innerHTML = data[0].addition[j];
                        add.innerHTML = data[i].addition[j];

                    }
                    const sumUl = document.createElement('ul');
                    sumUl.style.listStyle = 'none';
                    text.appendChild(sumUl);
                    for (let j = 0; j < data[i].summery.length; j++) {
                        const li = document.createElement('li');
                        sumUl.appendChild(li);
                        const bold = document.createElement('strong');
                        const add = document.createElement('p');
                        li.appendChild(bold);
                        li.appendChild(add);
                        bold.innerHTML = data[0].summery[j];
                        add.innerHTML = data[i].summery[j]
                    }
                }

            }
        }
    })
}


function learn() {
    const result = JSON.parse(sessionStorage.getItem('result'));
    const container = document.getElementById('container');
    $.ajax({
        method: 'GET',
        url: '/json/learnResult.json',
        success: (data) => {
            const title = document.createElement('h2');
            const text = document.createElement('p');
            container.append(title);
            container.append(text);
            title.innerHTML = result;
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.type === result) {
                    text.innerHTML = element.description;
                    const head = document.createElement('h3');
                    head.innerHTML = 'דרכים מומלצות ללמידה מיטבית:';
                    container.append(head);
                    const list = document.createElement('ul');
                    container.append(list);
                    list.style.listStyle = 'none';
                    for (let j = 0; j < element.waysToLearn.length; j++) {
                        const item = document.createElement('li');
                        item.innerHTML = element.waysToLearn[j];
                        list.append(item);
                    }
                }
            }

        }
    })
}

function see() {
    const result = JSON.parse(sessionStorage.getItem('result'));
    const container = document.getElementById('container');
    const text = document.createElement('p');
    container.append(text);
    $.ajax({
        method: 'GET',
        url: '/json/othersSeeYouResults.json',
        success: (data) => {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (result >= parseInt(element.fromPoints) && result <= parseInt(element.toPoints)) {
                    text.innerHTML = element.details;
                }
            }
        }
    })
}

function sensory() {
    const result = JSON.parse(sessionStorage.getItem('result'));
    const container = document.getElementById('container');
    $.ajax({
        method: 'GET',
        url: '/json/sensorResult.json',
        success: (data) => {
            for (let i = 0; i < result.length; i++) {
                const element = result[i];

                const text = document.createElement('p');
                container.append(text);
                for (let j = 0; j < data.length; j++) {
                    const dataElement = data[j];
                    if (dataElement.name === element.category) {
                        if (element.howMuch === 'high') {
                            text.innerHTML = dataElement.high;
                        }
                        else {
                            text.innerHTML = dataElement.low;
                        }
                    }
                }

            }
        }
    })

}
function trip() {
    const container = document.getElementById('container');;
    const answer = JSON.parse(sessionStorage.getItem('result'))


    $.ajax({
        method: 'GET',
        url: '/JSON/tripResult.json',
        success: (data) => {
            for (let i = 0; i < data.length; i++) {
                const text = document.createElement('p');
                container.append(text);
                if (data[i][answer[i] - 1] != undefined)
                    text.innerHTML = data[i][answer[i] - 1];

            }
        }
    })
}
