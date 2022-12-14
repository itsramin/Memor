import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("allSets.db");

// init functions
export function initSets() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sets (
            set_id INTEGER PRIMARY KEY NOT NULL,
            set_name TEXT NOT NULL,
            last_memorize TEXT,
            today_done INTEGER,
            daily_count INTEGER,
            market_id TEXT
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
            answer TEXT NOT NULL,
            stage INTEGER NOT NULL,
            memorize_status INTEGER NOT NULL
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

// new functions
export function dbNewSet(name, marketId = null) {
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sets (set_name,today_done,daily_count,last_memorize, market_id) VALUES (?,0,5,?,?)",
        [name, yesterday, marketId],
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
export function dbAddCard(setId, card) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO cards (set_id, question , answer, stage, memorize_status) VALUES
        (?,?,?,?,?)`,
        [setId, card.question, card.answer, 0, 0],
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

// update functions
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
export function dbUpdateSetName(set) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE sets SET set_name = ? WHERE set_id = ?",
        [set.newName, set.setId],
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
export function dbUpdateSetDailyCount(set) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE sets SET daily_count = ? WHERE set_id = ?",
        [set.dailyCount, set.setId],
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
export function dbUpdateLastMemorize(set) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE sets SET last_memorize = ? WHERE set_id = ?",
        [set.date, set.setId],
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
export function dbUpdateMemorizeStatus(cardId, status) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET memorize_status = ? WHERE card_id = ?",
        [status, cardId],
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
export function dbUpdateTodayDone(setId, status) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE sets SET today_done = ? WHERE set_id = ?",
        [status, setId],
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
export function dbResetMemorizeStatus(setId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET memorize_status = 0 WHERE set_id = ?",
        [setId],
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

// stage changes
export function dbStageUp(cardId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET stage = stage + 1 WHERE card_id = ? ",
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
export function dbStageUpAll(setId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET stage = stage + 1 WHERE set_id = ? AND stage NOT IN (0,1, 3, 7, 15, 30,31)",
        [setId],
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
export function dbStageDown(cardId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET stage = 1 WHERE card_id = ?",
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
export function dbStageReset(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE cards SET stage = 0 WHERE set_id = ? ",
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

// delete function
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
export function dbDeleteSetAllCards(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM cards WHERE set_id = ?;`,

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

// fetch data
export function dbFetchAllsets() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM sets`,
        [],
        (_, result) => {
          const sets = [];

          for (const dp of result.rows._array) {
            sets.push({
              setId: dp.set_id,
              setName: dp.set_name,
              lastMemorize: dp.last_memorize,
              marketId: dp.market_id,
            });
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
export function dbFetchSetLastMemorize(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT last_memorize FROM sets WHERE set_id = ?`,
        [id],
        (_, result) => {
          resolve(result.rows._array[0].last_memorize);
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

          const cards = result.rows._array.map((item, i) => {
            return {
              cardId: item.card_id,
              question: item.question,
              answer: item.answer,
              setId: item.set_id,
              stage: item.stage,
              memorizeStatus: item.memorize_status,
              indexNum: i + 1,
            };
          });

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
export function dbFetchStageZero(id, dailyCount) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cards WHERE set_id = ? AND memorize_status = 0 AND stage = 0 LIMIT ?",
        [id, dailyCount],
        (_, result) => {
          const cards = [];

          for (const dp of result.rows._array) {
            cards.push({
              cardId: dp.card_id,
              question: dp.question,
              answer: dp.answer,
              setId: dp.set_id,
              stage: dp.stage,
              memorizeStatus: dp.memorize_status,
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
export function dbFetchStageEnd(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cards WHERE set_id = ? AND stage IN (1, 3, 7, 15, 30)",
        [id],
        (_, result) => {
          const cards = [];

          for (const dp of result.rows._array) {
            cards.push({
              cardId: dp.card_id,
              question: dp.question,
              answer: dp.answer,
              setId: dp.set_id,
              stage: dp.stage,
              memorizeStatus: dp.memorize_status,
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
export function dbFetchStageCount(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(card_id) FROM cards WHERE set_id = ? AND memorize_status = 1",
        [id],
        (_, result) => {
          resolve(Object.values(result.rows._array[0])[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbFetchTodayDone(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT today_done FROM sets WHERE set_id = ?",
        [id],
        (_, result) => {
          resolve(Object.values(result.rows._array[0])[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbFetchSetSettings(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sets WHERE set_id = ?",
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function dbFetchTodayCards(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cards WHERE set_id = ? AND memorize_status=1",
        [id],
        (_, result) => {
          const cards = [];

          for (const dp of result.rows._array) {
            cards.push({
              cardId: dp.card_id,
              question: dp.question,
              answer: dp.answer,
              setId: dp.set_id,
              stage: dp.stage,
              memorizeStatus: dp.memorize_status,
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
