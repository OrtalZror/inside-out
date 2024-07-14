//שליפה מהאכסון המקומי של סוג האבחון הנבחר ושליחה לפונקציה מתאימה בהתאם
const type = JSON.parse(sessionStorage.getItem('whichTest'));
$.ajax({
    method: 'GET',
    url: '/json/instructions.json',
    success: (instructions) => {
        switch (type) {
            case 'date':
                date(instructions);
                break;
            case 'image':
                image(9, instructions);
                break;
            case 'tree':
                image(9, instructions);
                break;
            case 'butterfly':
                image(6, instructions);
                break;
            case 'intelligence':
                intelligence(instructions);
                break;
            case 'communication':
                communication(instructions);
                break;
            case 'learn':
                learn(instructions);
                break;
            case 'see':
                see(instructions);
                break;
            case 'sensory':
                sensory(instructions);
                break;
            case 'trip':
                trip(instructions);
                break;

        }
    }
});

// class diagnosis {
//     name;
//     result;
//     constructor(name, result) {
//         this.name = name;
//         this.result = result;
//     }
// }

//אבחון התאריך
function date(instructions) {
    const mainContainer = document.getElementById('base');
    // יצירת הדיב להוראות האבחון
    const instruction = document.createElement('div');
    mainContainer.appendChild(instruction);
    instruction.style.border = '1px solid blue';
    instruction.style.borderRadius = '20px 20px';
    instruction.style.marginBottom = '10px';
    instruction.style.padding = '20px';
    const instructionText = document.createElement('h3');
    instructionText.innerHTML = instructions[0].instruction;
    instruction.appendChild(instructionText);
    //יצירת האלמנטים של האבחון עצמו
    const base = document.createElement('div');
    mainContainer.append(base);
    base.style.border = '1px solid blue';
    base.style.borderRadius = '20px 20px';
    base.style.padding = '20px';
    const text = document.createElement('p');
    text.innerHTML = 'מאיזה עץ אתם עשויים? זה הזמן לבדוק! האם אתם עץ שכל רוח מטה אותו הצידה? האם אתם עץ עם שורשים עמוקים המשתרגים יחדיו עם שורשים אחרים? האם אתם עץ זקוף וגאה שמשקיף על העולם מצמרתו הגבוהה? האם אתם עץ העומד ביופיו ובשלמותו ואינו נכנע לתכתיבים ולמזיקים?.'
    base.append(text);
    const getDate = document.createElement('input');
    getDate.type = 'date';
    base.append(getDate);
    //  getDate.classList.add('')
    $.ajax({
        method: 'GET',
        url: '/json/tree.json',
        success: (data) => {
            const dates = data;
            getDate.onchange = () => {
                const submit = document.createElement('button');
                submit.classList.add('btn', 'btn-primary');
                submit.innerHTML = 'לתוצאות';
                base.append(submit);
                submit.onclick = () => {
                    let date = getDate.value.split('-');
                    for (let i = 0; i < dates.length; i++) {
                        if (parseInt(dates[i].startMonth) === parseInt(dates[i].endMonth) && parseInt(dates[i].endMonth) === parseInt(date[1]) && dates[i].startDay <= date[2] * 1 && dates[i].endDay >= date[2] * 1) {
                            sessionStorage.setItem('result', JSON.stringify(dates[i].kindOfTree));

                            sentResults(0, dates[i].kindOfTree);
                        }
                        else if ((dates[i].startMonth * 1 != dates[i].endMonth * 1) && ((parseInt(dates[i].startMonth === date[1] * 1 && parseInt(dates[i].startDay) <= date[2] * 1)) || (dates[i].endMonth * 1 === date[1] * 1 && dates[i].endDay * 1 >= date[2] * 1))) {
                            sessionStorage.setItem('result', JSON.stringify(dates[i].kindOfTree));
                            sentResults(0, dates[i].kindOfTree);

                        }


                    }
                    if ((date[1] * 1 === 12 && date[2] * 1 >= 23)) {
                        sessionStorage.setItem('result', JSON.stringify(dates[0].kindOfTree));
                        sentResults(0, dates[0].kindOfTree);

                    }
                    window.location.assign('results.html');

                }
            }
        }
    })

}
//פונקציה שמותאמת לכל האבחונים של התמונות - מקבלת פרמטר את מספר התמונות שיש להציג
function image(number, instructions) {
    const mainContainer = document.getElementById('base');
    // יצירת הדיב להוראות האבחון
    const instruction = document.createElement('div');
    mainContainer.appendChild(instruction);
    instruction.style.border = '1px solid blue';
    instruction.style.borderRadius = '20px 20px';
    instruction.style.marginBottom = '10px';
    instruction.style.padding = '20px';
    const instructionText = document.createElement('h3');
    if (type === 'image')
        instructionText.innerHTML = instructions[1].instruction;
    if (type === 'butterfly')
        instructionText.innerHTML = instructions[2].instruction;
    if (type === 'tree')
        instructionText.innerHTML = instructions[7].instruction;
    instruction.appendChild(instructionText);
    //יצירת האלמנטים של האבחון עצמו
    const base = document.createElement('div');
    mainContainer.append(base);
    base.style.border = '1px solid blue';
    base.style.borderRadius = '20px 20px';
    base.style.padding = '20px';
    for (let index = 1; index <= number; index++) {
        const element = index;
        img = document.createElement('img');
        base.append(img);
        let string;
        if (type === 'image') {
            string = 'image/img/' + element + '.png';
        }
        if (type === 'butterfly') {
            string = 'image/butterfly/' + element + '.png';
        }
        if (type === 'tree') {
            string = 'image/tree/' + element + '.png';
        }

        img.src = string;
        img.style.width = '10vw';
        img.onclick = () => {
            sessionStorage.setItem('result', JSON.stringify(index));
            if (type === 'image')
                sentResults(1, index);
            if (type === 'butterfly')
                sentResults(2, index);
            if (type === 'tree')
                sentResults(7, index);
            window.location.assign('results.html');
        }
    }
}
//אבחון 7 אינטלגנציות
//החלק הראשי ששולח לפונקציות שיפעלו בהתאם לשלב של המשתמש
function intelligence(instructions) {
    $.ajax({
        method: 'GET',
        url: '/json/intelligence.json',
        success: (data) => {
            const mainContainer = document.getElementById('base');
            // יצירת הדיב להוראות האבחון
            const instruction = document.createElement('div');
            mainContainer.appendChild(instruction);
            instruction.style.border = '1px solid blue';
            instruction.style.borderRadius = '20px 20px';
            instruction.style.marginBottom = '10px';
            instruction.style.padding = '20px';
            const instructionText = document.createElement('h3');
            instructionText.innerHTML = instructions[4].instruction;
            instruction.appendChild(instructionText);
            //יצירת האלמנטים של האבחון עצמו
            const base = document.createElement('div');
            mainContainer.append(base);
            base.style.border = '1px solid blue';
            base.style.borderRadius = '20px 20px';
            base.style.padding = '20px';
            intelligenceLoop(data, 0, base);
        }
    })
}
//פונקציה שמעלה 10 שאלות בכל פעם וכן כפתור הבא והקודם ותוצאות בהתאם לשלב
function intelligenceLoop(data, start, base) {
    element = base.querySelectorAll('div')
    buttons = base.querySelectorAll('button');
    element.forEach(item => {
        base.removeChild(item);
    });
    buttons.forEach(button => {
        base.removeChild(button);
    })


    for (let i = start; i < start + 10 && i < data.length; i++) {
        const container = document.createElement('div');
        container.classList.add('form-check');
        container.classList.add('form-switch');
        base.append(container);
        const inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.id = 'answer' + i;
        inp.classList.add('form-check-input');
        inp.value.checked = true;
        if (data[i].answer === 'on')
            inp.checked = true;
        const statment = document.createElement('label');
        statment.classList.add('form-check-label');

        statment.setAttribute("for", 'answer' + i);
        statment.innerHTML = data[i].statement;
        container.append(inp);
        container.append(statment);
        inp.onchange = () => {
            data[i].answer = inp.value;
        }
    }
    if (start > 0) {
        const previous = document.createElement('button');
        previous.classList.add('btn', 'btn-primary');
        base.append(previous);
        previous.innerHTML = "הקודם";
        previous.onclick = () => { intelligenceLoop(data, start - 10, base); }
    }
    const next = document.createElement('button');
    next.classList.add('btn', 'btn-primary');
    base.append(next);
    if (start >= data.length - 10) {
        next.innerHTML = 'לתוצאות';
        next.onclick = () => {
            intelligenceResult(data);
        }
    }
    else {
        next.innerHTML = 'הבא...';
        next.onclick = () => { intelligenceLoop(data, start + 10, base); }
    }


}
//פונקציה שנקראת מהכפתור תוצאות וסוכמת את התוצאות של המשתמש ומעבירה לדף התוצאות
function intelligenceResult(data) {
    //הקצאת מערך שיכיל את סכימת האינטלגנציות
    //arr[0]=מתמטי
    //arr[1]=לשוני
    //arr[2]=תנועתי
    //arr[3]=מרחבי
    //arr[4]=מוזיקלי
    //arr[5]=בין אישי
    //arr[6]=תוך אישי
    const arr = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].answer === 'on') {
            switch (data[i].category) {
                case 'לוגית מתמטית':
                    arr[0]++;
                    break;
                case 'לשונית':
                    arr[1]++;
                    break;
                case 'תנועתית':
                    arr[2]++;
                    break;
                case 'מרחבית':
                    arr[3]++;
                    break;
                case 'מוזיקלית':
                    arr[4]++;
                    break;
                case 'בין אישית':
                    arr[5]++;
                    break;
                case 'תוך אישית':
                    arr[6]++;
            }
        }

    }
    //  arr.sort(function(a, b){return b - a});
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        let max = Math.max.apply(null, arr);
        switch (max) {
            case 0:
                break;
            case arr[0]:
                arr[0] = 0;
                results.push('לוגית מתמטית');
                break;
            case arr[1]:
                arr[1] = 0;
                results.push('לשונית');
                break;
            case arr[2]:
                arr[2] = 0;
                results.push('תנועתית');
                break;
            case arr[3]:
                arr[3] = 0;
                results.push('מרחבית')
                break;
            case arr[4]:
                arr[4] = 0;
                results.push('מוזיקלית')
                break;
            case arr[5]:
                arr[5] = 0;
                results.push('בין אישית')
                break;
            case arr[6]:
                arr[6] = 0;
                results.push('תוך אישית');
        }
    }

    sessionStorage.setItem('result', JSON.stringify(results));
    sentResults(4, results);
    window.location.assign('results.html');

}
function communication(instructions) {
    const mainContainer = document.getElementById('base');
    // יצירת הדיב להוראות האבחון
    const instruction = document.createElement('div');
    mainContainer.appendChild(instruction);
    instruction.style.border = '1px solid blue';
    instruction.style.borderRadius = '20px 20px';
    instruction.style.marginBottom = '10px';
    instruction.style.padding = '20px';
    const instructionText = document.createElement('h3');
    instructionText.innerHTML = instructions[3].instruction;
    instruction.appendChild(instructionText);
    //יצירת האלמנטים של האבחון עצמו
    const base = document.createElement('div');
    mainContainer.append(base);
    base.style.border = '1px solid blue';
    base.style.borderRadius = '20px 20px';
    base.style.padding = '20px';
    $.ajax({
        method: 'GET',
        url: '/json/communication.json',
        success: (data) => {
            communicationLoop(data, 0, base)
        }
    })

}
function communicationLoop(data, start, base) {
    const element = base.querySelectorAll('div')
    const buttons = base.querySelectorAll('button');
    element.forEach(item => {
        base.removeChild(item);
    });
    buttons.forEach(button => {
        base.removeChild(button);
    });
    for (let i = start; i < start + 10 && i < data.length; i++) {
        const container = document.createElement('div');
        base.append(container);
        const label = document.createElement('label');
        label.innerHTML = data[i].high;
        label.classList.add('form-label');
        label.for = 'costomRange';
        inp = document.createElement('input');
        inp.type = 'range';
        inp.classList.add('form-range');
        inp.id = 'costomRange';
        inp.min = '1';
        inp.max = '5';
        inp.step = '1';
        inp.style.width = '50%';

        const labelLow = document.createElement('label');
        labelLow.innerHTML = data[i].low;
        labelLow.classList.add('form-label');
        labelLow.for = 'costomRange';
        container.append(labelLow);
        container.append(inp);
        container.append(label);
        if (data[i].chosen > 0)
            inp.value = data[i].chosen;
        inp.onchange = () => {
            data[i].chosen = event.currentTarget.value;
        }
    }
    if (start > 0) {
        const previous = document.createElement('button');
        previous.classList.add('btn', 'btn-primary');
        base.append(previous);
        previous.innerHTML = "הקודם";
        previous.onclick = () => { communicationLoop(data, start - 10, base); }
    }
    const next = document.createElement('button');
    next.classList.add('btn', 'btn-primary');
    base.append(next);
    if (start >= data.length - 10) {
        next.innerHTML = 'לתוצאות';
        next.onclick = () => {
            communicationResult(data);
        }
    }
    else {
        next.innerHTML = 'הבא...';
        next.onclick = () => { communicationLoop(data, start + 10, base); }
    }
}
function communicationResult(data) {
    const arr = [0, 0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].category === 'official')
            arr[0] += parseInt(data[i].chosen);
        else
            arr[1] += parseInt(data[i].chosen);

    }
    if (arr[0] <= 48 && arr[1] <= 48) {
        sessionStorage.setItem('result', JSON.stringify('תומך'));
        sentResults(3, 'תומך');
    }

    if (arr[0] <= 48 && arr[1] > 48) {
        sessionStorage.setItem('communicationResult', JSON.stringify('מקדם'));
        sentResults(3, 'מקדם');
    }

    if (arr[0] > 48 && arr[1] <= 48) {
        sessionStorage.setItem('result', JSON.stringify('מנתח'));
        sentResults(3, 'מנתח');
    }

    if (arr[0] > 48 && arr[1] > 48) {
        sessionStorage.setItem('result', JSON.stringify('משימתי'));
        sentResults(3, 'משימתי');
    }

    window.location.assign('results.html');
}
//אבחון צורות ללמידה
//החלק הראשי ששולח לפונקציות שמעלות את השאלות
function learn(instructions) {


    $.ajax({
        method: 'GET',
        url: '/json/learn.json',
        success: (data) => {
            const mainContainer = document.getElementById('base');
            // יצירת הדיב להוראות האבחון
            const instruction = document.createElement('div');
            mainContainer.appendChild(instruction);
            instruction.style.border = '1px solid blue';
            instruction.style.borderRadius = '20px 20px';
            instruction.style.marginBottom = '10px';
            instruction.style.padding = '20px';
            const instructionText = document.createElement('h3');
            instructionText.innerHTML = instructions[5].instruction;
            instruction.appendChild(instructionText);
            //יצירת האלמנטים של האבחון עצמו
            const base = document.createElement('div');
            mainContainer.append(base);
            base.style.border = '1px solid blue';
            base.style.borderRadius = '20px 20px';
            base.style.padding = '20px';
            const buttonVisual = document.createElement('button');
            buttonVisual.innerHTML = 'חזותי';
            buttonVisual.classList.add('btn', 'btn-primary');
            buttonVisual.id = 'visual';
            buttonVisual.onclick = () => {
                const filterdData = data.filter((value) => {
                    return value.type === 'חזותי';

                });
                learnLoop(filterdData, 0, base);
            }
            base.append(buttonVisual);
            const buttonAuditory = document.createElement('button');
            buttonAuditory.innerHTML = 'שמיעתי';
            buttonAuditory.classList.add('btn', 'btn-primary');
            buttonAuditory.id = 'Audio';
            buttonAuditory.onclick = () => {
                const filterdData = data.filter((value) => {
                    return value.type === 'שמיעתי';
                });
                learnLoop(filterdData, 0, base);
            }
            base.append(buttonAuditory);
            const buttonMove = document.createElement('button');
            buttonMove.innerHTML = 'תנועתי';
            buttonMove.classList.add('btn', 'btn-primary');
            buttonMove.id = 'move';
            buttonMove.onclick = () => {
                const filterdData = data.filter((value) => {
                    return value.type === 'תנועתי';
                });
                learnLoop(filterdData, 0, base);
            }
            base.append(buttonMove);
            learnLoop(data, 0, base);

        }
    })
}
//פונקציה שמעלה את השאלות ובסוף לאחר המילוי שולחת לפונקציה שסוכמת את התוצאות
function learnLoop(data, start, base) {
    element = base.querySelectorAll('div')
    buttons = base.querySelectorAll('button');
    element.forEach(item => {

        base.removeChild(item);


    });
    buttons.forEach(button => {
        if (!(button.id === 'visual' || button.id === 'Audio' || button.id === 'move')) {
            base.removeChild(button);
        }
    })
    for (let i = start; i < start + 10 && i < data.length; i++) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.innerHTML = data[i].question;
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        const option3 = document.createElement('option');
        const option4 = document.createElement('option');
        const option5 = document.createElement('option');
        const option0 = document.createElement('option');
        option0.value = 0;
        option1.value = 1;
        option2.value = 2;
        option3.value = 3;
        option4.value = 4;
        option5.value = 5;
        option0.id = 'option0' + i;
        option1.id = 'option1' + i;
        option2.id = 'option2' + i;
        option3.id = 'option3' + i;
        option4.id = 'option4' + i;
        option5.id = 'option5' + i;
        option0.innerHTML = 'בחר את התשובה המתאימה לך ביותר'
        option1.innerHTML = 'לא מתאים כלל.';
        option2.innerHTML = 'מתאים לעיתים רחוקות.';
        option3.innerHTML = 'מתאים לפעמים';
        option4.innerHTML = 'מתאים לעיתים קרובות';
        option5.innerHTML = 'מתאים כמעט תמיד';
        option0.disabled;
        base.append(div);
        div.append(label);
        div.append(select);
        select.append(option0);
        select.append(option1);
        select.append(option2);
        select.append(option3);
        select.append(option4);
        select.append(option5);
        select.classList.add('form-select');
        label.for = 'select';
        select.name = 'select';
        select.style.width = '40%';
        div.style.marginTop = '22px';
        if (data[i].answer > 0) {
            const temp = 'option' + data[i].answer + '' + i;
            document.getElementById(temp).selected = true;
        }
        select.onchange = () => {
            data[i].answer = select.value;


        }

    }
    if (start > 0) {
        const previous = document.createElement('button');
        previous.classList.add('btn', 'btn-primary');
        base.append(previous);
        previous.innerHTML = "הקודם";
        previous.onclick = () => { learnLoop(data, start - 10, base); }
    }
    const next = document.createElement('button');
    next.classList.add('btn', 'btn-primary');
    base.append(next);
    if (start >= data.length - 10) {
        next.innerHTML = 'לתוצאות';
        next.onclick = () => {
            learnResult(data);
        }
    }
    else {
        next.innerHTML = 'הבא...';
        next.onclick = () => {
            learnLoop(data, start + 10, base);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
//פונקציה שסוכמת את התוצאות
function learnResult(data) {
    //arr[0] תנועתי
    //arr[1] שמיעתי
    //arr[2] חזותי
    const arr = [0, 0, 0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'תנועתי') {
            arr[0] += parseInt(data[i].answer);
        }
        if (data[i].type === 'שמיעתי') {
            arr[1] += parseInt(data[i].answer);
        }
        if (data[i].type === 'חזותי') {
            arr[2] += parseInt(data[i].answer);
        }
    }
    const max = Math.max.apply(null, arr);
    if (arr[0] === max) {
        sessionStorage.setItem('result', JSON.stringify('תנועתי'));
        sentResults(5, 'תנועתי');
    }
    if (arr[1] === max) {
        sessionStorage.setItem('result', JSON.stringify('שמיעתי'));
        sentResults(5, 'שמיעתי');
    }
    if (arr[2] === max) {
        sessionStorage.setItem('result', JSON.stringify('חזותי'));
        sentResults(5, 'חזותי');
    }
    window.location.assign('results.html')
}
function see(instructions) {
    const mainContainer = document.getElementById('base');
    // יצירת הדיב להוראות האבחון
    const instruction = document.createElement('div');
    mainContainer.appendChild(instruction);
    instruction.style.border = '1px solid blue';
    instruction.style.borderRadius = '20px 20px';
    instruction.style.marginBottom = '10px';
    instruction.style.padding = '20px';
    const instructionText = document.createElement('h3');
    instructionText.innerHTML = instructions[6].instruction;
    instruction.appendChild(instructionText);
    //יצירת האלמנטים של האבחון עצמו
    const base = document.createElement('div');
    mainContainer.append(base);
    base.style.border = '1px solid blue';
    base.style.borderRadius = '20px 20px';
    base.style.padding = '20px';
    $.ajax({
        method: 'GET',
        url: '/json/othersSeeYou.json',
        success: (data) => {
            for (let i = 0; i < data.length; i++) {
                const div = document.createElement('div');
                base.append(div);
                const title = document.createElement('h3');
                div.append(title);
                title.innerHTML = data[i].question;
                for (let j = 0; j < data[i].answers.length; j++) {
                    const container = document.createElement('div');
                    container.classList.add('form-check');
                    div.append(container);
                    const input = document.createElement('input');
                    const label = document.createElement('label');

                    input.classList.add('form-check-input');
                    label.classList.add('form-check-label');
                    input.type = 'radio';
                    input.id = 'radio' + i + '' + j;
                    label.setAttribute('for', 'radio' + i + '' + j);
                    input.name = 'radio' + i;
                    label.innerHTML = data[i].answers[j].answer;
                    input.value = data[i].answers[j].points;
                    container.append(input);
                    container.append(label);
                    console.log('sdfsd');
                    input.onchange = () => {
                        data[i].chose = input.value;
                    }
                }

            }
            const button = document.createElement('button');
            base.append(button);
            button.innerHTML = 'לתוצאות...';
            button.classList.add('btn', 'btn-primary');
            let sum = 0;
            button.onclick = () => {
                for (let index = 0; index < data.length; index++) {
                    if (data[index].chose > 0) {
                        sum += parseInt(data[index].chose);
                    }


                }
                sessionStorage.setItem('result', JSON.stringify(sum));
                sentResults(6, sum);
                window.location.assign('results.html');
            }

        }
    })
}
function sensory(instructions) {
    $.ajax({
        method: 'GET',
        url: '/json/sensory.json',
        success: (data) => {
            const mainContainer = document.getElementById('base');
            // יצירת הדיב להוראות האבחון
            const instruction = document.createElement('div');
            mainContainer.appendChild(instruction);
            instruction.style.border = '1px solid blue';
            instruction.style.borderRadius = '20px 20px';
            instruction.style.marginBottom = '10px';
            instruction.style.padding = '20px';
            const instructionText = document.createElement('h3');
            instructionText.innerHTML = instructions[8].instruction;
            instruction.appendChild(instructionText);
            //יצירת האלמנטים של האבחון עצמו
            const base = document.createElement('div');
            mainContainer.append(base);
            base.style.border = '1px solid blue';
            base.style.borderRadius = '20px 20px';
            base.style.padding = '20px';
            sensoryLoop(data, 0, base);
        }
    })
}
function sensoryLoop(data, start, base) {
    element = base.querySelectorAll('div')
    buttons = base.querySelectorAll('button');
    element.forEach(item => {
        base.removeChild(item);
    });
    buttons.forEach(button => {
        base.removeChild(button);
    })
    for (let i = start; i < start + 10 && i < data.length; i++) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.innerHTML = data[i].statment;
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        const option3 = document.createElement('option');
        const option4 = document.createElement('option');
        const option5 = document.createElement('option');
        const option0 = document.createElement('option');
        option0.id = 'option0' + i;
        option1.id = 'option1' + i;
        option2.id = 'option2' + i;
        option3.id = 'option3' + i;
        option4.id = 'option4' + i;
        option5.id = 'option5' + i;
        option0.value = 0;
        option1.value = 1;
        option2.value = 2;
        option3.value = 3;
        option4.value = 4;
        option5.value = 5;
        option0.innerHTML = '';
        option1.innerHTML = 'אף פעם';
        option2.innerHTML = 'לעיתים רחוקות';
        option3.innerHTML = 'לפעמים';
        option4.innerHTML = 'בדרך כלל';
        option5.innerHTML = 'תמיד';
        option0.disabled;

        base.append(div);
        div.append(label);
        div.append(select);
        select.append(option0);
        select.append(option1);
        select.append(option2);
        select.append(option3);
        select.append(option4);
        select.append(option5);
        select.classList.add('form-select');
        label.for = 'select';
        select.name = 'select';
        if (data[i].answer > 0) {
            const temp = 'option' + data[i].answer + '' + i;
            document.getElementById(temp).selected = true;
        }
        select.style.width = '40%';
        div.style.marginTop = '22px';
        select.onchange = () => {
            data[i].answer = select.value;


        }

    }
    if (start > 0) {
        const previous = document.createElement('button');
        previous.classList.add('btn', 'btn-primary');
        base.append(previous);
        previous.innerHTML = "הקודם";
        previous.onclick = () => { sensoryLoop(data, start - 10, base); }
    }
    const next = document.createElement('button');
    next.classList.add('btn', 'btn-primary');
    base.append(next);
    if (start >= data.length - 10) {
        next.innerHTML = 'לתוצאות';
        next.onclick = () => {
            sensoryResult(data);
        }
    }
    else {
        next.innerHTML = 'הבא...';
        next.onclick = () => {
            sensoryLoop(data, start + 10, base);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
function sensoryResult(data) {
    class result {
        category;
        howMuch;

        constructor(category, howMuch) {
            this.category = category;
            this.howMuch = howMuch;
        }
    }
    //arr[0] המנעות
    //arr[1] רגישות יתר
    //arr[2] חיפוש חושי
    //arr[3] רישום נמוך
    const word = ['המנעות', 'רגישות יתר', 'חיפוש חושי', 'רישום נמוך'];
    const arr = [0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
        if (data[i].class === 'avoidance')
            arr[0] += parseInt(data[i].answer)
        if (data[i].class === 'Hypersensitivity')
            arr[1] += parseInt(data[i].answer)
        if (data[i].class === 'search')
            arr[2] += parseInt(data[i].answer)
        if (data[i].class === 'Low registration')
            arr[3] += parseInt(data[i].answer)
    }
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 50)
            results.push(new result(word[i], 'high'));
        if (arr[i] < 40)
            results.push(new result(word[i], 'low'));

    }
    sentResults(8, results);
    sessionStorage.setItem('result', JSON.stringify(results));
    window.location.assign('results.html');
}


function sentResults(num, result) {
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    users.forEach(user => {
        if (user.password === currentUser.password && user.email === currentUser.email) {
            user.results[num] = result;
            currentUser.results[num] = result;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    })

}
function trip(instructions) {
    const mainContainer = document.getElementById('base');
    // יצירת הדיב להוראות האבחון
    const instruction = document.createElement('div');
    mainContainer.appendChild(instruction);
    instruction.style.border = '1px solid blue';
    instruction.style.borderRadius = '20px 20px';
    instruction.style.marginBottom = '10px';
    instruction.style.padding = '20px';
    const instructionText = document.createElement('h3');
    instructionText.innerHTML = instructions[9].instruction;
    instruction.appendChild(instructionText);
    //יצירת האלמנטים של האבחון עצמו
    const base = document.createElement('div');
    mainContainer.append(base);
    base.style.border = '1px solid blue';
    base.style.borderRadius = '20px 20px';
    base.style.padding = '20px';
    const arr = [0, 0, 0];
    // תשובה 1 arr[0]
    // תשובה 2 arr[1]
    // תשובה 3 arr[2]
    $.ajax({
        method: 'GET',
        url: '/JSON/trip.json',
        success: (data) => {
            for (let i = 0; i < data.length; i++) {
                const div = document.createElement('div');
                const label = document.createElement('label');
                label.innerHTML = data[i].question;
                const select = document.createElement('select');
                const option0 = document.createElement('option');
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                const option3 = document.createElement('option');
                option0.value = 0;
                option1.value = 1;
                option2.value = 2;
                option3.value = 3;
                option0.innerHTML = "בחר את התשובה המתאימה";
                option1.innerHTML = data[i].answer[0];
                option2.innerHTML = data[i].answer[1];
                option3.innerHTML = data[i].answer[2];
                select.classList.add('form-select');
                label.for = 'select'
                select.name = 'select'
                select.style.width = '40%';
                base.append(div);
                div.append(label);
                div.append(select);
                select.append(option0);
                select.append(option1);
                select.append(option2);
                select.append(option3);
                div.style.marginTop = '22px';
                select.onchange = () => {
                    data[i].chose = select.value;
                    arr[i] = select.value;

                }

            }
            const submit = document.createElement('button');
            submit.classList.add('btn')
            submit.classList.add('btn-primary')
            base.append(submit);
            submit.innerHTML = 'לתוצאות';
            submit.onclick = () => {
                sentResults(9, arr);
                sessionStorage.setItem('result', JSON.stringify(arr));

                window.location.assign('results.html');
            }
        }
    })


}
