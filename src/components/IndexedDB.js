class IndexedDB {
    constructor(dbBudgetTracking) {
        this.dbBudgetTracking = dbBudgetTracking;
    }


    // Открыть базу данных
    openDB() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.dbBudgetTracking);

            request.onerror = function(event) {
                console.log('Database error: ', event.target.errorCode);
                reject('Database error: ' + event.target.errorCode);
            };

            request.onsuccess = function(event) {
                resolve(event.target.result);
            };

            request.onupgradeneeded = function(event) {
                let db = event.target.result;

                //Создаем хранилище объектов для коллекиций: transition, goals и dailyRecords
                db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('goals', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('dailyRecords', { keyPath: 'id', autoIncrement: true });
            };
        });
    }

    //Функция для добавления данных
    async addData (storeName, data) {
        const db = await this.openDB();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        store.add(data);
        return new Promise((resolve, reject) => {
            transaction.oncomplete = function() {
                resolve();
            };
            transaction.onerror = function(event) {
                reject('Error adding data: ' + event.target.errorCode);
            };
        });
    }

    // Функция для чтения всех данных из хранилища
    async getAllData(storeName) {
        const db = await this.openDB();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onerror = function(event) {
                reject('Error getting all data: ' + event.target.errorCode);
            };
            request.onsuccess = function(event) {
                resolve(event.target.result);
            };
        });
    }

    // Функция для обновления данных
    async updateData(storeName, data) {
        const db = await this.openDB();
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.put(data);
        return new Promise((resolve, reject) => {
            transaction.oncomplete = function() {
                resolve();
            };
            transaction.onerror = function(event) {
                reject('Error updating data: ' + event.target.errorCode);
            };
        });
    }

    // Функция для удаления данных
    async deleteData(storeName, id) {
        const db = await this.openDB();
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.delete(id);
        return new Promise((resolve, reject) => {
            transaction.oncomplete = function() {
                resolve();
            };
            transaction.onerror = function(event) {
                reject('Error deleting data: ' + event.target.errorCode);
            };
        });
    }
}

export default IndexedDB;