import { useState } from "react";

const SortedUsers = (users) => {
    users = users['users'] // так как все пользователи находятся в users['users'], то для удобства сделал так
    const [sorted, setSorted] = useState('firstName') // sorted - по какой колонке будет сортировка
    const [upDown, setUpdown] = useState('non') // сортировка по возрастанию или наоборот

    //функция сортировки по полю
    function byField(fieldName, upDown) {
        if (upDown == 'up') {
            if (fieldName == 'city') {
                return (a, b) => a['address']['city'] > b['address']['city'] ? 1 : -1;
            }
            else if (fieldName == 'address') {
                return (a, b) => a['address']['address'] > b['address']['address'] ? 1 : -1;
            }
            else {
                return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
            }
        }
        else if (upDown == 'down') {
            if (fieldName == 'city') {
                return (a, b) => a['address']['city'] > b['address']['city'] ? -1 : 1;
            }
            else if (fieldName == 'address') {
                return (a, b) => a['address']['address'] > b['address']['address'] ? -1 : 1;
            }
            else {
                return (a, b) => a[fieldName] > b[fieldName] ? -1 : 1;
            }
        }
    }
    const sorting = (w, d) => {
        if (d != 'non') {
            users.sort(byField(w, d))
        }

    }
    //  это функция для полной деструктурищации, но потом заметил что в задании это было не нужно, оставлю это здесь
    // const as = (list) => {  
    // создаем массив, куда будем добавлять пары ключ - значение
    //     let a = [] 
    //     for (let [key, value] of Object.entries((list))) {
    //     если значение явщяется объектом, вызываем рекурсию, чтобы достать все пары ключей и значений
    //         if (typeof(value) == 'object') {
    //             a.push(`${key}: ${as(value)}`)
    //         }
    //         иначе просто добавляем значение
    //         else {
    //             a.push(`${key}: ${value}`)
    //         }
    //     }
    //     возвращаем массив с переносом строк
    //     return a.join(' \n ')
    // }

    const listOfUsers = (users) => {
        return (
            users.map(function (list) { // функция для представления всех пользователей в виде таблицы
                return (
                    <tr className="person">
                        {/* <p className="non-visible">
                        добавляем символы для поиска
                        я хотел реализовать поиск по уже полученным данным, а не через filter в запросе, но подумал, что это нарушит условие задания
                        {list.searchSymbols = (list.firstName.replaceAll('"', '').replaceAll('/', '').toLowerCase())}
                        {list.searchSymbols += (list.lastName.replaceAll('"', '').replaceAll('/', '').toLowerCase())}
                        {list.searchSymbols += (list.maidenName.replaceAll('"', '').replaceAll('/', '').toLowerCase())}
                        {list.searchSymbols += (list.age)}
                        {list.searchSymbols += (list.gender.replaceAll('"', '').replaceAll('/', '').toLowerCase())}
                        {list.searchSymbols += (list.phone.replaceAll('"', '').replaceAll('/', '').replaceAll(' ', '').toLowerCase())}
                        {list.searchSymbols += (list.address.city.replaceAll('"', '').replaceAll('/', '').toLowerCase())}
                        {list.searchSymbols += (list.address.address.replaceAll('"', '').replaceAll('/', '').replaceAll(' ', '').toLowerCase())}
                    </p> */}
                        <td>
                            {(list['firstName'])}
                        </td>
                        <td>
                            {(list['lastName'])}
                        </td>
                        <td>
                            {list['age']}
                        </td>
                        <td>
                            {list['gender']}
                        </td>
                        <td>
                            {list['phone']}
                        </td>
                        <td>
                            {list['address']['city']}
                        </td>
                        <td>
                            {list['address']['address']}
                        </td>
                    </tr>
                )
            }))
    }

    return (
        <div>
            <p className="upsrt">Сортировать по...</p>
            <div className="srt">
                <div className="choise">
                    <input type="radio" name='sort' id="name" onClick={() => { sorting('firstName', upDown); setSorted('firstName') }} checked={sorted == 'firstName'}></input>
                    <label for='name'>Имени</label>
                </div>
                <div className="choise">
                    <input type="radio" name='sort' id='lastname' onClick={() => { sorting('lastName', upDown); setSorted('lastName') }} checked={sorted == 'lastName'}></input>
                    <label for='lastname'>Фамилии</label>
                </div>
                <div className="choise">
                    <input type="radio" name='sort' id='age' onClick={() => { sorting('age', upDown); setSorted('age') }} checked={sorted == 'age'}></input>
                    <label for='age'>Возрасту</label>
                </div>
                <div className="choise">
                    <input type="radio" name='sort' id='city' onClick={() => { sorting('city', upDown); setSorted('city') }} checked={sorted == 'city'}></input>
                    <label for='city'>Городу</label>
                </div>
                <div className="choise">
                    <input type="radio" name='sort' id='street' onClick={() => { sorting('address', upDown); setSorted('address') }} checked={sorted == 'address'}></input>
                    <label for='street'>Адресу</label>
                </div>
            </div>
            <div className="srt">
                <div className="choise">
                    <input type="radio" name='upDown' id="up" onClick={() => { sorting(sorted, 'up'); setUpdown('up') }} checked={upDown == 'up'}></input>
                    <label for='up'>Возрастанию</label>
                </div>
                <div className="choise">
                    <input type="radio" name='upDown' id='down' onClick={() => { sorting(sorted, 'down'); setUpdown('down') }} checked={upDown == 'down'}></input>
                    <label for='down'>Убыванию</label>
                </div>
                <div className="choise">
                    <input type="radio" name='upDown' id='noSort' onClick={() => { setUpdown('non') }} checked={upDown == 'non'}></input>
                    <label for='noSort'>Без сортировки</label>
                </div>
            </div>
            <table>
                {/* заголовки таблицы */}
                <tr className="person">
                    <td>
                        Имя
                    </td>
                    <td>
                        Фамилия
                    </td>
                    <td>
                        Возраст
                    </td>
                    <td>
                        Пол
                    </td>
                    <td>
                        Телефон
                    </td>
                    <td>
                        Город
                    </td>
                    <td>
                        Адрес
                    </td>
                </tr>
                {/* а тут сами пользователи */}
                {listOfUsers(users)}
            </table>
        </div>
    )
}


export default SortedUsers