import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("allSets.db");
export function initSets() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sets (
            set_id INTEGER PRIMARY KEY NOT NULL,
            set_name TEXT NOT NULL
            );   
            `,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function initCards() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS cards (
            card_id INTEGER PRIMARY KEY NOT NULL,
            set_id INTEGER NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL
          );   
            `,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function dbNewSet(name) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO sets (set_name) VALUES
        (?)`,
        [name],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function dbFetchAllsets() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM sets`,
        [],
        (_, result) => {
          const sets = [];

          for (const dp of result.rows._array) {
            sets.push({ setId: dp.set_id, setName: dp.set_name });
          }

          resolve(sets);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function dbFetchSetName(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT set_name FROM sets WHERE set_id = ?`,
        [id],
        (_, result) => {
          // console.log(result.rows._array[0].set_name);
          resolve(result.rows._array[0].set_name);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbDeleteSet(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM sets WHERE set_id = ?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbAddCard(card) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO cards (set_id, question , answer) VALUES
        (?,?,?)`,
        [card.setId, card.question, card.answer],
        (_, result) => {
          resolve(result);
          console.log(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbFetchAllCards(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM cards WHERE set_id = ?`,
        [id],
        (_, result) => {
          const cards = [];

          for (const dp of result.rows._array) {
            cards.push({
              cardId: dp.card_id,
              question: dp.question,
              answer: dp.answer,
              setId: dp.set_id,
            });
          }

          resolve(cards);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbDeleteCard(cardId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM cards WHERE card_id = ?;`,
        [cardId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbUpdateCard(card) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET question = ?, answer = ? WHERE card_id = ? ",
        [card.question, card.answer, card.cardId],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
