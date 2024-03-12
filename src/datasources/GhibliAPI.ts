import { RESTDataSource } from "@apollo/datasource-rest";
import { FilmModel, PeopleModel } from "../models";

export class GhibliAPI extends RESTDataSource {
    baseURL = 'https://ghibliapi.dev'; 

    getFilms() {
        return this.get<FilmModel[]>('films')
    }
     
      getPeoples() {
        return this.get<PeopleModel[]>(`people`)
    }
    getPeopleBy(ids: String[]){
        let Peoples = []
        for (var link of ids){
        var id = link.match("people\/(.+)")
          if (id){
              var people = this.get<PeopleModel>(`people/${id[1]}`)
              Peoples.push(people)
              
          }
        }
        return Peoples



    }
    getFilmBy(ids: String[]){
      let Films = []
      for (var link of ids){
      var id = link.match("films\/(.+)")
        if (id){
          Films.push(this.get<FilmModel>(`films/${id[1]}`))
        }
      }

      return Films



  }

  }