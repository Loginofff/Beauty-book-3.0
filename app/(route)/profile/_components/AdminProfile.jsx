import React, { useState } from 'react';

const MasterProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : '');
  const [newEmail, setNewEmail] = useState(user ? user.email : '');

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Здесь вы можете добавить логику для сохранения изменений
    setEditing(false);
    // Например, можно отправить данные на сервер
    console.log("Сохранить изменения:", newName, newEmail);
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md">
      <h2 className="text-green-700 text-2xl font-semibold mb-2">Master Profile</h2>
      {!editing ? (
        <>
          <p className="text-green-900">Name: {user && user.name}</p>
          <p className="text-green-900">Email: {user && user.email}</p>
          <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Изменить профиль
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Новое имя"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="block border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Новый email"
          />
          <button onClick={handleSaveClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            Сохранить изменения
          </button>
          <button onClick={() => setEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Отмена
          </button>
        </>
      )}
    </div>
  );
}

export default MasterProfile;
