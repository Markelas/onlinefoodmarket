const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

async function getResourse(url) { // get запрос
    const res = await fetch(url);
    
    if(!res.ok) { //У fetch есть свойство ok, проверяет, все ли хорошо отрабатывает, если результат с ошибкой 
        throw new Error(`Could not fetch ${url}, status ${res.status}`); //Выкидываем новую ошибку с url и статусом 
    }

    return await res.json(); 
};

export {postData}; 
export {getResourse};