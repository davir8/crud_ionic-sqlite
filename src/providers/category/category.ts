import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class CategoryProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'select * from categories';

      return db.executeSql(sql, [])
      .then((data: any) => {
        if(data.rows.length > 0){
          let categories: any[] = [];

          for (let i = 0; i < data.rows.length; i++) {
            let category = data.rows.item(i);
            categories.push(category);            
          }
          
          return categories;
        }else{
          return [];
        }
      })
      .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
