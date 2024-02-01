import './App.css';
import { useState, useEffect } from 'react';
import SortedUsers from './SortedUsers';
const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('')// search - воодимые пользователем поисковыве слова

  const req = (s) => {
    try {
      if (s.length == 0) {
        // если строка поиска на момент нажатия была пуста, возвращаем простой список пользователей
        fetch('https://dummyjson.com/users/')
          .then((res) => res.json())
          .then((data) => {
            setUsers(data['users']);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      else {
        // если нет, то сравниваем значение по всем параметрам: имя, фамилия, возраст, город и т.д.
        let founded
        // founded - это переменная, куда я буду складывать все найденные совпадения пользователей по поиску
        //тут много повторябщегося кода, можно было использовать функции, но мне нужна переменная founded
        fetch('https://dummyjson.com/users/filter?key=firstName&value=' + s)
          .then((res) => res.json())
          .then((data) => {
            setUsers(data['users']);
            founded = data['users']
          })
          .catch((err) => {
            console.log(err.message);
          });
        fetch('https://dummyjson.com/users/filter?key=lastName&value=' + s)
          .then((res) => res.json())
          .then((data) => {
            setUsers((founded.concat(data['users'])));
            founded = founded.concat(data['users'])
          })
          .catch((err) => {
            console.log(err.message);
          });
        fetch('https://dummyjson.com/users/filter?key=age&value=' + s)
          .then((res) => res.json())
          .then((data) => {
            setUsers((founded.concat(data['users'])));
            founded = founded.concat(data['users'])
          })
          .catch((err) => {
            console.log(err.message);
          });
        fetch('https://dummyjson.com/users/filter?key=address.address&value=' + s)
          .then((res) => res.json())
          .then((data) => {
            setUsers((founded.concat(data['users'])));
            founded = founded.concat(data['users'])
          })
          .catch((err) => {
            console.log(err.message);
          });
        fetch('https://dummyjson.com/users/filter?key=address.city&value=' + s)
          .then((res) => res.json())
          .then((data) => {
            setUsers((founded.concat(data['users'])));
            founded = founded.concat(data['users'])
          })
          .catch((err) => {
            console.log(err.message);
          });
        // fetch('https://dummyjson.com/users/filter?key=phone&value=' + s) это единственное, что я не смог: поиск по телефону никак не удается
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data['users']);
        //     setUsers((founded.concat(data['users'])));
        //     founded = founded.concat(data['users'])
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
        fetch('https://dummyjson.com/users/filter?key=gender&value=' + s)
          .then((res) => res.json())
          .then((data) => {
            setUsers((founded.concat(data['users'])));
            founded = founded.concat(data['users'])
          })
          .catch((err) => {
            console.log(err.message);
          });

      }
    }
    catch {

    }
  }
  // запрос пользователей при первом рендере
  useEffect(() => {
    fetch('https://dummyjson.com/users/')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data['users']);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  return (<>
    <div className='search'>
      <input type='text' placeholder='Введите для поиска...' value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <input type='submit' onClick={() => { req(search) }}></input>
    </div>
    {/* принимаем поисковый запрос и передаем данные компоненту, который отобразит пользователей */}
    <SortedUsers users={users} nonSorted={users}></SortedUsers>
  </>
  );

};

export default App;
